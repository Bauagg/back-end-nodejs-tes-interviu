const Customer = require('../module/model.customer')

const getCustomer = async (req, res, next) => {
    try {
        const newCustomer = await Customer.find({ user: req.user.id }).populate('user', '-password')

        res.status(200).json({
            error: false,
            message: 'get data Customer success',
            datas: newCustomer
        })
    } catch (error) {
        next(error)
    }
}

const createCustomer = async (req, res, next) => {
    try {
        const { nama, contact, email, alamat, diskon, tipe_diskon } = req.body

        const newCustomer = await Customer.create({ nama, contact, email, alamat, diskon, tipe_diskon, user: req.user.id })

        res.status(201).json({
            error: false,
            message: 'create data Contact success',
            datas: newCustomer
        })
    } catch (error) {
        next(error)
    }
}

const updateCustomer = async (req, res, next) => {
    try {
        const { nama, contact, email, alamat, diskon, tipe_diskon } = req.body

        const regexContac = /\+62\s\d{3}[-\.\s]??\d{3}[-\.\s]??\d{3,4}|\(0\d{2,3}\)\s?\d+|0\d{2,3}\s?\d{6,7}|\+62\s?361\s?\d+|\+62\d+|\+62\s?(?:\d{3,}-)*\d{3,5}/
        if (!regexContac.test(contact)) {
            return res.status(400).json({
                error: false,
                message: `${contact} Contact tidak valid`
            })
        }

        const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!regexEmail.test(email)) {
            return res.status(400).json({
                error: true,
                message: `${email} Email tidak valid`
            })
        }

        if (!Customer.schema.path('tipe_diskon').enumValues.includes(tipe_diskon)) {
            res.status(400).json({
                error: true,
                message: 'type diskon tidak valid'
            })
        }

        const newCustomer = await Customer.updateOne({ _id: req.params.id }, { nama, contact, email, alamat, diskon, tipe_diskon })

        if (newCustomer.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update customer success',
                datas: newCustomer
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'data tidak ada yang di update',
                datas: newCustomer
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        await Customer.deleteOne({ _id: req.params.id })

        res.status(200).json({
            error: false,
            message: 'data berhasil di update'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getCustomer, createCustomer, updateCustomer, deleteCustomer }