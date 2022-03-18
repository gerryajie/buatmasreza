const express = require("express");

// const { invoiceValidator } = require("../middlewares/invoiceValidation");

const {
    getAllInfo,
    // getInvoiceId,
    createInfo,
    // updateInvoice,
    // deleteInvoice,
} = require("../controllers/info");

const router = express.Router();

router.get("/", getAllInfo);
// router.get("/:id", getInvoiceId);
// router.put("/:id", invoiceValidator, updateInvoice);
router.post("/", createInfo);
// router.delete("/:id", deleteInvoice);

module.exports = router;
