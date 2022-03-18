const path = require("path");
const validator = require("validator");
const yup = require('yup')

exports.productValidator = async (req, res, next) => {
  try {
    const errors = [];

    let schema = yup.object().shape({
      itemName: yup.string().required(),
      age: yup.number().required().positive().integer(),
      email: yup.string().email(),
      website: yup.string().url(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });

    // if (
    //   !validator.isLength(req.body.itemName, {
    //     min: 5,
    //   })
    // ) {
    //   errors.push("Input Item Name min 5 characters!");
    // }
    // if (
    //   !validator.isLength(req.body.quantity, {
    //     min: 1,
    //   })
    // ) {
    //   errors.push("Input Name min 1 characters!");
    // }
    // if (validator.isEmpty(req.body.totalCogs, { ignore_whitespace: false })) {
    //   errors.push("Please input the Total COGS");
    // }
    // if (validator.isEmpty(req.body.totalPrice, { ignore_whitespace: false })) {
    //   errors.push("Please input the Total Price");
    // }
    // if (errors.length > 0) {
    //   return res.status(400).json({ success: false, errors: errors });
    // }

    next();
  } catch (error) {
    console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<,");
    res.status(401).json({ success: false, errors: ["Bad request"] });
  }
};
