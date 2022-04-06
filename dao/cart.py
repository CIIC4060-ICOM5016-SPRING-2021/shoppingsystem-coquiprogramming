import psycopg2

from config.pg import pg_config


class CartDAO:
    def __init__(self):
        connection_url = "dbname =%s user=%s password=%s port =%s host=%s" \
                         % (pg_config['dbname'], pg_config['user'], pg_config['password'],
                            pg_config['dbport'], pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def addPartToCart(self, user_id, part_id, quantity):
        cursor = self.conn.cursor()
        query = "insert into cart (user_id, part_id, quantity) values(%s,%s,%s)"
        cursor.execute(query, (user_id, part_id, quantity,))
        self.conn.commit()
        return user_id


