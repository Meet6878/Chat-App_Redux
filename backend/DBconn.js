const mongoose = require("mongoose");

const DBconn = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("database connect success");
    })
    .catch((error) => {
      console.log("error while connecting" + error.message);
    });
};

module.exports = DBconn;
