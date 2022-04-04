from flask import jsonify
from dao.parts import PartDAO
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
        #result['cat_id'] = row[0]
        result['part_id'] = row[1]
        result['part_name'] = row[2]
        result['part_price'] = row[3]
        result['QuantityAvailable'] = row[4]
        result['Category'] = row[5]
        return result

    def getAllParts(self):
        dao = PartDAO()

        result_tuples = dao.getAllParts()
        result = []
        for row in result_tuples:
            dict = self.part_build_dict(row)
            result.append(dict)

        return jsonify(parts = result)

    def getPartById(self, part_id):
       dao = PartDAO()
       result_tuple = dao.getPartById(part_id)
       if not result_tuple:
           return jsonify("ERROR NOT FOUND"),404
       part = self.part_build_dict(result_tuple)
       return jsonify(part)

    def getPartByCatname(self, cat_name):
        dao = PartDAO()
        result_tuple = dao.getPartbyCatname(cat_name)
        if not result_tuple:
            return jsonify("ERROR NOT FOUND"),404

        result = []
        for row in result_tuple:
            dict = self.partbyCat_build_dict(row)
            result.append(dict)
        return jsonify(result)

    def newPart(self, json):
        part_name = json['part_name']
        part_price = json['part_price']
        cat_id = json['cat_id']
        quantity = json['quantity']
        part_info = json['part_info']

        dao = PartDAO()
        part_id = dao.newPart(part_name, part_price, cat_id, quantity, part_info)

        json['part_id'] = part_id
        return jsonify(json),201

    def updatePart(self, part_id, json):
        part_name = json['part_name']
        part_price = json['part_price']
        cat_id = json['cat_id']
        quantity = json['quantity']
        part_info = json['part_info']

        dao = PartDAO()
        result = dao.updatePart(part_id, part_name, part_price, cat_id, quantity, part_info)
        if result:
            return jsonify(json),200
        else:
            return jsonify("NOT FOUND"), 404

