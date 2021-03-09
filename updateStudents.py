import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import os
cred = credentials.Certificate("config.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://attendace-b2f9c-default-rtdb.firebaseio.com/'})

path = 'Students'

students = []
myList = os.listdir(path)
for student in myList:
    students.append(os.path.splitext(student)[0])
print('Students : ',students)
print('\n\nUpdating in database...')
for student in students:
    student = student.split()
    db.reference('ids').child(student[0]).set({'email': student[1].lower()})

print('Data updated Sucessfully...')