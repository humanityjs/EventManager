import validator from 'validator';
import isEmpty from 'lodash';

export default function validateInput(data) {
  const errors = {};

  if (!validator.isEmpty(data.fullname)) {
    if (!validator.isLength(data.fullname, { min: 5, max: 20 })) {
      errors.fullname = 'fullname must be more than 5 characters but less than 20';
    }
  } else {
    errors.fullname = 'fullname cannot be blank';
  }
  if (validator.toInt(data.fullname)) {
    errors.fullname = 'fullname can only contain numbers and letters';
  }

  // if (!validator.isEmpty(data.email)) {
  //   if (!validator.isEmail(data.email)) {
  //     errors.email = 'Email is invalid';
  //   }
  // } else { errors.email = 'Email is required'; }

  // if (!validator.isEmpty(data.password)) {
  //   if (!validator.isLength(data.password, { min: 5, max: 20 })) {
  //     errors.password = 'Password length must be between 5 and 20';
  //   }
  // } else { errors.password = 'Password is required'; }

  // if (!validator.isEmpty(data.retypePassword)) {
  //   if (!validator.equals(validator.trim(data.retypePassword), validator.trim(data.password))) {
  //     errors.retypePassword = 'Password mismatched';
  //   }
  // } else { errors.retypePassword = 'Password confirmation is required'; }
console.log(errors);
  return { 
    errors, 
    isValid: isEmpty(errors) 
  };
}

