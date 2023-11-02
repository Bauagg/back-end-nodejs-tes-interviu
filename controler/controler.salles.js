const Salles = require('../module/model.salle')
const Items = require('../module/model.item')
const Customer = require('../module/model.customer')

const getSalles = async (req, res, next) => {
    try {
        const newSalles = await Salles.find({ user: req.user.id }).populate('customer').populate('items.item').populate('user', '-password')

        res.status(200).json({
            error: false,
            message: 'get data Salles success',
            datas: newSalles
        })
    } catch (error) {
        next(error)
    }
}

const createSalles = async (req, res, next) => {
    try {
        const { customerId, items, } = req.body

        const newCustomer = await Customer.findById(customerId)

        if (!newCustomer) {
            return res.status(404).json({
                error: true,
                message: 'Customer tidak di temukan'
            })
        }

        let totalBayar = 0
        const newItemArray = [];

        for (const itemData of items) {
            const { item, qty } = itemData;
            const itemId = await Items.findById(item)

            if (itemId.stok < qty) {
                return res.status(401).json({
                    error: true,
                    message: 'QTY tidak bole lebi dari item stok'
                })
            }
            const hendlerStock = itemId.stok - qty
            await Items.findByIdAndUpdate(item, { stok: hendlerStock })

            const hendlerhargaTotal = itemId.price * qty

            const newItem = {
                item,
                qty,
                total_harga: hendlerhargaTotal
            };

            newItemArray.push(newItem);

            totalBayar += hendlerhargaTotal
        }

        if (!newCustomer.diskon) {
            const newSalles = await Salles.create({
                customer: newCustomer,
                items: newItemArray,
                total_diskon: newCustomer.diskon,
                total_bayar: totalBayar,
                user: req.user.id
            })

            res.status(201).json({
                error: false,
                message: 'create data Sales success tidak ada diskon',
                datas: newSalles
            })
        } else {
            totalBayar -= newCustomer.diskon

            const newSalles = await Salles.create({
                customer: newCustomer,
                items: newItemArray,
                total_diskon: newCustomer.diskon,
                total_bayar: totalBayar,
                user: req.user.id
            })

            res.status(201).json({
                error: false,
                message: 'create data Sales success ada diskon',
                datas: newSalles
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getSalles, createSalles }