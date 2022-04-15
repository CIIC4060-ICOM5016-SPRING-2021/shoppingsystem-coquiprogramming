from flask import jsonify

from dao.parts import PartDAO
from dao.wishlist import WishListDAO


class WishListController:

    def build_wishlist_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['part_id'] = row[1]
        return result

    def view_wishlist_dict(self, row):
        result = {}
        result['Part ID'] = row[0]
        result['Part Name'] = row[1]
        result['Part Price'] = row[2]
        return result

    def addPartToWishList(self, json):
        user_id = json['user_id']
        part_id = json['part_id']

        dao = WishListDAO()
        partdao = PartDAO()

        partExist = partdao.getPartById(part_id)
        if partExist:
            part_id = dao.addPartToWishList(user_id, part_id)
            return jsonify(json), 201

        elif not partExist:
            return jsonify("PART NOT FOUND"),404

    def deletePartFromWishList(self, json):
        user_id = json['user_id']
        part_id = json['part_id']
        dao = WishListDAO()
        result_tuple = dao.deletePartFromWishList(user_id, part_id)

        if not result_tuple:
            return jsonify("PART NOT FOUND"), 404
        else:
            dao.deletePartFromWishList(user_id, part_id)
        return jsonify("Part Deleted"), 200

    def clearAllPartsFromWishList(self, user_id):
        dao = WishListDAO()
        result_tuple = dao.clearAllPartsFromWishList(user_id)

        if not result_tuple:
            return jsonify("PART NOT FOUND"), 404
        else:
            dao.clearAllPartsFromWishList(user_id)
        return jsonify("Wishlist Has Been Cleared"), 200

    def viewWishList(self, user_id):
        dao = WishListDAO()

        result_tuples = dao.viewWishList(user_id)
        result = []
        for row in result_tuples:
            dict = self.view_wishlist_dict(row)
            result.append(dict)

        return jsonify(wishlist=result)

