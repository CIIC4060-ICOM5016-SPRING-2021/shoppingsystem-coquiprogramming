from flask import jsonify
from dao.parts import PartDAO
class PartController:
    def part_build_dict(self, row):
        result = {}
        result['part_id'] = row[0]
        result['part_name'] = row[1]
        result['part_price'] = row[2]
        result['cat_id'] = row[3]
        result['QuantityAvailable'] = row[4]
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

