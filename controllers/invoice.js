const { invoice, product, info } = require("../models");
// const pagination = (page, size) => {
//   const limit = size ? +size : 6;
//   const offset = ((page - 1) * limit) | 0;

//   return { limit, offset };
// };

// const paging = (data, page, limit) => {
//   const { count: totalItems, rows: invoice } = data;
//   const currentPage = page ? +page : 1;
//   const totalPages = Math.ceil(totalItems / limit);

//   return { totalItems, invoice, totalPages, currentPage };
// };

class Invoice {
  async getAllInvoice(req, res, next) {
    try {
      const pagination = (page, size) => {
        const limit = size ? +size : 6;
        const offset = ((page - 1) * limit) | 0;

        return { limit, offset };
      };
      const { page, size } = req.query;
      const { limit, offset } = pagination(page, size);

      const data = await invoice.findAndCountAll({
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
        include: [
          {
            model: info,
            attributes: ["id"],
            include: [
              {
                model: product,
                attributes: ["itemName", "totalCogs", "totalPrice"],
              },
            ],
          },
        ],
        // order: [["createdAt", "DESC"]],
        offset,
      });

      const findTotalProfit = await info.findAll({
        include: [
          {
            model: invoice,
          },
          {
            model: product,
          },
        ],
      });

      let sumCash = 0;
      for (let i = 0; i < findTotalProfit.length; i++) {
        if (findTotalProfit[i].dataValues.invoice.paymentType == "CASH") {
          sumCash += findTotalProfit[i].dataValues.product.totalPrice;
        }
      }

      let sumCogs = 0;
      let sumPrice = 0;
      let sumProfit = 0;
      for (let i = 0; i < findTotalProfit.length; i++) {
        sumCogs += findTotalProfit[i].dataValues.product.totalCogs;
        sumPrice += findTotalProfit[i].dataValues.product.totalPrice;
      }

      sumProfit = sumPrice - sumCogs;

      const paging = (data, page, limit) => {
        const { count: totalItems, rows: invoice } = data;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(totalItems / limit);

        return {
          totalItems,
          invoice,
          totalPages,
          currentPage,
          sumProfit,
          sumCash,
        };
      };

      if (data == null) {
        return res
          .status(404)
          .json({ success: false, errors: ["Invoice not found"] });
      }

      res.status(200).json(paging(data, page, limit));
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async getInvoiceId(req, res, next) {
    try {
      const data = await info.findAll({
        where: { id_invoice: req.params.id },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
        include: [
          {
            model: product,
            attributes: ["totalCogs", "totalPrice"],
          },
        ],
      });

      let cogs = 0;
      let total = 0;
      for (let i = 0; i < data.length; i++) {
        cogs += data[i].product.totalCogs;
        total += data[i].product.totalPrice;
      }

      let profit = total - cogs;

      if (data == null) {
        return res
          .status(404)
          .json({ success: false, errors: ["Invoice not found"] });
      }

      res.status(200).json({ data, profit });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async createInvoice(req, res, next) {
    try {
      const insertInvoice = await invoice.create({
        noInvoice: req.body.noInvoice,
        date: req.body.date,
        customerName: req.body.customerName,
        salesPersonName: req.body.salesPersonName,
        paymentType: req.body.paymentType,
        notes: req.body.notes,
      });

      const data = await invoice.findOne({
        where: { id: insertInvoice.id },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
      });

      res.status(201).json({ data, message: "Succes Add Invoice" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateInvoice(req, res, next) {
    try {
      const invoiceNota = await invoice.findOne({
        where: { id: req.params.id },
      });

      const updatedData = await invoice.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      const data = await invoice.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
      });

      //   const data = await invoice.findOne({
      //     where: { nota: insertInvoice.nota },
      //     attributes: {
      //       exclude: ["createdAt", "deletedAt", "updatedAt"],
      //     },
      //   });

      res.status(201).json({ data, message: "Succes Update Invoice" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteInvoice(req, res, next) {
    try {
      const deleteId = await invoice.findOne({
        where: { id: req.params.id },
      });
      // console.log(deleteId);

      let data = await invoice.destroy({ where: { id: req.params.id } });

      if (!data) {
        return res.status(404).json({ errors: ["Invoice not found"] });
      }

      res.status(200).json({ message: ["Success delete your Invoice"] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: ["Internal Server Error"] });
    }
  }
}
module.exports = new Invoice();
