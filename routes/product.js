const express = require("express");

const { validatorProduct } = require("../middlewares/validatorProduct");

const {
  getAllProduct,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getProductId);
router.put("/:id", updateProduct);
router.post("/", validatorProduct, createProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
