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
        if (response) {
          // todo is found
          if (response.UserId === payload.id) {
            // proceed to give authorization
            next();
          } else {
            next({
              status: 401,
              msg: "Access prohibited, you can only access your own todos"
            });
          }
        } else {
          // todo not found
          next({
            status : 404,
            msg : "error not found"
          })
        }
      })
      .catch(next);
  }
};
