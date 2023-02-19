const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeaders = req.headers.token;

  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
   // console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) res.status(403).json("Token not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verifyToken;
