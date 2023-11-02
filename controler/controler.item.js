const Items = require('../module/model.item')

const getItem = async (req, res, next) => {
    try {
        const { namaItem } = req.query

        let search = {}
        if (namaItem) {
            search = {
                ...search, nama_item: { $regex: namaItem, $options: 'i' }
            }
        }

        const newItems = await Items.find(search)

        res.status(200).json({
            error: false,
            message: 'get data items success',
            datas: newItems
        })
    } catch (error) {
        next(error)
    }
}

const getItemsById = async (req, res, next) => {
    try {
        const newItems = await Items.findById({ _id: req.params.id })

        res.status(200).json({
            error: false,
            message: 'det dat abay id  items success',
            datas: newItems
        })
    } catch (error) {
        next(error)
    }
}

const createItems = async (req, res, next) => {
    try {
        const { nama_item, unit, stok, price, image } = req.body

        if (!stok || stok === 0) {
            return res.status(400).json({ error: false, message: 'harap di isi stok lebih dari 1' })
        }

        const newItems = await Items.create({ nama_item, unit, stok, price, image })

        res.status(201).json({
            error: false,
            message: 'create data items success',
            datas: newItems
        })
    } catch (error) {
        next(error)
    }
}

const updateItem = async (req, res, next) => {
    try {
        const { nama_item, unit, stok, price, image } = req.body

        if (!stok || stok === 0) {
            return res.status(400).json({ error: false, message: 'harap di isi stok lebih dari 1' })
        }

        if (!Items.schema.path('unit').enumValues.includes(unit)) {
            return res.status(400).json({
                error: false,
                message: `${unit} yang kamu masukan tidak valid`
            })
        }

        const newItems = await Items.updateOne({ _id: req.params.id }, { nama_item, unit, stok, price, image })

        if (newItems.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'Update success',
                datas: newItems
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'data tidak ada yang di update',
                datas: newItems
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        await Items.deleteOne({ _id: req.params.id })

        res.status(200).json({
            error: false,
            message: 'delete data id success'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getItem, getItemsById, createItems, updateItem, deleteItem }