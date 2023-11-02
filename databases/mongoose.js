const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Inventory')

const db = mongoose.connection

db.on('error', console.log.bind(console, 'mongoose connection error'))
db.on('open', () => console.log('mongoose connection success'))