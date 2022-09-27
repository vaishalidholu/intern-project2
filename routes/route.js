const express = require("express");

// const { creatCollege } = require("../c/collegeController");
const {
  creatCollege,
  getDetails,
} = require("../controllers/collegeController");
const { creatIntern } = require("../controllers/internController");
const router = express.Router();

router.post("/creatCollege", creatCollege);
router.post("/creatIntern", creatIntern);
router.get("/getDetails", getDetails);
module.exports = router;
