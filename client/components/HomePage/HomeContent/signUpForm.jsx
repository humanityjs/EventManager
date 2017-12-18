import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { browserHistory } from 'react-router-dom';

import validateInput from '../../../shared/signup.js';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retypePassword: '',
      errors: {}
    }
 
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid) {
      // this.setState({ errors: {}, isLoading: true });
      this.props.userSignUpRequest(this.state).then(
        () => {
          // this.props.addFlashMessage({
          //   type: 'success',
          //   text: 'You are now Signed Up, Welcome!'
          // })
          // browserHistory.push('/');
        },
        ({ data }) => this.setState({ errors: data })
      );
    }
  }

  isValid() {
    const { errors } = validateInput(this.state);
    console.log(this.state.fullname);
    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {

  }
}



export default SignUpForm;
