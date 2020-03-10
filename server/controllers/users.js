const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static register(req, res, next) {
    let { email, password } = req.body;
    User.create({
      email,
      password
    })
      .then(response => {
        // back to the homepage
        res.status(201).json({
          id: response.id,
          email: response.email
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    let { email, password } = req.body;
    // find if the email is in our database
    User.findOne({
      where: {
        email: email
      }
    })
      .then(resEmail => {
        if (resEmail) {
          //found email, check password
          if (comparePassword(password, resEmail.password)) {
            // successful, generate token key
            res.status(200).json({
              token: generateToken({
                id: resEmail.id,
                email: resEmail.email
              })
            });
          } else {
            // password is wrong
            next({
              status: 400,
              msg: "email / password was wrong"
            });
          }
        } else {
          // email not found
          next({
            status: 400,
            msg: "email / password was wrong"
          });
        }
      })
      .catch(err => {
        next({
          status: 400,
          msg: "email / password was wrong"
        });
      });
  }

  static gSignIn(req, res, next) {
    let temp = {};
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client
      .verifyIdToken({
        idToken: req.body.token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        let payload = ticket.getPayload();
        temp.email = payload.email;
        temp.password = process.env.DEFAULT_PASSWORD;
        // check for email
        return User.findOne({
          where: {
            email: payload.email
          }
        });
      })
      .then(resEmail => {
        if (resEmail) {
          // email is found
          return resEmail;
        } else {
          // email is not found, creating a new account with default password
          return User.create(temp);
        }
      })
      .then(resCreate => {
        // generate token
        let payload = {
          id: resCreate.id,
          email: resCreate.email
        };
        res.status(200).json({
          token: generateToken(payload)
        });
      })
      .catch(next);
  }
}

module.exports = UserController;
