const Users = require('../module/model.user')
const bcrypt = require('../utils/bcrypt')
const jwt = require('../utils/jwt')

const register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body

        const validateEmail = await Users.exists({ email })
        if (validateEmail) return res.status(401).json({ error: true, message: 'Email sudah terdaftar' })

        if (!password || password.length < 3) return res.status(401).json({ error: true, message: 'Password kurang kuat' })

        const newUser = await Users.create({ username, email, password: await bcrypt.hashPassword(password), role })

        res.status(200).json({
            error: false,
            message: 'Register success',
            datas: newUser
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const newUser = await Users.findOne({ email })
        if (!newUser) return res.status(400).json({ error: true, message: 'Email dan Password salah' })

        const validatePassword = await bcrypt.verifyPassword(password, newUser.password)
        if (!validatePassword) return res.status(400).json({ error: false, message: 'Email dan Password salah' })

        const payloadToken = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        }

        const token = await jwt.createToken(payloadToken)

        res.status(200).json({
            error: false,
            message: 'Login success',
            datas: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login }