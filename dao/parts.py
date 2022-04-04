from config.pg import pg_config
import psycopg2

class PartDAO:
    def __init__(self):
        connection_url = "dbname =%s user=%s password=%s port =%s host=%s"\
                         %(pg_config['dbname'], pg_config['user'], pg_config['password'],
                           pg_config['dbport'], pg_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def getAllParts(self):
        #query = "select tablename from pg_catalog.pg_Tables where tableowner != 'postgres'"
        query = "SELECT * from parts"
        cursor = self.conn.cursor()
        cursor.execute(query)

        result = []
        for row in cursor:
            result.append(row)
        return result

    def getPartById(self,part_id):
        query = "select * from parts where part_id = '%s'"
        cursor = self.conn.cursor()
        cursor.execute(query, (part_id,))
        result = cursor.fetchone()
        return result

    def getPartbyCatname(self, cat_name):
        query = "select * from (parts natural inner join categories) where cat_name = %s"
        cursor = self.conn.cursor()
        cursor.execute(query, (cat_name,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def newPart(self, part_name, part_price, cat_id, quantity, part_info):
        cursor = self.conn.cursor()
        query = "insert into parts (part_name, part_price, cat_id, quantity, part_info) values(%s, %s, %s, %s, %s) returning part_id"
        cursor.execute(query, (part_name, part_price, cat_id, quantity, part_info,))
        part_id = cursor.fetchone()[0]
        self.conn.commit()
        return part_id