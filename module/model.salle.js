const mongoose = require('mongoose')

const modelSales = mongoose.Schema({
    // code_transaksi: {
    //     type: String,
    //     required: true
    // },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'customer harus di isi']
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Items',
                required: [true, 'item harus di isi'],
            },
            qty: {
                type: Number,
                min: [1, 'min value adalah 1'],
                required: [true, 'qty harus di isi'],
            },
            total_harga: {
                type: Number,
                required: [true, 'total harga harus di isi']
            },
        }
    ],
    total_diskon: {
        type: Number
    },

    total_bayar: {
        type: Number,
        required: [true, 'total bayar harus di isi']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'user harus di isi']
    }
})

const Salles = mongoose.model('Salles', modelSales)

module.exports = Salles