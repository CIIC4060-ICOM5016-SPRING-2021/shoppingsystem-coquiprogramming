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
