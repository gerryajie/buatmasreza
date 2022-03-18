const path = require("path");
const validator = require("validator");
const yup = require("yup");
const { invoice } = require("../models");

exports.validatorInvoice = async (req, res, next) => {
  try {
    const errors = [];

    const schemaInvoice = yup.object().shape({
      noInvoice: yup.string().min(1).required(),
      date: yup.date().required(),
      customerName: yup.string().min(2).required(),
      salesPersonName: yup.string().min(2).required(),
      paymentType: yup.mixed().oneOf(["CASH", "CREDIT"]).required(),
      notes: yup.string().min(5).notRequired(),
    });

    const checkNoInvoice = await invoice.findOne({
      where: {
        noInvoice: req.body.noInvoice,
      },
    });

    if (checkNoInvoice != null) {
      errors.push(" there is already the same invoice number");
    }

    await schemaInvoice.validate(req.body, { abortEarly: false });

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors: errors });
    }

    next();
  } catch (error) {
    console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<,");
    res.status(404).json({ error: "validation failed", messages: error.inner });
  }
};
