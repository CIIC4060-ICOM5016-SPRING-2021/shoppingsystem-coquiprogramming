from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from controller.parts import PartController

app = Flask(__name__)

'''Root route for handler() function.'''


@app.route('/')
def handler():
    return 'Root route. Hello, user!'

@app.route('/PartsApp/Parts', methods = ['GET', 'POST'])
def parts_handler():
    if request.method == 'GET':
        return PartController().getAllParts()
    elif request.method == 'POST':
        return PartController().newPart(request.json)
    else:
        return jsonify("Method Not Supported"),405

@app.route('/PartsApp/Parts/<int:part_id>', methods = ['GET', 'POST'])
def parts_byid_handler(part_id):
    if request.method == 'GET':
        return PartController().getPartById(part_id)

    else: return jsonify("Not Supported"), 405

@app.route('/PartsApp/Parts/<string:cat_name>', methods = ['GET'])
def parts_bycatname_handler(cat_name):
    if request.method == 'GET':
        return PartController().getPartByCatname(cat_name)

    else: return jsonify("NOT SUPPORTED"), 405

if __name__ == '__main__':
    app.run(debug=1)
