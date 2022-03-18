// const db = require("../models");
const fs = require("fs");
const { invoice, product, info } = require("../models");
// const Tutorial = db.tutorials;
const readXlsxFile = require("read-excel-file/node");
const upload = async (req, res) => {
  try {
    if (req.files.file == undefined) {
      // console.log(req.file, "iniiiiiiii");
      return res.status(400).send("Please upload an excel file!");
    }
    // req.files.file.tempFilePath;
    readXlsxFile(req.files.file.tempFilePath, { sheet: 1 }).then((rows) => {
      // skip header
      rows.shift();
      // let tutorials = [];
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
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
    readXlsxFile(req.files.file.tempFilePath, { sheet: 2 }).then((rows) => {
      // skip header
      rows.shift();
      // let tutorials = [];
      let productArr = [];
      rows.forEach((row) => {
        let productData = {
          invoiceNo: row[0],
          itemName: row[1],
          quantity: row[2],
          totalCogs: row[3],
          totalprice: row[4],
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
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.files.file.name,
    });
  }
};
// const getTutorials = (req, res) => {
//   Tutorial.findAll()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };
module.exports = {
  upload,
  // getTutorials,
};
