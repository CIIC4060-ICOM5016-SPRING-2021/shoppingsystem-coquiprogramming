from config.pg import pg_config
import psycopg2


class GlobalDAO:
    def __init__(self):
        connection_url = "dbname =%s user=%s password=%s port =%s host=%s" \
                         % (pg_config['dbname'], pg_config['user'], pg_config['password'],
                            pg_config['dbport'], pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def getMostExpensive(self):
        query = "select part_id, part_name, part_price from parts where part_price >= (select max(part_price) from parts)"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    def getCheapest(self):
        query = "select part_id, part_name, part_price from parts where part_price <= (select min(part_price) from parts)"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def mostLiked(self):
        query = "select wishlist.part_id,p.part_name, count(wishlist.part_id)from wishlist " \
                "left join parts p on p.part_id = wishlist.part_id group by wishlist.part_id, p.part_name order by count desc limit 1"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def topProductBought(self):
        query = " select part_name, orderhas.part_id, sum(partquantity) as bought from orderhas" \
                " left join parts p on p.part_id = orderhas.part_id group by orderhas.part_id, part_name order by bought desc limit 10;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def topCatBought(self):
        query = "select c.cat_id, c. cat_name, sum(partquantity) as bought from orderhas left join" \
                " parts p on p.part_id = orderhas.part_id left join categories c on c.cat_id = p.cat_id " \
                "group by c.cat_name, c.cat_id order by bought desc limit 10"

        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
