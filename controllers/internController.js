const internModel = require("../models/internModel");
const {
  validateEmail,
  validNumber,
  validName,
} = require("../validation/validate");
const { isValidObjectId } = require("mongoose");

console.log(internModel);

const creatIntern = async function (req, res) {
  try {
    console.log(req.body);
    if (Object.keys(req.body).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid input" });

    if (!req.body.name)
      return res.status(400).send({ status: false, msg: "Please enter name" });

    if (!validName(req.body.name))
      return res.status(400).send({ status: false, msg: "name is not valid" });

    if (!req.body.email)
      return res.status(400).send({ status: false, msg: "Please enter email" });

    if (!validateEmail(req.body.email))
      return res.status(400).send({ status: false, msg: "email is not valid" });

    if (!req.body.mobile)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter mobileNumber" });

    if (!validNumber(req.body.mobile))
      return res
        .status(400)
        .send({ status: false, msg: " mobile is not valid" });
    console.log("body", req.body, internModel);

    let validate = await internModel.findOne({
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    });

    if (validate)
      return res.status(409).send({
        status: false,
        message: "Email ID or Mobile number is already in use",
      });
    if (req.body.isDeleted == true)
      return res.status(400).send({
        status: false,
        message:
          "You are not allow to delete the same college while creating it",
      });

    if (!req.body.collegeId)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter collegeId" });

    if (!isValidObjectId(req.body.collegeId))
      return res
        .status(400)
        .send({ status: false, msg: "collegeId is not valid" });

    let savedData = await internModel.create(req.body);
    return res.status(201).send({ status: true, data: savedData });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};
module.exports = { creatIntern };
