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
        result['Part Name'] = row[0]
        result['Part ID'] = row[1]
        result['Sold'] = row[2]
        return result
    def topCatBought_build_dict(self, row):
        result = {}
        result['Cat ID'] = row[0]
        result['Category'] = row[1]
        result['Sold'] = row[2]
        return result



    def getMostExpensive(self):
        dao = GlobalDAO()

        result_tuples = dao.getMostExpensive()
        result = []
        for row in result_tuples:
            dict = self.mostexpensive_build_dict(row)
            result.append(dict)

        return jsonify(product=result)

    def getCheapest(self):
        dao = GlobalDAO()
        result_tuples = dao.getCheapest()
        result = []
        for row in result_tuples:
            dict = self.mostexpensive_build_dict(row)
            result.append(dict)
        return jsonify(product = result)

    def getMostLiked(self):
        dao = GlobalDAO()
        result_tuples = dao.mostLiked()
        result = []
        for row in result_tuples:
            dict = self.mostLiked_build_dict(row)
            result.append(dict)
        return jsonify(Liked = result)

    def getTopProductBought(self):
        dao = GlobalDAO()
        result_tuples = dao.topProductBought()
        result = []
        for row in result_tuples:
            dict = self.topProductBought_build_dict(row)
            result.append(dict)
        return jsonify(Top10=result)

    def getTopCatBought(self):
        dao = GlobalDAO()
        result_tuples = dao.topCatBought()
        result = []
        for row in result_tuples:
            dict = self.topCatBought_build_dict(row)
            result.append(dict)
        return jsonify(Top=result)


