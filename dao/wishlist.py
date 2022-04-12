import psycopg2

from config.pg import pg_config


class WishListDAO:
    def __init__(self):
        connection_url = "dbname =%s user=%s password=%s port =%s host=%s" \
                         % (pg_config['dbname'], pg_config['user'], pg_config['password'],
                            pg_config['dbport'], pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def viewWishList(self, user_id):
        query = "select wishlist.part_id, part_name, part_price from wishlist left join parts p on p.part_id = wishlist.part_id where user_id = %s"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def addPartToWishList(self, user_id, part_id):
        cursor = self.conn.cursor()
        prequery = "select user_id, part_id from wishlist where user_id = %s and part_id = %s"

        cursor.execute(prequery, (user_id, part_id))
        if cursor.rowcount == 0:
            query = "insert into wishlist (user_id, part_id) values(%s,%s)"
            cursor.execute(query, (user_id, part_id,))

            self.conn.commit()
            return part_id

    def deletePartFromWishList(self, user_id, part_id):
        query = "delete from wishlist where user_id = %s AND part_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, part_id,))
        self.conn.commit()
        rowcount = cursor.rowcount
        self.conn.commit()
        return rowcount != 0

    def clearAllPartsFromWishList(self, user_id):
        query = "delete from wishlist where user_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        self.conn.commit()
        rowcount = cursor.rowcount
        self.conn.commit()
        return rowcount != 0
