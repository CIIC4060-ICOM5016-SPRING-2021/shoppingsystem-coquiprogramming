from flask import jsonify
from backend.dao.globalstatistics import GlobalDAO

class GlobalController:
    def mostexpensive_build_dict(self, row):
        result = {}
        result['part_id'] = row[0]
        result['part_name'] = row[1]
        result['part_price'] = row[2]
        return result
    def mostLiked_build_dict(self, row):
        result = {}
        result['part_id'] = row[0]
        result['part_name'] = row[1]
        result['Likes'] = row[2]
        return result

    def topProductBought_build_dict(self, row):
        result = {}
        result['part_name'] = row[0]
        result['part_id'] = row[1]
        result['sold'] = row[2]
        return result
    def topCatBought_build_dict(self, row):
        result = {}
        result['cat_id'] = row[0]
        result['category'] = row[1]
        result['sold'] = row[2]
        return result



    def getMostExpensive(self):
        dao = GlobalDAO()

        result_tuples = dao.getMostExpensive()
        result = []
        for row in result_tuples:
            dict = self.mostexpensive_build_dict(row)
            result.append(dict)

        return jsonify(result)

    def getCheapest(self):
        dao = GlobalDAO()
        result_tuples = dao.getCheapest()
        result = []
        for row in result_tuples:
            dict = self.mostexpensive_build_dict(row)
            result.append(dict)
        return jsonify(result)

    def getMostLiked(self):
        dao = GlobalDAO()
        result_tuples = dao.mostLiked()
        result = []
        for row in result_tuples:
            dict = self.mostLiked_build_dict(row)
            result.append(dict)
        return jsonify(result)

    def getTopProductBought(self):
        dao = GlobalDAO()
        result_tuples = dao.topProductBought()
        result = []
        for row in result_tuples:
            dict = self.topProductBought_build_dict(row)
            result.append(dict)
        return jsonify(result)

    def getTopCatBought(self):
        dao = GlobalDAO()
        result_tuples = dao.topCatBought()
        result = []
        for row in result_tuples:
            dict = self.topCatBought_build_dict(row)
            result.append(dict)
        return jsonify(result)


