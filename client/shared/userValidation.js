import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  const { fullname, email, password, retypePass } = data;

  if (!validator.isEmpty(fullname)) {
    if (!validator.isLength(fullname, { min: 5, max: 20 })) {
      errors.fullname = 'Fullname must be more than 5 characters but less than 20';
    }
  } else {
    errors.fullname = 'Fullname cannot be blank';
  }
  if (!/^[a-zA-Z0-9 ]+$/.test(fullname)) {
    errors.fullname = 'Fullname can only contain numbers and letters';
  }

  if (!validator.isEmpty(email)) {
    if (!validator.isEmail(email)) {
      errors.email = 'Email is invalid';
    }
  } else { errors.email = 'Email is required'; }

  if (!validator.isEmpty(password)) {
    if (!validator.isLength(password, { min: 5, max: 20 })) {
      errors.password = 'Password length must be between 5 and 20';
    }
  } else { errors.password = 'Password is required'; }

  if (!validator.isEmpty(retypePass)) {
    if (retypePass !== password) {
      errors.retypePass = 'Password must match';
    }
  } else { errors.retypePass = 'Type Password Again'; }

  return { errors, isValid: isEmpty(errors) };
}
