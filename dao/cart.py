import psycopg2

from config.pg import pg_config


class CartDAO:
    def __init__(self):
        connection_url = "dbname =%s user=%s password=%s port =%s host=%s" \
                         % (pg_config['dbname'], pg_config['user'], pg_config['password'],
                            pg_config['dbport'], pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def viewCart(self, user_id):
        query = "select part_id, quantity from cart where user_id = '%s'"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def addPartToCart(self, user_id, part_id, quantity):
        cursor = self.conn.cursor()
        prequery = "select user_id, part_id from cart where user_id = %s and part_id = %s"

        cursor.execute(prequery, (user_id, part_id))
        if cursor.rowcount == 0:
            query = "insert into cart (user_id, part_id, quantity) values(%s,%s,%s)"
            cursor.execute(query, (user_id, part_id, quantity,))

            self.conn.commit()
            return user_id

    def deletePartFromCart(self, user_id, part_id):
        query = "delete from cart where user_id = %s AND part_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, part_id))
        self.conn.commit()
        rowcount = cursor.rowcount
        self.conn.commit()
        return rowcount != 0

    def clearAllPartsFromCart(self, user_id):
        query = "delete from cart where user_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        self.conn.commit()
        rowcount = cursor.rowcount
        self.conn.commit()
        return rowcount != 0
