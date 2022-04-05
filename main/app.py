from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from controller.parts import PartController

app = Flask(__name__)

'''Root route for handler() function.'''


@app.route('/')
def handler():
    return 'Root route. Hello, user!'


"""
    All parts in the page. 
"""


@app.route('/PartsApp/Parts', methods=['GET', 'POST'])
def parts_handler():
    if request.method == 'GET':
        return PartController().getAllParts()
    elif request.method == 'POST':
        return PartController().newPart(request.json)
    else:
        return jsonify("Method Not Supported"), 405


"""
    Page for part with specific part id.
"""


@app.route('/PartsApp/Parts/<int:part_id>', methods=['GET', 'PUT'])
def parts_byid_handler(part_id):
    if request.method == 'GET':
        return PartController().getPartById(part_id)
    elif request.method == 'PUT':
        return PartController().updatePart(part_id, request.json)
    else:
        return jsonify("Not Supported"), 405


"""
    Parts page for specified category of the part. 
"""


@app.route('/PartsApp/Parts/<string:cat_name>', methods=['GET'])
def parts_bycatname_handler(cat_name):
    if request.method == 'GET':
        return PartController().getPartByCatname(cat_name)

    else:
        return jsonify("NOT SUPPORTED"), 405


"""
    Route to filter parts by prices less than or equal to desired price.
"""


@app.route('/PartsApp/Parts/Filter/PriceLessThan/<string:part_price>', methods=['GET'])
def parts_by_price_less_than_equal_to(part_price):
    if request.method == 'GET':
        return PartController().getPartsByPriceLessThanOrEqualTo(part_price)
    else:
        return jsonify("NOT SUPPORTED"), 405


if __name__ == '__main__':
    app.run(debug=1)
