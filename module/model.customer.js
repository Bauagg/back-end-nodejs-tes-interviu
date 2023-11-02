const mongoose = require('mongoose')

const modelCustomer = mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'name harus di isi'],
    },
    contact: {
        type: String,
        required: [true, 'contact harus di isi'],
        validate: {
            validator: (value) => {
                const regexContac = /\+62\s\d{3}[-\.\s]??\d{3}[-\.\s]??\d{3,4}|\(0\d{2,3}\)\s?\d+|0\d{2,3}\s?\d{6,7}|\+62\s?361\s?\d+|\+62\d+|\+62\s?(?:\d{3,}-)*\d{3,5}/
                return regexContac.test(value)
            },
            message: (props) => `${props.value} Contact tidak valid`
        }
    },
    email: {
        type: String,
        required: [true, 'email harus di isi'],
        validate: {
            validator: (value) => {
                const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
                return regexEmail.test(value)
            },
            message: (props) => `${props.value} Email tidak valid`
        }
    },
    alamat: {
        type: String,
        required: [true, 'alamat harus di isi'],
    },
    diskon: {
        type: Number,
        min: 0,
        default: 0
    },
    tipe_diskon: {
        type: String,
        enum: ['persentase', 'fix'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Customer = mongoose.model('Customer', modelCustomer)

module.exports = Customer