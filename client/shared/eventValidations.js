import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function modifyEventValidation(data) {
  const {
    eventTitle, bookedDate, description, centerId,
  } = data;
  const errors = {};
  // validations for eventTitle
  if (!/^[a-zA-Z0-9 ]+$/.test(eventTitle)) {
    errors.eventTitle = 'Event Name can only contain numbers and letters';
  }

  if (!validator.isEmpty(eventTitle)) {
    if (!validator.isLength(eventTitle, { min: 5, max: 20 })) {
      errors.eventTitle = 'The event Name must be more than 5 characters but less than 20';
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
  if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
    errors.description = 'description can not include symbols except comma and full stop';
  }
  if (!validator.isEmpty(description)) {
    if (!validator.isLength(description, { min: 5, max: 1000 })) {
      errors.description = 'description must be greater than 5 but less than 1000 words';
    }
  }

  return { errors, isValid: isEmpty(errors) };
}
