const express = require("express")
const cors = require("cors")
const socket = require('socket.io')
const mongoose = require("mongoose")
const userRoutes = require("./routes/user.routes.js")
const avatarRoutes = require("./routes/avatars.routes.js")
const messageRoutes = require("./routes/messages.routes.js")
const app = express();
require("dotenv").config()
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/avatars", avatarRoutes);
app.use("/api/messages", messageRoutes);
const Port = process.env.PORT
const MongoUri = process.env.MONGO_URL

mongoose.connect(MongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connection successfully")
}).catch((err) => {
    console.log(err.message);
})


const server = app.listen(Port, () => {
    console.log(`Server started on Port ${Port} successfully`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials:true
    }
})


global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            // console.log(data)
            socket.to(sendUserSocket).emit("msg-receive", data);

        }
    });
});