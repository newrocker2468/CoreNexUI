const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  console.log("COOKIES");
  console.log(req.cookies);
  console.log("HEADERS");
  console.log(req.headers.cookies);
  console.log("BODY");
  console.log(req.body);
  console.log("PARAMS");
  console.log(req.params);
  console.log("QUERY");
  console.log(req.query);
  console.log("TOKEN");
  console.log(req.cookies.token);
  console.log(req.headers.cookies.token);
  console.log(
    "-----------------------------------------------------------------------"
  );

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Failed to authenticate token");
    }
    req.user = user;
    next();
  });
};

module.exports = verifyJWT;
