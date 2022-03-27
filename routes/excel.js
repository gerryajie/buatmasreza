const express = require("express");
const router = express.Router();
// const { postExcel } = require("../controllers/worksheetOne");
const excelControllerOne = require("../controllers/worksheetOne");
const excelControllerTwo = require("../controllers/worksheetTwo");

router.post("/one", excelControllerOne.upload);
router.post("/two", excelControllerTwo.upload);
// router.post("/all", postExcel);

module.exports = router;
