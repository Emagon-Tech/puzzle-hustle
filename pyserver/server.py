from flask import Flask, request, jsonify,send_file
from flask_cors import CORS, cross_origin
import os
from random import sample
import image_slicer as img

app = Flask(__name__)

cors = CORS(app)



app.config['CORS_HEADERS'] = 'Content-Type'
app.config['Access-Control-Allow-Origin'] = 'http://192.168.0.1:19000/'
@app.route('/tic',methods=['GET'])

def hello():

	x=sample(range(1,45),1)

	path='./zipping/slicedimages/'+str(x[0])

	files=os.listdir(path)

	uriloc=[]
	files.sort()
	for i in range(1,len(files)):
		uriloc.append(files[i])
	print(uriloc)
	return jsonify(uriloc)


@app.route('/getimg',methods=['GET'])

def getingimg():

	x=request.args.get('id')

	d=x.split('_')[0]


	path='./zipping/slicedimages/'+d+'/'+x

	return send_file(path,mimetype='image')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
