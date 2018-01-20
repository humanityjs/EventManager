import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userSignInRequest } from '../../../actions/signInActions.js';
import TextField from '../../../common/textField3';
import { validateSigninInput } from '../../../shared/userValidation';

@connect((store) => {
  return {
    auth: store.auth,
  }
})

export default class SignInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      login_email: '',
      login_password: '',
      errors: {},
      serverError: '',
      isLoading: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateSigninInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(userSignInRequest(this.state));
    }
  }

  render() {

    const { login_email, login_password, errors, serverError } = this.state;
    return (
      <div>  
        <div className="logo text-uppercase"><strong className="text-primary">Sign In</strong></div>
        <h2>Welcome Back!</h2>
        <span className="help-block">{serverError}</span>
        <form id="login-form" onSubmit={this.onSubmit}>
          <TextField
              id='login_email'
              value={this.state.login_email}
              placeholder='Email Address'
              type='email'
              error={errors.login_email}
              onChange={this.onChange} />
              
            <TextField
              id='login_password'
              value={this.state.login_password}
              placeholder='Password'
              type='password'
              error={errors.login_password} 
              onChange={this.onChange} />

          <input id="login" type="submit" value="login" className="btn btn-primary" disabled={this.state.isLoading}/>
        </form>
        <Link to="/recover-password">Forgot Password? Click Here</Link>
      </div>
             
    );
  }
}
