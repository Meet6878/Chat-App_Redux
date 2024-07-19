const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const DBconn = require("./DBconn");
const router = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const messageRoute = require("./routes/messageRoute");
const { app, server } = require("./socket/socket");

dotenv.config();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
const PORT = process.env.PORT || 8000;

app.use("/api/v1/users", router);
app.use("/api/v2/message", messageRoute);

server.listen(PORT, () => {
  DBconn();
  console.log("listening on port " + PORT);
});
