const nodemailer = require('nodemailer');

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';
import { error } from 'util';

const { Users } = models;

env.config();
/**
 * @class UserController
 */
export default class UserController {
  /**
     * Users details are captured and persisted on the database
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure message or Success message with the database data
     * @memberof UserController
     */
  static signup(req, res) {
    const {
      fullname, email, password,
    } = req.body;

    Users.findOne({
      where: {
        email,
      },
    }).then((foundUser) => {
      let error;
      if (foundUser) {
        if (foundUser.email === email) {
          error = email;
        }
        return res.status(400).send({
          message: `${error} already exist`,
        });
      }
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const fname = fullname.toLowerCase();
          const mail = email.toLowerCase();
          Users.create({
            fullname: fname,
            email: mail,
            password: hash,
          }).then((users) => {
            const payload = { email: users.email, isAdmin: users.isAdmin, id: users.id , fullname, createdAt: users.createdAt,
              imageUrl: users.imageUrl };
            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: 60 * 60 * 12,
            });
            req.body.token = token;
            return res.status(201).send({
              message: 'You are now Signed Up',
              data: {
                email: users.email,
                isAdmin: users.isAdmin,
                id: users.id,
                password,
              },
              token,
            });
          }).catch(error => res.status(500).send({
            message: error.message,
          }));
        });
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }
  /**
     * User details are captured and authenticated against database data
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure message or Success message with database data
     * @memberof UserController
     */
  static signin(req, res) {
    const { login_email, login_password } = req.body;
    const userEmail = login_email.toLowerCase();
    Users.findOne({
      where: {
        email: userEmail,
      },
    }).then((user) => {
      if (user) {
        const check = bcrypt.compareSync(login_password, user.password);
        if (check) {
          const payload = {
            fullname: user.fullname, email: user.email, isAdmin: user.isAdmin, id: user.id, createdAt: user.createdAt,
            imageUrl: user.imageUrl,
          };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 60 * 60 * 12,
          });
          req.body.token = token;
          return res.status(200).send({
            message: 'You are now logged In',
            data: {
              user,
            },
            token,
          });
        }
        return res.status(400).send({
          message: 'Invalid email or password',
        });
      }
      return res.status(404).send({
        message: 'User not found, Please sign up if you are a new user',
      });
    }).catch(error => res.status(500).send({
      status: 'Failed',
      message: error.message,
    }));
  }
  /* /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof UserController
 */
  static recoverPassword(req, res) {
    const { email } = req.body;

    Users.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (user) {
        return res.status(200).send({
          message: 'User found!',
        });
      }
      return res.status(404).send({
        message: 'Email is incorrect or not registered',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));

  }
  static PasswordCheck(req, res) {
    const { id, oldPassword } = req.body;
    Users.findOne({
      where: {
        id,
      },
    }).then((user) => {
      if (user) {
        const check = bcrypt.compareSync(oldPassword, user.password);
        if (check) {
          return res.status(200).send({
            message: 'Password Match',
          });
        }
        return res.status(400).send({
          message: 'Wrong Password',
        });
      }
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static updateUser(req, res) {
    const {
      email, newPassword, fullname, imageUrl
    } = req.body;

    Users.findOne({
      where: {
        id: req.decoded.id,
      },
    }).then((user) => {
      if (user) {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => user.update({
            fullname: fullname || user.fullname,
            password: hash || user.password,
            email: email || user.email,
            imageUrl: imageUrl || user.imageUrl,
          }).then((updatedUser) => {
            const payload = {
              fullname: updatedUser.fullname, email: updatedUser.email, isAdmin: updatedUser.isAdmin, id: updatedUser.id, imageUrl: updatedUser.imageUrl,
              createdAt: updatedUser.createdAt,
            };
            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: 60 * 60 * 12,
            });
            req.body.token = token;
            return res.status(200).send({
              token,
              message: 'Changes Applied Successfully',
            });
          }).catch(err => res.status(500).send({
            message: err.message,
          })));
        });
      } else {
        return res.status(400).send({
          message: 'User not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
  }


  static sendMail(req, res) {
    const { email, message, title } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'daminomics@gmail.com',
        pass: 'profyem001',
      },
    });

    const mailOptions = {
      from: 'daminomics@gmail.com',
      to: email,
      subject: title,

      html: message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error, info);
      }
      console.log(`Message sent: ${info}`);
      return res.status(201).send({
        message: 'Mail sent',
      });
    });
  }

  static getUserEmail(req, res) {
    Users.findOne({
      where: {
        id: req.params.id,
      },
    }).then((user) => {
      if (user) {
        return res.status(200).send({
          email: user.email,
        });
      }
      return res.status(400).send({
        message: 'No user Found',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static getUser(req, res) {
    Users.findOne({
      where: {
        id: req.decoded.id,
      },
    }).then((user) => {
      if (user) {
        const payload = {
          fullname: user.fullname, email: user.email, isAdmin: user.isAdmin, id: user.id, createdAt: user.createdAt,
          imageUrl: user.imageUrl,
        };
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 60 * 60 * 12,
        });
        req.body.token = token;
        return res.status(200).send({
          token,
        });
      }
      return res.status(400).send({
        message: 'No user Found',
      });
    }).catch(error => res.status(500).send({
      message: error.message,
    }));
  }

  static getDateJoined(req, res) {
    Users.findById(req.params.id).then((user) => {
      joinedDate = user.createdAt.slice(0, 10);
      console.log(joinedDate);
      return res.status(200).send({
        joinedDate,
      });
    });
  }
}
