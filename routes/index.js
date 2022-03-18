const express = require("express");

const router = express.Router();
const invoice = require("./invoice");
const product = require("./product");
const info = require("./info");
const upload = require("./excel");

router.use("/invoice", invoice);
router.use("/product", product);
router.use("/info", info);
router.use("/upload", upload);

module.exports = router;
