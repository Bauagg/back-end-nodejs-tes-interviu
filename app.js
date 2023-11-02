require('./databases/mongoose')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const config = require('./config/config')

const port = config.port || 4000
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/router.user'))
app.use('/', require('./routes/router.items'))
app.use('/', require('./routes/router.customer'))
app.use('/', require('./routes/router.salles'))

app.use(require('./midelware/midelware.error'))

app.listen(port, () => console.log(`connection express success ${port}`))