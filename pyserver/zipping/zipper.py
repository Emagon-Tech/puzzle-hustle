import os
import subprocess
from random import sample
import image_slicer as img
from shutil import copy,make_archive,move

imagelist=os.listdir('/Users/gouthamreddy/Desktop/pyserver/zipping/images')[1:]

# def maker_archive(source, destination):
#         base = os.path.basename(destination)
#         name = base.split('.')[0]
#         format = base.split('.')[1]
#         archive_from = os.path.dirname(source)
#         archive_to = os.path.basename(source.strip(os.sep))
#         make_archive(name, format, archive_from, archive_to)
#         move('%s.%s'%(name,format), destination)


def hello():
	path='/Users/gouthamreddy/Desktop/pyserver/zipping/images/'
	for i in imagelist:
		os.makedirs('./'+str((i+1)))
		copy(path+y[0],'/Users/gouthamreddy/Desktop/pyserver/zipping/'+str(i+1))
		img.slice('/Users/gouthamreddy/Desktop/pyserver/zipping/'+str(i+1)+'/'+y[0],9)

#	cmdzip='zip -r -X "../MyFolder.zip" *.png'
#	y=sample(imagelist,1)
#	img.slice('/Users/gouthamreddy/Desktop/pyserver/zipping/tmpimages/'+y[0],9)
#	maker_archive('./tmpimages', '../tmp.zip')
	#make_archive('./tmpimages','zip','./')
#	os.system('rm -rf *.png')

if __name__ == '__main__':
	hello()
