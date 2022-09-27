const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
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

const getDetails = async function (req, res) {
  try {
    console.log(req.query);
    if (req.body.name)
      return res.status(400).send({
        status: false,
        message: "Please send the college name in query params",
      });

    if (!req.query.name)
      return res
        .status(400)
        .send({ status: false, message: "Enter collegeName in the query" });

    if (!validName(req.query.name))
      return res
        .status(400)
        .send({ status: false, message: "Enter collegeName in the query" });

    // let FindCollege = await collegeModel
    //   .findOne({
    //     name: req.query.name,
    //     isDeleted: false,
    //   })
    //   .lean();
    // console.log("c", FindCollege);

    // if (!FindCollege)
    //   return res
    //     .status(404)
    //     .send({ status: false, message: "College is not found" });

    // let id = FindCollege._id;
    // console.log(id);

    // let getIntern = await internModel
    //   .find({ collegeId: id, isDeleted: false })
    //   .select({ __v: 0, isDeleted: 0, collegeId: 0 });

    // if (!getIntern.length)
    //   return res.status(404).send({
    //     status: false,
    //     message: `No intern present for ${req.query.name} college`,
    //   });

    // FindCollege["intern"] = getIntern;
    // console.log(FindCollege);
    // return res.status(200).send({
    //   status: true,
    //   data: FindCollege,
    // });

    let agg = await collegeModel.aggregate([
      {
        $match: {
          name: req.query.name,
        },
      },
      {
        $lookup: {
          from: "interns",
          localField: "_id",
          foreignField: "collegeId",
          as: "result",
        },
      },
      {
        $project: {
          name: 1,
          fullName: 1,
          isDeleted: 1,
          "result._id": 1,
          "result.name": 1,
          "result.email": 1,
          "result.mobile": 1,
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
    ]);

    return res.status(200).send({
      status: true,
      data: agg,
    });

    // [
    //   {
    //     '$match': {
    //       'name': 'gec'
    //     }
    //   }, {
    //     '$lookup': {
    //       'from': 'interns',
    //       'localField': '_id',
    //       'foreignField': 'collegeId',
    //       'as': 'result'
    //     }
    //   }, {
    //     '$project': {
    //       'name': 1,
    //       'fullName': 1,
    //       'isDeleted': 1,
    //       'result._id': 1,
    //       'result.name': 1,
    //       'result.email': 1,
    //       'result.mobile': 1
    //     }
    //   }, {
    //     '$unwind': {
    //       'path': '$result'
    //     }
    //   }
    // ]
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
module.exports = { creatCollege, getDetails };
