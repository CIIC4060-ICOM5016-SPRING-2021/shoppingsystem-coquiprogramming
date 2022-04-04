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

