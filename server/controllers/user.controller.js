const bcrypt = require("bcrypt")
const User = require("../model/user.model")

module.exports.register = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });

        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            username,
            password: hashedPwd
        });

        delete user, password;
        return res.json({ status: true, user });

    } catch (error) {
        next(error);
    }

};


module.exports.login = async (req, res, next) => {
    try {

        const { username, password } = req.body;
        // console.log(username)
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ msg: "Username doesn't exist", status: false });
        }

        const validPwd = await bcrypt.compare(password, user.password);

        if (!validPwd) {
            return res.json({ msg: "Incorrect Password.", status: false });
        }

        delete user, password;
        // console.log(user)
        return res.json({ status: true, user });

    } catch (error) {
        next(error);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    // console.log(req)
    try {
        // console.log(req)
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id  }}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
    return res.json(users)
    } catch (error) {
        next(error);
    }
}