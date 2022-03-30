from flask import Flask

app = Flask(__name__)

'''Root route for handler() function.'''


@app.route('/')
def handler():
    return 'Root route. Hello, user!'


if __name__ == '__main__':
    app.run(debug=1)
