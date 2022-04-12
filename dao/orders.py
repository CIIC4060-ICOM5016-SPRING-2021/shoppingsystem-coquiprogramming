from config.pg import pg_config
import psycopg2

from dao.cart import CartDAO
from dao.parts import PartDAO


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

    def getOrderInfoById(self, order_id):
        query = "select part_name,price_bought, partquantity, partquantity * price_bought as totalPartPrice from (orderhas left join parts p on p.part_id = " \
                "orderhas.part_id) where order_id = %s "
        cursor = self.conn.cursor()
        cursor.execute(query, (order_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def createOrder(self, user_id):
            cursor = self.conn.cursor()
            dao = CartDAO()
            daopart = PartDAO()
            total = dao.getCartTotal(user_id)
            print(total)
            query = "insert into orders (user_id, total) values (%s,%s) returning order_id"

            cursor.execute(query, (user_id,total),)
            order_id = cursor.fetchone()[0]
            print(order_id)
            parts = dao.getCartParts(user_id)
            result = []
            for row in parts:
                print("daoordertest", row)
                part_id = row[0]
                part_quantity = row[1]
                price_bought = row[2]
                print("test id", part_id, part_quantity, price_bought)
                self.addParts(user_id, order_id, part_id,part_quantity, price_bought)
                daopart.removeQuantity(part_id,part_quantity)
                result.append(row)


            self.conn.commit()
            dao.clearAllPartsFromCart(user_id)
            print("DAO Create Order result = ", result)
            return result

    def addParts(self, user_id,order_id, part_id, partquantity, price_bought):
        dao = CartDAO()
        cursor = self.conn.cursor()
        query = "insert into orderhas(order_id, part_id, partquantity, price_bought) values (%s, %s, %s, %s)"
        cursor.execute(query, (order_id, part_id, partquantity, price_bought))

        self.conn.commit()

        print("Esta corriendo addparts")
        return part_id







