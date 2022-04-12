from flask import jsonify
from dao.user import UserDAO


class UserController(object):

    def build_user_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['user_password'] = row[1]
        result['user_email'] = row[2]
        result['full_name'] = row[3]
        result['balance'] = row[4]
        result['user_rol'] = row[5]
        return result

    def getAllUser(self):
        dao = UserDAO()

        result_tuples = dao.getAllUser()
        result = []
        for row in result_tuples:
            res = self.build_user_dict(row)
            result.append(res)

        return jsonify(User=result)

    def getUserById(self, user_id):
        dao = UserDAO()

        row = dao.getUserById(user_id)
        if not row:
            return jsonify(Error="No Such User Found"), 404
        else:
            user = self.build_user_dict(row)
        return jsonify(User=user)

    def newUser(self, json: dict):
        aUser_id = json['user_id']
        user_password = json['user_password']
        user_email = json['user_email']
        full_name = json['full_name']
        balance = json['balance']
        user_rol = json['user_rol']
        dao = UserDAO()
        result = dao.newUser(user_password, user_email, full_name, balance, user_rol)
        admin = dao.userAdmin(aUser_id)
        user_id = json['user_id']
        if result & admin:
            return jsonify({
            'user_id': user_id,
           'user_password': user_password,
          'user_email': user_email,
          'full_name': full_name,
          'balance': balance,
          'user_rol': user_rol
         }), 200
        else:
            return jsonify(Error='User does not have access to create accounts'), 406

    def updateUser(self, json):
        user_id = json['user_id']
        user_password = json['user_password']
        user_email = json['user_email']
        full_name = json['full_name']
        balance = json['balance']
        user_rol = json['user_rol']

        dao = UserDAO()
        result = dao.updateUser(user_id, user_password, user_email, full_name, balance, user_rol)
        if result:
            return jsonify({
                'user_id': user_id,
                'user_password': user_password,
                'user_email': user_email,
                'full_name': full_name,
                'balance': balance,
                'user_rol': user_rol
            }), 200
        else:
            return jsonify(Error='Unable to Update User'), 404

    def deleteUserById(self, user_id):
        if type(user_id) == int:
            user_id = (user_id,)
        else:
            user_id = tuple(user_id)
        dao = UserDAO()
        result = dao.deleteUserById(user_id)
        if result:
            return jsonify(Error="User Has Been Successfully Deleted"), 200
        else:
            return jsonify(Error="No Such User Found"), 404
