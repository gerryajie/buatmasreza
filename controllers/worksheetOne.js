const fs = require("fs");
const { invoice, product, info } = require("../models");
const readXlsxFile = require("read-excel-file/node");
const upload = async (req, res) => {
  try {
    if (req.files.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    // req.files.file.tempFilePath;
    readXlsxFile(req.files.file.tempFilePath, { sheet: 1, sheet: 2 }).then(
      (rows) => {
        // skip header
        rows.shift();
        let invoiceArr = [];
        rows.forEach((row) => {
          let invoiceData = {
            noInvoice: row[0],
            date: row[1],
            customerName: row[2],
            salesPersonName: row[3],
            paymentType: row[4],
            notes: row[5],
          };

          invoiceArr.push(invoiceData);
        });

        invoice
          .bulkCreate(invoiceArr)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.files.file.name,
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      }
    );
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
