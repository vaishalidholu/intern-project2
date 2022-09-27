const express = require("express");

// const { creatCollege } = require("../c/collegeController");
const { creatCollege } = require("../controllers/collegeController");

const router = express.Router();

router.post("/creatCollege", creatCollege);
module.exports = router;
