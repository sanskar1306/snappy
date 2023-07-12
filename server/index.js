const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user.routes.js")
const avatarRoutes = require("./routes/avatars.routes.js")
const app = express();
require("dotenv").config()
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/avatars", avatarRoutes);
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

