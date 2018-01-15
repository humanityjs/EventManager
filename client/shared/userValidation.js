import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function validateSignupInput(data) {
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

export function validateSigninInput(data) {
  const { login_email, login_password } = data;

  const errors = {};

  if (validator.isEmpty(login_email)) {
    errors.login_email = 'email is required';
  }

  if (!validator.isEmail(login_email)) {
    errors.login_email = 'Type a valid email';
  }

  if (validator.isEmpty(login_password)) {
    errors.login_password = 'password is required';
  }

  return { errors, isValid: isEmpty(errors) };
}

export function recoverPassword(data) {
  const { email } = data;
  const error = {};
  

  if (email === undefined || validator.isEmpty(email)) {
    error.email = 'email is required';
  }

  if (!validator.isEmail(email)) {
    error.email = 'Type a valid email';
  }
  return { error, isValid: isEmpty(error) }
}
