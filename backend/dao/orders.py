from backend.config.pg import pg_config
import psycopg2

from backend.dao.cart import CartDAO
from backend.dao.parts import PartDAO
from backend.dao.user import UserDAO
from datetime import datetime


class OrderDAO:
    def __init__(self):
        connection_url = "dbname =%s user=%s password=%s port =%s host=%s" \
                         % (pg_config['dbname'], pg_config['user'], pg_config['password'],
                            pg_config['dbport'], pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def getAllOrders(self):
        query = "select * from orders "
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getOrderTotal(self, order_id):
        query = "select total from orders where order_id  = %s"
        cursor = self.conn.cursor()
        cursor.execute(query, ([order_id]), )

        orderTotal = cursor.fetchone()[0]
        return orderTotal

    def getLastOrder(self, user_id):
        query = "select max(order_id)  from orders where user_id = %s limit 1; "
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result


    def getOrdersByUserId(self, user_id):
        query = "select order_id, total, date from orders where user_id = %s order  by date desc "
        cursor = self.conn.cursor()
        cursor.execute(query, ([user_id]))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getOrderInfoById(self, order_id):
        query = "select orderhas.part_id,partname, price_bought, partquantity, partquantity * price_bought as partTotal from " \
                "orderhas left join parts p on p.part_id = orderhas.part_id where order_id = %s"

        cursor = self.conn.cursor()
        cursor.execute(query, (order_id,))
        result = cursor.fetchone()[0]
        for row in cursor:
            result.append(row)
        return result

    def createOrder(self, user_id):
        global orderid
        cursor = self.conn.cursor()
        dao = CartDAO()
        daopart = PartDAO()
        daouser = UserDAO()
        balance = daouser.getBalance(user_id)
        total = dao.getCartTotal(user_id)
        stock = dao.stockAvailable(user_id)
        print("Dao Cart Balance", balance)
        print("TOTAL EN CREATEORDER", total)
        print("hay stock?", stock)
        if (balance >= total) & stock:

            balancequery = "update users set balance = (balance - %s) where user_id = %s"
            cursor.execute(balancequery, (total, user_id,))
            query = "insert into orders (user_id, total,date) values (%s,%s,%s) returning order_id"
            date = datetime.now()
            cursor.execute(query, (user_id, total,date), )
            order_id = cursor.fetchone()[0]
            print(order_id)


            parts = dao.getCartParts(user_id)
            result = []
            for row in parts:
                print("daoordertest", row)
                part_id = row[0]
                part_quantity = row[1]
                price_bought = row[2]
                partname = row[3]
                print("test id", part_id, part_quantity, price_bought)
                self.addParts(user_id, order_id, part_id, part_quantity, price_bought, partname)
                daopart.removeQuantity(part_id, part_quantity)
                result.append(row)
            self.conn.commit()
            dao.clearAllPartsFromCart(user_id)
            print("DAO Create Order result = ", result)
            return result

    def addParts(self, user_id, order_id, part_id, partquantity, price_bought, partname):

        cursor = self.conn.cursor()
        query = "insert into orderhas(order_id, part_id, partquantity, price_bought,partname) values (%s, %s, %s, %s, %s)"
        cursor.execute(query, (order_id, part_id, partquantity, price_bought, partname))

        self.conn.commit()

        print("Esta corriendo addparts")
        return part_id

    def deleteOrder(self, order_id):
        cursor = self.conn.cursor()

        prequery = "delete from orderhas where order_id = %s"
        cursor.execute(prequery, (order_id,))
        if cursor.rowcount != 0:
            query = "delete from orders where order_id = %s"
            cursor.execute(query, (order_id,))
            self.conn.commit()
            return order_id
