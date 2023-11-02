const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
    createToken: (token) => {
        return jwt.sign(token, config.secretkey)
    },
    verifyToken: (token) => {
        try {
            return jwt.verify(token, config.secretkey)
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token has expired')
            } else {
                throw new Error('Invalid token')
            }
        }
    }
}