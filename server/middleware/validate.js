import validator from "validator";

/**
 * Validates all routes
 * @class Validation
 */
class Validate {
  /**
   * Validates all input details before allowing access to controller class
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @returns {obj} Validation error messages or contents of req.body
   */
  static postCenterValidation(req, res, next) {
      const { name, location, facilities, description } = req.body,
          error = {};

      // check for undefined inputs
      if (name === undefined ||location === undefined || description === undefined || facilities === undefined) {
          res.status(400);
          res.json({
              status: 'Failed',
              message: 'Some fields are undefined'
          });
      } else {
          // validation for event name input
          if (!(validator.isEmpty(name))) {
            if (location.length < 2) {
              error.name = 'Center name must be more than 2 characters';
            }
          } else { error.name = 'Center name is required'; }

          // validation for location input
          if (!(location.length === 0)) {
              if (location.length < 10) {
                  error.location = 'Center location should must be more than 10 characters';
              }
          } else { error.location = 'Center location are required'; }

          // validation for description input
          if (!(validator.isEmpty(description))) {
              if (!(validator.isLength(description, { min: 25, max: 500 }))) {
                  error.description = 'Center description provided must be more than 25 characters';
              }
          } else { error.description = 'Center description is required'; }

            // validation for facilities input
            if (!(validator.isEmpty(facilities))) {
              if (!(validator.isLength(facilities, { min: 5, max: 500 }))) {
                  error.facilities = 'Facilities provided must be more than 5 characters';
              }
          } else { error.facilities = 'Facilities is required'; }

          if (Object.keys(error).length !== 0) {
            return res.status(400)
            .json(error);
          }
              next();
      }
  }

}

export default Validate;