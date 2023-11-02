const mongoose = require('mongoose')

const modelUser = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name harus di isi'],
        maxlength: 255
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
    password: {
        type: String,
        required: [true, 'password harus di isi'],
        maxlength: 255,
        minlength: [3, 'min password 3 karakter']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        message: '{VALUE} is not suport',
        default: 'user'
    }
})

const Users = mongoose.model('Users', modelUser)

module.exports = Users