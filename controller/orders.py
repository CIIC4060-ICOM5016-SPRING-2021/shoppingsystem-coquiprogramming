import json

from flask import jsonify
from dao.orders import OrderDAO


class OrderController:
    def order_build_dict(self, row):
        result = {}
        result['order_id'] = row[0]
        result['user_id'] = row[1]
        result['total'] = row[2]
        return result

    def orderInfo_build_dict(self, row):
        result = {}
        result['part ID'] = row[0]
        result['Part Name'] = row[1]
        result['Part Price'] = row[2]
        result['Quantity'] = row[3]
        result['Parts Total'] = row[4]
        return result

    def newOrder_build_dict(self, row):
        result={}
        result['part_id'] = row[0]
        result['partquantity']= row[1]
        result['price_bought'] = row[2]
        return result

    def getAllOrders(self):
        dao = OrderDAO()

        result_tuples = dao.getAllOrders()
        result = []
        for row in result_tuples:
            dict = self.order_build_dict(row)
            result.append(dict)

        return jsonify(order=result)

    def getOrderInfoById(self, order_id):
        dao = OrderDAO()
        result_tuple = dao.getOrderInfoById(order_id)
        if not result_tuple:
            return jsonify("ERROR NOT FOUND"), 404

        result_list = []
        for row in result_tuple:
            result = self.orderInfo_build_dict(row)
            result_list.append(result)
        return jsonify(Orderhas=result_list)

    def createOrder(self, user_id):
        dao = OrderDAO()
        result_tuple = dao.createOrder(user_id)
        if not result_tuple:
            return jsonify(Error="No Such User Found"), 404
        result_list=[]
        for row in result_tuple:
            result = self.newOrder_build_dict(row)
            result_list.append(result)
        return jsonify(OrderCompleted=result_list)

    def deleteOrder(self, order_id):
        dao = OrderDAO()
        result_tuple = dao.deleteOrder(order_id)
        if not result_tuple:
            return jsonify(Error = "NO ORDER FOUND")
        return jsonify("ORDER ", order_id, " DELETED FROM RECORD")



