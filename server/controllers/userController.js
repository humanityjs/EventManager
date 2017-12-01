import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import models from '../models';

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
     * @returns {object} Failure message or Success message with the persisted database data
     * @memberof UserController
     */
  static signup(req, res) {
    const {
      fullname, email, password, isAdmin,
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
          Users.create({
            fullname,
            email,
            password: hash,
            isAdmin,
          }).then(() => {
            const payload = { email, isAdmin };
            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: 60 * 60 * 12,
            });
            req.body.token = token;
            return res.status(200).send({
              message: 'You are now Signed Up',
              data: {
                token,
              },
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
     * User details are captured and authenticated against persisted database data
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure message or Success message with persisted database data
     * @memberof UserController
     */
  static signin(req, res) {
    const { email, password } = req.body;

    Users.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (user && user.email.toLowerCase === email.toLowerCase) {
        const check = bcrypt.compareSync(password, user.password);
        if (check) {
          const payload = { email: user.email, isAdmin: user.isAdmin, id: user.id };
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
          message: 'Invalid username or password',
        });
      }
      return res.status(404).send({
        message: 'User not found',
      });
    }).catch(error => res.status(500).send({
      status: 'Failed',
      message: error.message,
    }));
  }
}
