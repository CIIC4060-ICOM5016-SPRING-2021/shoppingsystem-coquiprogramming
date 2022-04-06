from config.pg import pg_config
import psycopg2


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
        query = "select part_name,part_price, partquantity from (orderhas left join parts p on p.part_id = orderhas.part_id) where order_id = %s"
        cursor = self.conn.cursor()
        cursor.execute(query, (order_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result


