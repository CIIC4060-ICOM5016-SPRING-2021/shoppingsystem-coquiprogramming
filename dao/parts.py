from config.pg import pg_config
import psycopg2

class PartDAO:
    def __init__(self):
        connection_url = "dbname =%s user=%s password=%s port =%s host='localhost'"\
                         %(pg_config['dbname'], pg_config['username'], pg_config['password'],
                           pg_config['dbport'])
        self.conn = psycopg2.connect(connection_url)