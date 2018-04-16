import bcrypt from 'bcryptjs';
import models from '../models';
import passwordHash from '../helper/passwordHash';
import { generateToken } from '../helper/generateToken';

const { Users } = models;

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
      fullname,
      email,
      password,
    } = req.body;

    Users.findOne({
      where: {
        email,
      },
    }).then((foundUser) => {
      let error;
      if (foundUser) {
        error = foundUser.email;
        return res.status(400).send({
          message: `${error} already exist`,
        });
      }
      const userPassword = passwordHash(password);
      const fname = fullname.toLowerCase();
      const mail = email.toLowerCase();
      Users.create({
        fullname: fname,
        email: mail,
        password: userPassword,
      }).then((user) => {
        const token = generateToken(user);
        req.body.token = token;
        return res.status(201).send({
          message: 'You are now Signed Up',
          token,
        });
      }).catch(error => res.status(500).send({
        message: error.message,
      }));
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
    const {
      loginEmail,
      loginPassword,
    } = req.body;
    const userEmail = loginEmail.toLowerCase();
    Users.findOne({
      where: {
        email: userEmail,
      },
    }).then((user) => {
      if (user) {
        const check = bcrypt.compareSync(loginPassword, user.password);
        if (check) {
          const token = generateToken(user);
          req.body.token = token;
          return res.status(200).send({
            message: 'You are now logged In',
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
    const {
      id,
      oldPassword,
    } = req.body;
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
      email,
      newPassword,
      fullname,
      imageUrl,
    } = req.body;

    Users.findOne({
      where: {
        id: req.decoded.id,
      },
    }).then((user) => {
      if (user) {
        const hash = passwordHash(newPassword);
        user.update({
          fullname: fullname || user.fullname,
          password: hash || user.password,
          email: email || user.email,
          imageUrl: imageUrl || user.imageUrl,
        }).then((updatedUser) => {
          const token = generateToken(updatedUser);
          req.body.token = token;
          return res.status(200).send({
            token,
            message: 'Changes Applied Successfully',
          });
        }).catch(err => res.status(500).send({
          message: err.message,
        }));
      } else {
        return res.status(400).send({
          message: 'User not found',
        });
      }
    }).catch(err => res.status(500).send({
      message: err.message,
    }));
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
        const token = generateToken(user);
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
      const joinedDate = user.createdAt.slice(0, 10);
      return res.status(200).send({
        joinedDate,
      });
    });
  }
}
