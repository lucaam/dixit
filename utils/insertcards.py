# importing the requests library 
import requests
  
# api-endpoint 
URL = "http://localhost:3000/api/v1/cards"
  
with open('parole_dixit.txt') as f:
    lines = f.readlines()
    for line in lines:
        card = line.split(',')
        DATA = {"name": card[0].rstrip('\n'), "picture": card[1].rstrip('\n').strip()}
        r = requests.post(URL, json=DATA) 
        if(r.status_code == 200):
            print("Card inserted")
        elif (r.status_code == 400):
            print("Card already exists")
        else:
            print("Generic error")

