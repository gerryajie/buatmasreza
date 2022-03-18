const { invoice, product } = require("../models");

class Product {
  async getAllProduct(req, res, next) {
    try {
      const data = await product.findAndCountAll({
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
      });

      const price = await product.sum("totalPrice");
      console.log(price);
      const cogs = await product.sum("totalCogs");
      console.log(cogs);
      //   totalCash=await invoice.

      const total = price - cogs;

      if (data == null) {
        return res
          .status(404)
          .json({ success: false, errors: ["Product not found"] });
      }

      res.status(200).json({ data, TotalProfit: total });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async getProductId(req, res, next) {
    try {
      const data = await product.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
      });

      const price = await product.sum("totalPrice");
      console.log(price);
      const cogs = await product.sum("totalCogs");
      console.log(cogs);
      //   totalCash=await invoice.

      const total = price - cogs;

      if (data == null) {
        return res
          .status(404)
          .json({ success: false, errors: ["Product not found"] });
      }

      res.status(200).json({ data, TotalProfit: total });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async createProduct(req, res, next) {
    try {
      const insertProduct = await product.create({
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        totalCogs: req.body.totalCogs,
        totalPrice: req.body.totalPrice,
      });

      const data = await product.findOne({
        where: { id: insertProduct.id },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
      });

      res.status(201).json({ data, message: "Succes Add Product" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const invoiceNota = await product.findOne({
        where: { id: req.params.id },
      });

      const updatedData = await product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      const data = await product.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
      });

      res.status(201).json({ data, message: "Succes Update Product" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const deleteId = await product.findOne({
        where: { id: req.params.id },
      });
      // console.log(deleteId);

      let data = await product.destroy({ where: { id: req.params.id } });

      if (!data) {
        return res.status(404).json({ errors: ["Product not found"] });
      }

      res
        .status(200)
        .json({ data: data, message: ["Success delete your Product"] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: ["Internal Server Error"] });
    }
  }
}
module.exports = new Product();
