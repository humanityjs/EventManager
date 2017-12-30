import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function addCenterValidation(data) {

  const {
    centerName, facilities, description, location,
  } = data;

  const errors = {};

  if (centerName === undefined || facilities === undefined || description === undefined || location === undefined) {
    return res.status(400).send({
      message: 'All or Some Fields are Undefined',
    });
  }
  // validations for centername

  if (!/^[a-zA-Z0-9 ]+$/.test(centerName)) {
    errors.centerName = 'Center Name can only contain numbers and letters';
  }

  if (!validator.isEmpty(centerName)) {
    if (!validator.isLength(centerName, { min: 5, max: 20 })) {
      errors.centerName = 'The Center Name must be more than 5 characters but less than 20';
    }
  } else {
    errors.centerName = 'Center Name cannot be blank';
  }

  // validations for facilities
  if (!/^[a-zA-Z0-9,.& ]+$/.test(facilities)) {
    errors.facilities = 'Facilities can not include symbols except comma which you should use to separate the faciities';
  }
  if (!validator.isEmpty(facilities)) {
    if (!validator.isLength(facilities, { min: 5, max: 1000 })) {
      errors.facilities = 'facilities must be greater than 5 but less than 1000 words';
    }
  } else {
    errors.facilities = 'Center should have at least one facility';
  }

  // validations for description
  if (!/^[a-zA-Z0-9,. ]+$/.test(description)) {
    errors.description = 'description can not include symbols except comma and full stop';
  }
  if (!validator.isEmpty(description)) {
    if (!validator.isLength(description, { min: 5, max: 1000 })) {
      errors.description = 'description must be greater than 5 but less than 1000 words';
    }
  } else {
    errors.description = 'Center should have a description';
  }

  // validations for location
  if (!/^[a-zA-Z0-9, ]+$/.test(location)) {
    errors.location = 'location can not include symbols except comma';
  }
  if (!validator.isEmpty(location)) {
    if (!validator.isLength(location, { min: 5, max: 1000 })) {
      errors.location = 'location must be greater than 5 but less than 100 words';
    }
  } else {
    errors.location = 'Center should have an Address';
  }

  return { errors, isValid: isEmpty(errors) };
}