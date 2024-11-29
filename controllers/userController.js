const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'Không có người dùng' })
        }

        const isMatch = await bcrypt.compare(password, user.password)


        if (!isMatch) {
            return res.json({ success: false, message: "Mật khẩu không đúng " })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: " User đã có email" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Nhập email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password còn yếu" })
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: "Error" })

    }
}

module.exports = { loginUser, registerUser };