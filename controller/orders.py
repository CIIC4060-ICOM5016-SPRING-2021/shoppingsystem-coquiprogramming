from flask import jsonify
from dao.orders import OrderDAO


class OrderController:
    def order_build_dict(self, row):
        result = {}
        result['order_id'] = row[0]
        result['user_id'] = row[1]
        result['total'] = row[2]
        return result

    def getAllOrders(self):
        dao = OrderDAO()

        result_tuples = dao.getAllOrders()
        result = []
        for row in result_tuples:
            dict = self.order_build_dict(row)
            result.append(dict)

        return jsonify(order=result)