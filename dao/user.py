import psycopg2
from config.pg import pg_config


class UserDAO:
    def __init__(self):
        connection_url = "dbname =%s user=%s password=%s port =%s host=%s" \
                         % (pg_config['dbname'], pg_config['user'], pg_config['password'],
                            pg_config['dbport'], pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def getAllUser(self):
        query = "select * from users "
        cursor = self.conn.cursor()
        cursor.execute(query)

        result = []
        for row in cursor:
            result.append(row)
        return result

    def getUserById(self, user_id):
        query = "select * from users where user_id = '%s'"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        return result

    # creating new user
    def newUser(self, user_password, user_email, full_name, balance, user_rol):
        cursor = self.conn.cursor()
        query = 'insert into "users" (user_password,user_email,full_name, balance, user_rol)' \
                'values (%s,%s,%s,%s,%s) returning user_id; '
        cursor.execute(query, (user_password, user_email, full_name, balance, user_rol,))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        cursor.close()
        return user_id

    def updateUser(self, user_id, user_password, user_email, full_name, balance, user_rol):
        cursor = self.conn.cursor()
        query = 'update "users" ' \
                'set user_password = %s, user_email = %s, full_name= %s, balance = %s, user_rol= %s ' \
                'where user_id = %s '
        cursor.execute(query, (user_id, user_password, user_email, full_name, balance, user_rol))
        self.conn.commit()
        cursor.close()
        return True

    def deleteUserById(self, user_id):
        cursor = self.conn.cursor()
        query = 'delete from "users" where user_id = %s;'
        cursor.execute(query, (user_id,))
        deleted_rows = cursor.rowcount
        self.conn.commit()
        cursor.close()
        return deleted_rows != 0

    def userAdmin(self, user_id):
        cursor = self.conn.cursor()
        query = "select user_id, user_rol from users where user_id = %s"
        cursor.execute(query, (user_id,))
        admin = cursor.fetchone()[1]
        return admin

    # statistics

    def getMostBoughtPartUser(self, user_id):
        cursor = self.conn.cursor()
        query = " select part_name, orderhas.part_id, sum(partquantity) as bought " \
                " from (orderhas natural inner join parts) natural inner join orders " \
                " where parts.part_id = orderhas.part_id  AND orderhas.order_id = orders.order_id AND user_id = %s " \
                " group by orderhas.part_id,part_name order by bought desc limit 10"
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getMostBoughtCategoryUser(self, user_id):
        cursor = self.conn.cursor()
        query = " select categories.cat_id, categories.cat_name, sum(partquantity) as bought" \
                " from ((orderhas natural inner join parts) natural inner join orders) natural inner join categories" \
                " where parts.cat_id = categories.cat_id  AND orderhas.order_id = orders.order_id AND user_id = %s" \
                " group by categories.cat_id,categories.cat_name order by bought desc limit 10"
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getMostExpensivePartUser(self, user_id):
        cursor = self.conn.cursor()
        query = " select part_id, part_name, price_bought from (orderhas natural inner join parts) natural inner join orders " \
                " where  user_id = %s " \
                " and part_price = (select max(part_price) from (orderhas natural inner join parts) natural inner join orders) "
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getCheapestPartUser(self,user_id):
        cursor = self.conn.cursor()
        query = " select part_id, part_name, price_bought from (orderhas natural inner join parts) natural inner join orders" \
                " where  user_id = %s " \
                " and part_price = (select min(part_price) from (orderhas natural inner join parts) natural inner join orders) "
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result
    def getBalance(self, user_id):
        cursor = self.conn.cursor()
        query = "select balance from users where user_id = %s"
        cursor.execute(query, (user_id,))
        self.conn.commit()
        balance = cursor.fetchone()[0]
        return balance

