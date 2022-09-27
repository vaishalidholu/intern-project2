const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/route");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://vaishalidholu:27081997@cluster0.cpa4z.mongodb.net/porjec2-intern?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", router);

app.listen(3004, function () {
  console.log("express app running on 3004");
});
