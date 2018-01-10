import validator from 'validator';


/**
 * Validates all requests for events route
 * @class eventsValidation
 */
export default class Validation {
  /**
     * Validates all events details before allowing access to controller class
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} Validation error messages or content of req.body passed to controller
     * @memberof eventsValidation
     */
  static postEvent(req, res, next) {
    const {
      eventTitle, bookedDate, description, centerId,
    } = req.body;
    const errors = {};
    if (eventTitle === undefined || bookedDate === undefined || description === undefined
        || centerId === undefined) {
      return res.status(400).send({
        message: 'All or Some Field are Undefined',
      });
    }
    // validations for eventTitle

    if (!validator.isEmpty(eventTitle)) {
      if (!validator.isLength(eventTitle, { min: 5, max: 20 })) {
        errors.eventTitle = 'The event Name must be more than 5 characters but less than 20';
      }
      if (!/^[a-zA-Z0-9 ]+$/.test(eventTitle)) {
        errors.eventTitle = 'Event Name can only contain numbers and letters';
      }
    } else {
      errors.eventTitle = 'event Name cannot be blank';
    }

    // validations for bookedDate
    if (!validator.isEmpty(bookedDate)) {
      if (!validator.toDate(bookedDate)) {
        errors.bookedDate = bookedDate;
      }
    } else {
      errors.facilities = 'event should have at least one facility';
    }

    // validations for description
    if (!validator.isEmpty(description)) {
      if (!validator.isLength(description, { min: 5, max: 1000 })) {
        errors.description = 'description must be greater than 5 but less than 1000 words';
      }
      if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
        errors.description = 'description can not include symbols except comma and full stop';
      }
    } else {
      errors.description = 'Event should have a description';
    }

    // validations for centerId
    if (!validator.isEmpty(centerId)) {
      if (!validator.isInt(centerId)) {
        errors.centerId = 'centerId must be a number';
      }
    } else {
      errors.centerId = 'Please select a Center';
    }


    if (Object.keys(errors).length !== 0) {
      return res.status(400).send(errors);
    }
    next();
  }

  static updateEvent(req, res, next) {
    const {
      eventTitle, bookedDate, description, centerId,
    } = req.body;
    const errors = {};
    // validations for eventTitle
    if (!validator.isEmpty(eventTitle)) {
      if (!validator.isLength(eventTitle, { min: 5, max: 20 })) {
        errors.eventTitle = 'The event Name must be more than 5 characters but less than 20';
      }
      if (!/^[a-zA-Z0-9 ]+$/.test(eventTitle)) {
        errors.eventTitle = 'Event Name can only contain numbers and letters';
      }
    }

    // validations for bookedDate
    // if (!/^[a-zA-Z0-9, ]+$/.test(facilities)) {
    //   errors.facilities = 'Facilities can not include symbols except comma which you should use to separate the faciities';
    // }
    // if (!validator.isEmpty(facilities)) {
    //   if (!validator.isLength(facilities, { min: 5, max: 1000 })) {
    //     errors.facilities = 'facilities must be greater than 5 but less than 1000 words';
    //   }
    // }

    // validations for description
    if (!validator.isEmpty(description)) {
      if (!validator.isLength(description, { min: 5, max: 1000 })) {
        errors.description = 'description must be greater than 5 but less than 1000 words';
      }
      if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
        errors.description = 'description can not include symbols except comma and full stop';
      }
    }

    // validations for centerId
    // if (!validator.isEmpty(centerId)) {
    //   // if (!validator.isInt(centerId)) {
    //     errors.centerId = 'centerId must be a number';
    //   // }
    // }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).send(errors);
    }
    next();
  }
}
