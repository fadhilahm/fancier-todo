module.exports = {
  errorHandler(err, req, res, next) {
    // handles error here
    if (err.name === "SequelizeValidationError") {
      let errorMessage = err.errors.map(el => el.message);
      res.status(400).json({
        status: 400,
        msg: errorMessage
      });
    } else if (err.name === "SequelizeUniqueConstraintError") {
      let errorUniqueMessage = err.errors.map(el => el.message);
      res.status(400).json({
        status: 400,
        msg: errorUniqueMessage
      });
    } else {
      res.status(err.status || 500).json({
        status: err.status || 500,
        msg: err.msg || "Internal Server Error"
      });
    }
  }
};
