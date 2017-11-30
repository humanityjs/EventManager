import validator from 'validator';


/**
 * Validates users signup and signin operations
 * @class Validation
 */
export default class Validation {
  /**
     * Validates all User signup details before allowing access to controller class
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.body
     * @memberof UserValidations
     */
  static signup(req, res, next) {
    const {
      fullname,
      email,
      password,
    } = req.body;

    const errors = {};
    if (fullname === undefined || email === undefined || password === undefined) {
      return res.status(400).send({
        message: 'All or some fields are not defined',
      });
    }

    if (!validator.isEmpty(fullname)) {
      for (let i = 0; i < fullname.length; i += 1) {
        if (validator.toInt(fullname[i])) {
          errors.fullname = 'Fullname must not contain numbers';
          break;
        }
      }
    } else {
      errors.fullname = 'Fullname is required';
    }

    if (!validator.isEmpty(email)) {
      if (!validator.isEmail(email)) {
        errors.email = 'Email is invalid';
      }
    } else { errors.email = 'Email is required'; }

    if (!validator.isEmpty(password)) {
      if (!validator.isLength(password, { min: 8, max: 30 })) {
        errors.password = 'Password length must be between 8 and 30';
      }
    } else { errors.password = 'Password is required'; }

    if (Object.keys(errors).length !== 0) {
      return res.status(400)
        .json(errors);
    }
    next();
  }

  /**
     * Validates signin form input fields before allowing access to controller class
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or contents of req.body
     * @memberof UserValidations
     */
  static signin(req, res, next) {
    const { email, password } = req.body;

    const errors = {};
    if (email === undefined || password === undefined) {
      return res.status(400).send({
        message: 'Email or Password is undefined',
      });
    }

    if (validator.isEmpty(email)) {
      errors.email = 'email is required';
    }

    if (!validator.isEmail(email)) {
      errors.email = 'Type a valid email';
    }

    if (validator.isEmpty(password)) {
      errors.password = 'Password is required';
    }


    if (Object.keys(errors).length !== 0) {
      return res.status(400)
        .json(errors);
    }
    next();
  }
}