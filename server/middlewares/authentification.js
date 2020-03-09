let { verifyToken } = require("../helpers/jwt");

module.exports = {
  authentification(req, res, next) {
    try {
      let token = req.headers.token;
      req.decoded = verifyToken(token);
      next();
    } catch (err) {
      next({
        status: 401,
        msg: "unauthorized, please log in first"
      });
    }
  }
};
