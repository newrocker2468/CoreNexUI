const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
      console.log("COOKIES");
      console.log(req.cookies);

      console.log("REQ");
      console.log(req);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('No token provided');
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Failed to authenticate token');
        }
        req.user = user;
        next();
    });
}

module.exports = verifyJWT;