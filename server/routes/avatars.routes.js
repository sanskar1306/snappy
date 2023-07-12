const router = require("express").Router();
const { getAvatars } = require("../controllers/avatars.controller.js")


router.get("/getAvatars", getAvatars)


module.exports = router;