import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
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
