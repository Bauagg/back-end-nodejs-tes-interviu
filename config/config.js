const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    port: process.env.PORT,
    secretkey: process.env.SECRETKEY
}