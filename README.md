# Snappy

Snappy is a realtime chat application built usin React.js, Node.js, MongoDB and Sockets.


![Login page](<https://github.com/sanskar1306/snappy/blob/main/screenshots/login.png>)
![Signup page](<https://github.com/sanskar1306/snappy/blob/main/screenshots/signup.png>)
![Avatar page](<https://github.com/sanskar1306/snappy/blob/main/screenshots/avatar.png>)
![Home page](<https://github.com/sanskar1306/snappy/blob/main/screenshots/chat.png>)
![Chat page](<https://github.com/sanskar1306/snappy/blob/main/screenshots/chat-container.png>)



## Main features

- Real time messaging with socket.io
- User authentication using Email
- Avatar feature for users to set their avatar image
- End to end chat encryption



## Tech Stack

- We have used **React** in the frontend.
- **Node js** for most the Backend and User Authentication.
- **MongoDB** as our database.
- **Docker** for containerizing the application
---

## How to Setup Frontend

```bash
git clone https://github.com/sanskar1306/snappy.git
cd snappy/client
npm install

```
In src add env file

HOST = "" 

```bash
npm start
```

- This will start the FRONTEND on port 3000

## How to Setup Backend

```bash
cd snappy/server
npm install

```
Add env file

PORT=
MONGO_URL=""
CLIENT_URL=""

```bash
npm start
```

- This will start the BACKEND on port 5000
