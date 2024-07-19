const jwt = require("jsonwebtoken");
const Protected = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        message: "no token not authorized",
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRATE);
    if (!decode) {
      return res.status(401).send({
        message: "invalid token",
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports = Protected;
