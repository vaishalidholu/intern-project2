const collegeModel = require("../models/collegeModel");
const { isValid, validName } = require("../validation/validate");

const creatCollege = async function (req, res) {
  try {
    if (Object.keys(req.body).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid input" });

    if (!req.body.name) {
      return res.status(400).send({ status: false, msg: "name is required" });
    }

    if (!validName(req.body.name)) {
      return res.status(400).send({ status: false, msg: "name is required" });
    }

    if (!req.body.fullName) {
      return res
        .status(400)
        .send({ status: false, msg: "fullName is required" });
    }

    if (!isValid(req.body.fullName)) {
      return res
        .status(400)
        .send({ status: false, msg: "fullName is required" });
    }

    console.log(req.body);

    let clg = await collegeModel.findOne({
      name: req.body.name,
      isDeleted: false,
    });

    if (clg)
      return res
        .status(409)
        .send({ status: false, message: "College name is already present" });

    if (req.body.isDeleted == true)
      return res.status(400).send({
        status: false,
        message:
          "You are not allow to delete the same college while creating it",
      });
    console.log(req.body);
    let Data = await collegeModel.create(req.body);
    return res.status(201).send({ status: true, data: Data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};
module.exports = { creatCollege };
