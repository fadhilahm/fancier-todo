const bcrypt = require("bcrypt");

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, +process.env.SALT);
  },
  comparePassword(comparedPassword, hash) {
    return bcrypt.compareSync(comparedPassword, hash);
  }
};
