import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const { email, password } = data;

  const errors = {};

  if (validator.isEmpty(email)) {
    errors.email = 'email is required';
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Type a valid email';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  return { errors, isValid: isEmpty(errors) };
}
