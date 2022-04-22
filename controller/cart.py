from flask import jsonify
from dao.cart import CartDAO
from dao.parts import PartDAO
from dao.user import UserDAO


class CartController:

    def build_cart_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['part_id'] = row[1]
        result['quantity'] = row[2]
        return result

    def view_cart_dict(self, row):
        result = {}
        #result['user_id'] = row[0]
        result['part_id'] = row[0]
        result['quantity'] = row[1]
        result['part_name'] = row[2]
        return result

    def viewPart_cart_dict(self, row):
        result = {}
        #result['user_id'] = row[0]
        result['part_id'] = row[0]
        result['quantity'] = row[1]
        return result

    def newPart(self, json):
        user_id = json['user_id']
        part_id = json['part_id']
        quantity = json['quantity']
        userdao = UserDAO()
        partdao = PartDAO()
        userExist = userdao.getUserById(user_id)
        partExist = partdao.getPartById(part_id)

        dao = CartDAO()

        if userExist:
            if partExist:
                part_id = dao.addPartToCart(user_id, part_id, quantity)
                return jsonify(json), 201
            if not partExist:
                return jsonify("PART NOT FOUND"),404

        if not userExist:
            return jsonify("USER NOT FOUND"),404

    def deletePartFromCart(self, json):

        dao = CartDAO()

        user_id = json['user_id']
        part_id = json['part_id']


        userExist = dao.cartUserExist(user_id)
        partExist = dao.cartPartExist(part_id)

        result_tuple = dao.deletePartFromCart(user_id, part_id)
        if userExist:
            if partExist:
                result_tuple = dao.deletePartFromCart(user_id, part_id)
                return jsonify("PART DELETED FROM CART")
            if not partExist:
                return jsonify("PART NOT FOUND")
        if not userExist:
            return jsonify("NOT USER FOUND")

    def clearAllPartsFromCart(self, user_id):
        dao = CartDAO()
        userExist = dao.cartUserExist(user_id)
        if userExist:
            result_tuple = dao.clearAllPartsFromCart(user_id)
            return jsonify("Cart Has Been Cleared"), 200

        if not userExist:
            return jsonify("USER DOES NOT HAVE A CART"), 404


    def viewCart(self, user_id):
        dao = CartDAO()

        result_tuples = dao.viewCart(user_id)
        result = []
        for row in result_tuples:
            dict = self.view_cart_dict(row)
            result.append(dict)

        return jsonify(cart=result)

