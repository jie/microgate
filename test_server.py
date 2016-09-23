from flask import Flask
from flask import request
from flask import jsonify
from flask import abort
import time
app = Flask(__name__)


@app.route('/api/1', defaults={'path': ''}, methods=['GET', 'POST'])
@app.route('/api/1/<path:path>', methods=['GET', 'POST'])
def api1(path):
    time.sleep(20)
    return jsonify({
        'userinfo': {
            'username': 'zhouyang',
            'pk': 10,
            'birthday': '2010101'
        }
    })


@app.route('/api/2', defaults={'path': ''}, methods=['GET', 'POST'])
@app.route('/api/2/<path:path>', methods=['GET', 'POST'])
def api2(path):
    return abort(400, 'you did a bad request')


@app.route('/api/3', defaults={'path': ''}, methods=['GET', 'POST'])
@app.route('/api/3/<path:path>', methods=['GET', 'POST'])
def api3(path):
    userId = request.args.get('userId')
    return jsonify({
        'userinfo': {
            'userId': userId
        }
    })

@app.route('/usercenter/userinfo', methods=['GET', 'POST'])
def api4():
    return jsonify({
        'userinfo': {
            'username': 'zhouyang'
        }
    })

if __name__ == '__main__':
    app.run(port=1330, host='0.0.0.0')
