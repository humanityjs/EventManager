import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import validation from '../../../shared/userValidation';

// import { browserHistory } from 'react-router-dom';



class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retypePass: '',
      errors: {},
      isLoading: ''
    }
    this.onChange =this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  isValid() {
    const { errors, isValid } = validation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(() => {
        // this.props.addFlashMessage({
        //     type: 'Success',
        //     text: 'Successfully Created Account.'
        // });
        // this.context.router.history.push('/dashboard');
      })
      .catch((error) => {
        this.setState({ errors: error.response.data, isLoading: false})
      });
    }
  
  }

 

  render() {
    const {
      fullname,
      email,
      password,
      retypePass,
      errors,
    } = this.state;
    return (
      <div className="col-lg-4">
        <div className="form-outer text-center"> 
          <div className="form-inner">
            <span className="logo text-uppercase"><strong className="text-primary">sign up</strong></span>
            <h2>Please fill in your details to get started</h2>
            <form id="signup-form" onSubmit={this.onSubmit}>
              <TextFieldGroup
                id='fullname'
                value={this.state.fullname}
                placeholder='Type your fullname'
                type='text'
                error={errors.fullname} 
                onChange={this.onChange} />
                <TextFieldGroup
                id='email'
                value={this.state.email}
                placeholder='Type your email address'
                type='email'
                error={errors.email} 
                onChange={this.onChange} />
                <TextFieldGroup
                id='password'
                value={this.state.fullname}
                placeholder='Type your fullname'
                type='text'
                error={errors.fullName} 
                onChange={this.onChange} />
              <input id="signup" type="submit" value="Create Account" className="btn btn-primary" disabled={this.state.isLoading}/>
            </form>
            <a href="#" className="goto">already signed up? login to your account</a>
          </div>
        </div>
      </div>
    )
  }
}

SignUpForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default SignUpForm;
