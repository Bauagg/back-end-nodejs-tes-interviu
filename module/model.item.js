const mongoose = require('mongoose')

const modelItems = mongoose.Schema({
    nama_item: {
        type: String,
        required: [true, 'name harus di isi'],
        minlength: [3, 'min karakter 3 karakter'],
        maxlength: [250, 'max karakter 250 karakter']
    },
    unit: {
        type: String,
        enum: ['kg', 'pcs'],
        message: '{VALUE} is not suport',
        default: 'kg'
    },
    stok: {
        type: Number,
        required: [true, 'stock harus di isi'],
        min: [1, 'minimal stok adalah 1 number']
    },
    price: {
        type: Number,
        required: [true, 'price harus di isi']
    },
    image: String
})

const Items = mongoose.model('Items', modelItems)

module.exports = Items