const path = require("path");
const validator = require("validator");
const yup = require("yup");

exports.validatorProduct = async (req, res, next) => {
  try {
    const errors = [];

    const schemaProduct = yup.object().shape({
      noInvoice: yup.number().min(1).required(),
      itemName: yup.string().min(5).required(),
      quantity: yup.number().min(1).required(),
      totalCogs: yup.number().min(0).required(),
      totalPrice: yup.number().min(0).required(),
    });

    await schemaProduct.validate(req.body, { abortEarly: false });

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors: errors });
    }

    next();
  } catch (error) {
    console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<,");
    res.status(404).json({ success: false, messages: error.inner });
  }
};
