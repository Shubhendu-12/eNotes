const jwt = require("jsonwebtoken");
const JWR_SECRET = "Rajpas@123";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object

  const token = req.header("auth-token");
  if (!token) {
    res.status(400).send({ error: "Please authenticate using valid token" });
  } 
  try {
    const data = jwt.verify(token, JWR_SECRET);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};
 module.exports = fetchuser