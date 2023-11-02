const { getToken } = require("../utils/getToken")
const jwt = require("../utils/jwt")

module.exports = (req, res, next) => {
    try {
        const token = getToken(req)
        if (!token) return res.status(401).json({ error: true, message: 'authenticate faileds' })

        const verifyToken = jwt.verifyToken(token)
        if (!verifyToken) return res.status(401).json({ error: true, message: 'authenticate faileds' })

        req.user = verifyToken
        next()

    } catch (error) {
        next(error)
    }
}