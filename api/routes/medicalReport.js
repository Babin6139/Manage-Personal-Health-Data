var express = require("express");
var router = express.Router();
var medicalReportController = require("./../controller/medicalReportController");

router
  .route("/")
  .get(medicalReportController.getReport)
  .post(medicalReportController.addReport);

router.route("/toupload").get(medicalReportController.getTouploadReport);

module.exports = router;
