const mongoose = require("mongoose");
// Connection URL
const url =
  "mongodb+srv://datpthaui:datpthaui123@cluster0.wbc2thh.mongodb.net/db-poc";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
exports.connect = () => {
  mongoose
    .connect(url, options)
    .then(function () {
      console.log("MongoDB is connected");
    })
    .catch(function (err) {
      console.log(err);
    });
  return mongoose.connection;
};
