import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("config.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://attendace-b2f9c-default-rtdb.firebaseio.com/'})

# from PIL import ImageGrab

path = 'Students'
images = []
classNames = []
myList = os.listdir(path)
print(myList)
for cl in myList:
	curImg = cv2.imread(f'{path}/{cl}')
	images.append(curImg)
	classNames.append(os.path.splitext(cl)[0])
print(classNames)


def findEncodings(images):
	encodeList = []
	for img in images:
		img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
		encode = face_recognition.face_encodings(img)[0]
		encodeList.append(encode)
	return encodeList


def markAttendance(data):
	now = datetime.now()

	filename = 'Attendance_'+now.strftime('%Y%m%d')+'.csv'

	if not os.path.exists(filename):
		with open(filename, 'w+' ) as f:
			f.writelines('Enrollment,Email,Time')

	with open(filename, 'r+') as f:
		myDataList = f.readlines()
		nameList = []
		for line in myDataList:
			entry = line.split(',')
			nameList.append(entry[0])
		data = data.split()
		enrollment = data[0]
		print("Attendance done :",enrollment)
		email = data[1]
		if enrollment not in nameList:
			currentTime = now.strftime('%I:%M:%S %p')
			f.writelines(f'\n{enrollment},{email.lower()},{currentTime}')
			db.reference('Days').child(now.strftime('%Y%m%d')+'/'+enrollment).set({'time': currentTime})
			db.reference('Students').child(enrollment).push({'date': now.strftime('%d %B %Y'), 'time': currentTime})


#### FOR CAPTURING SCREEN RATHER THAN WEBCAM
# def captureScreen(bbox=(300,300,690+300,530+300)):
#     capScr = np.array(ImageGrab.grab(bbox))
#     capScr = cv2.cvtColor(capScr, cv2.COLOR_RGB2BGR)
#     return capScr

encodeListKnown = findEncodings(images)
print('Encoding Complete')

cap = cv2.VideoCapture(0)

while True:
	success, img = cap.read()
	# img = captureScreen()
	#imgS = img
	imgS = img
	#cv2.resize(img, (0, 0), None, 0.25, 0.25)
	imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

	facesCurFrame = face_recognition.face_locations(imgS)
	encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

	for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
		matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
		faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
		# print(faceDis)
		matchIndex = np.argmin(faceDis)

		if matches[matchIndex]:
			name = classNames[matchIndex].upper()
			# print(name)
			y1, x2, y2, x1 = faceLoc
			#y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
			cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
			cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
			cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
			markAttendance(name)

	cv2.imshow('Webcam', img)
	cv2.waitKey(1)