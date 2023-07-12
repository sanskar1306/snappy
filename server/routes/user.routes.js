const router = require("express").Router();
const { register ,login,setAvatar,getAllUsers} = require("../controllers/user.controller.js")


router.post("/register", register)
router.post("/login",login)
router.post("/setAvatar/:id", setAvatar)
router.get("/allusers/:id",getAllUsers)
module.exports = router;