
import models from '../models';

const { Users } = models;

env.config();

/**
 * @class UsersApiController
 */
export default class UsersApiController {
  /**
     * Users details are captured and persisted on the database
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} Failure message or Success message with the persisted database data
     * @memberof UsersApiController
     */
  static signup(req, res) {
    const { fullName, username, email } = req.body;

    Users.create({
      fullName,
      username,
      email,
      password,
    }).then(user => res.status(201).json({
      status: 'Success',
      message: 'Successfully created account',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    }))
      .catch(error => res.status(500).json({
        status: 'Failed',
        message: error.message,
      }));
  }
}
