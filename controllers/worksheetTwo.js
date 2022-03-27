const fs = require("fs");
const { invoice, product, info } = require("../models");
const readXlsxFile = require("read-excel-file/node");
const upload = async (req, res) => {
  try {
    if (req.files.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    readXlsxFile(req.files.file.tempFilePath, { sheet: 2 }).then((rows) => {
      // skip header
      rows.shift();
      // let tutorials = [];
      let productArr = [];
      rows.forEach((row) => {
        let productData = {
          noInvoice: row[0],
          itemName: row[1],
          quantity: row[2],
          totalCogs: row[3],
          totalPrice: row[4],
        };
        productArr.push(productData);
      });
      product
        .bulkCreate(productArr)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.files.file.name,
          });
        })
        .catch((error) => {
          return res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Could not upload the file: " + req.files.file.name,
    });
  }
};

module.exports = {
  upload,
};
