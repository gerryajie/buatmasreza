const { invoice, product, info } = require('../models')


class Info {
    async createInfo(req, res, next) {
        try {
            const data = await info.create({
                id_invoice: req.body.id_invoice,
                id_product: req.body.id_product
            })

            if (data === null) {
                return res.status(404).json({ message: 'not found' })
            }

            return res.status(201).json({ data, message: 'success' })
        } catch (error) {
            console.log(error);
        }
    }

    async getAllInfo(req, res, next) {
        try {
            const data = await info.findAll({
                include: [
                    {
                        model: invoice
                    },
                    {
                        model: product
                    }
                ]
            })

            if (data === null) {
                return res.status(404).json({ message: 'not found' })
            }

            return res.status(200).json({ message: 'success', data })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Info();