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
    const { fullname, email, password } = req.body;

    Users.findOne({
      where: {
        email: {
          $iLike: email,
        },
      },
    }).then((userPresent) => {
      let error;
      if (userPresent) {
        if (userPresent.email === email) {
          error = email;
        }
        return res.status(400).json({
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
          }).then(user => res.status(201).json({
            message: 'Successfully created account',
            data: {
              id: user.id,
              email: user.email,
            },
          }));
        });
      });
    })
      .catch(error => res.status(500).json({
        status: 'Failed',
        message: error.message,
      }));
  }
}
