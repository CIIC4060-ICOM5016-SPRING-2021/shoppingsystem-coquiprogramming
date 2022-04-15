from flask import jsonify
from dao.parts import PartDAO
from dao.user import UserDAO


class PartController:
    def part_build_dict(self, row):
        result = {}
        result['part_id'] = row[0]
        result['part_name'] = row[1]
        result['part_price'] = row[2]
        result['cat_id'] = row[3]
        result['quantity'] = row[4]
        result['part_info'] = row[5]
        return result

    def partbyCat_build_dict(self, row):
        result = {}
        # result['cat_id'] = row[0]
        result['Part Name'] = row[0]
        result['Part ID'] = row[1]
        result['Part Price'] = row[2]
        result['Product Info'] = row[3]
        result['Quantity'] = row[4]
        return result

    def part_by_price_build_dict(self, row):
        result = {}
        result['part_id'] = row[0]
        result['part_name'] = row[1]
        result['part_price'] = row[2]
        result['cat_id'] = row[3]
        result['quantity'] = row[4]
        result['part_info'] = row[5]
        return result

    def partByPriceLessThanOrEqualTo_build_dict(self, row):
        result = {}
        # result['cat_id'] = row[0]
        result['part_id'] = row[1]
        result['part_name'] = row[2]
        result['part_price'] = row[3]
        result['QuantityAvailable'] = row[4]
        result['Category'] = row[5]
        return result

    def parts_by_name_dict(self, row):
        result = {}
        result['part_id'] = row[0]
        result['part_name'] = row[1]
        result['part_price'] = row[2]
        result['cat_id'] = row[3]
        result['quantity'] = row[4]
        result['part_info'] = row[5]
        return result

    def partsbyOrder_dict(self, row):
        result = {}
        result['part_id'] = row[0]
        result['part_price'] = row[1]
        result['cat_id'] = row[2]
        result['quantity'] = row[3]
        result['part_info'] = row[4]
        result['part_name'] = row[5]
        return result

    def getAllParts(self):
        dao = PartDAO()

        result_tuples = dao.getAllParts()
        result = []
        for row in result_tuples:
            dict = self.partsbyOrder_dict(row)
            result.append(dict)

        return jsonify(parts=result)

    def getPartById(self, part_id):
        dao = PartDAO()
        result_tuple = dao.getPartById(part_id)
        if not result_tuple:
            return jsonify("ERROR NOT FOUND"), 404
        part = self.partsbyOrder_dict(result_tuple)
        return jsonify(part)

    def getPartByCatname(self, cat_name):
        dao = PartDAO()
        result_tuple = dao.getPartbyCatname(cat_name)
        if not result_tuple:
            return jsonify("ERROR NOT FOUND"), 404

        result = []
        for row in result_tuple:
            dict = self.partbyCat_build_dict(row)
            result.append(dict)
        return jsonify(result)

    """
        Selects parts from price less than or equal to specified price.
    """

    def getPartsByPriceLessThanOrEqualTo(self, part_price):
        dao = PartDAO()
        result_tuples = dao.getPartsByPriceLessThanOrEqualTo(part_price)
        result = []
        for row in result_tuples:
            dict = self.partByPriceLessThanOrEqualTo_build_dict(row)
            result.append(dict)
        return jsonify(part=result)

    """
        Orders all parts alphabetically by name (ascending order).
    """

    def order_parts_by_name(self):
        dao = PartDAO()

        result_tuples = dao.order_parts_by_name()
        result = []
        for row in result_tuples:
            dict = self.partsbyOrder_dict(row)
            result.append(dict)

        return jsonify(parts=result)

    def order_parts_by_name_desc(self):
        dao = PartDAO()

        result_tuples = dao.order_parts_by_name_desc()
        result = []
        for row in result_tuples:
            dict = self.partsbyOrder_dict(row)
            result.append(dict)

        return jsonify(parts=result)

    def order_parts_by_price(self):
        dao = PartDAO()

        result_tuples = dao.order_parts_by_price()
        result = []
        for row in result_tuples:
            dict = self.partsbyOrder_dict(row)
            result.append(dict)

        return jsonify(parts=result)

    def order_parts_by_price_desc(self):
        dao = PartDAO()

        result_tuples = dao.order_parts_by_price_desc()
        result = []
        for row in result_tuples:
            dict = self.partsbyOrder_dict(row)
            result.append(dict)

        return jsonify(parts=result)


    def newPart(self, json):
        aUser_id = json['Admin ID']
        part_name = json['part_name']
        part_price = json['part_price']
        cat_id = json['cat_id']
        quantity = json['quantity']
        part_info = json['part_info']


        dao = PartDAO()
        userdao = UserDAO()
        admin = userdao.userAdmin(aUser_id)
        if admin:
            part_id = dao.newPart(part_name, part_price, cat_id, quantity, part_info)
            json['part_id'] = part_id
            return jsonify(json), 201
        if not admin: return jsonify("NOT ADMIN")

    def updatePart(self, part_id, json):
        aUser_id = json['Admin ID']
        part_name = json['part_name']
        part_price = json['part_price']
        cat_id = json['cat_id']
        quantity = json['quantity']
        part_info = json['part_info']
        userdao = UserDAO()
        dao = PartDAO()

        admin = userdao.userAdmin(aUser_id)

        result = dao.updatePart(part_id, part_name, part_price, cat_id, quantity, part_info)
        if admin:
            result = dao.updatePart(part_id, part_name, part_price, cat_id, quantity, part_info)
            if result:
                return jsonify(json), 200
        if not admin:
            return jsonify("NOT ADMIN")
        else:
            return jsonify("NOT FOUND"), 404


    def deletePart(self, part_id, json):
         aUser_id = json['Admin ID']

         dao = PartDAO()
         userdao = UserDAO()
         admin = userdao.userAdmin(aUser_id)

         if admin:
             result_tuple = dao.getPartById(part_id)
             if result_tuple:
                 dao.deletePart(part_id)
                 return jsonify("Part Deleted"), 200
             if not result_tuple:
                 return jsonify("PART NOT FOUND"), 404
         if not admin:
            return jsonify("NOT ADMIN")


