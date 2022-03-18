const express = require("express");
const router = express.Router();
const excelController = require("../controllers/excel");

router.post("/", excelController.upload);
// router.get("/tutorials", excelController.getTutorials);
module.exports = router;
