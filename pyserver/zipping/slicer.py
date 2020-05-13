import os

import image_slicer as img

from shutil import copy,make_archive,move

imagelist=os.listdir('/Users/gouthamreddy/Desktop/pyserver/zipping/images')[1:]


def hello():

	path='/Users/gouthamreddy/Desktop/pyserver/zipping/images/'
	n=len(imagelist)
	for i in range(n):

		d=str(i+1)

		os.makedirs('./'+d)

		copy(path+imagelist[i],'/Users/gouthamreddy/Desktop/pyserver/zipping/'+d+'/'+d+'.png')

		img.slice('/Users/gouthamreddy/Desktop/pyserver/zipping/'+d+'/'+d+'.png',9)

if __name__ == '__main__':

	hello()
