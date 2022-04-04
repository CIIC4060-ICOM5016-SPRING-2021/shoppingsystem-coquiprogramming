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
    else:
        return jsonify("Method Not Supported"),405


if __name__ == '__main__':
    app.run(debug=1)
