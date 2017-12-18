import validator from 'validator';
import isEmpty from 'lodash';

const signup = (data) => {
  const errors = {};

  if (!validator.isEmpty(data.fullname)) {
    if (!validator.isLength(data.fullname, { min: 5, max: 20 })) {
      errors.fullname = 'Fullname must be more than 5 characters but less than 20';
    }
  } else {
    errors.fullname = 'Fullname cannot be blank';
  }
  if (validator.toInt(data.fullname)) {
    errors.fullname = 'Fullname can only contain numbers and letters';
  }

  if (!validator.isEmpty(data.email)) {
    if (!validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  } else { errors.email = 'Email is required'; }

  if (!validator.isEmpty(data.password)) {
    if (!validator.isLength(data.password, { min: 5, max: 20 })) {
      errors.password = 'Password length must be between 5 and 20';
    }
  } else { errors.password = 'Password is required'; }

  if (!validator.isEmpty(data.retypePassword)) {
    if (!validator.equals(validator.trim(data.retypePassword), validator.trim(data.password))) {
      errors.retypePassword = 'Password mismatched';
    }
  } else { errors.retypePassword = 'Password confirmation is required'; }

  return { errors, isValid: isEmpty(errors) };
};

export default signup;
