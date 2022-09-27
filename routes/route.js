const express = require("express");

// const { creatCollege } = require("../c/collegeController");
const { creatCollege } = require("../controllers/collegeController");
const { creatIntern } = require("../controllers/internController");
const router = express.Router();

router.post("/creatCollege", creatCollege);
router.post("/creatIntern", creatIntern);
module.exports = router;
