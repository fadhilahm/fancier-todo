const { Todo } = require("../models");

module.exports = {
  authorization(req, res, next) {
    let payload = req.decoded;
    Todo.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(response => {
        if (response.UserId === payload.id) {
          // proceed to give authorization
          next();
        } else {
          next({
            status: 401,
            msg: "Access prohibited, you can only access your own todos"
          });
        }
      })
      .catch(next);
  }
};
