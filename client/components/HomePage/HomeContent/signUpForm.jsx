import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { browserHstory } from 'react-router-dom';

import validateInput from '../../../../server/shared/signup.js';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpFullname: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpRetypePassword: '',
      errors: {},
      isLoading: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { errors } = validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignUpRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You are now Signed Up, Welcome!'
          })
          browserHstory.push('/');
        },
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="col-lg-4">
        <div className="form-outer text-center"> 
          <div className="form-inner">
            <span className="logo text-uppercase"><strong className="text-primary">sign up</strong></span>
            <h2>Please fill in your details to get started</h2>
            <form id="signup-form" onSubmit={this.onSubmit}>
              <div className={classnames("form-group", { 'has-error' : errors.fullname })}>
                <input id="signUpFullname" type="text" placeholder="Fullname" value={this.state.fullname} onChange={this.onChange} />
                {errors.fullname && <span className="help-block">{errors.fullname}</span>}
              </div>
              <div className={classnames("form-group", { 'has-error' : errors.email })}>
                <input id="signUpEmail" type="email" placeholder="Email" value={this.state.email} onChange={this.onChange} />
                {errors.email && <span className="help-block">{errors.email}</span>}
              </div>
              <div className={classnames("form-group", { 'has-error' : errors.password })}>
                <input id="signUpPassword" type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
                {errors.password && <span className="help-block">{errors.password}</span>}
              </div>
              <div className={classnames("form-group", { 'has-error' : errors.retypePassword })}>
                <input id="signUpRetypePassword" type="password" placeholder="Retype Password" value={this.state.retypePassword} onChange={this.onChange} />
                {errors.fullname && <span className="help-block">{errors.retypePassword}</span>}
              </div>
              <input id="signup" type="submit" value="Create Account" className="btn btn-primary" disabled={this.state.isLoading}/>
            </form>
            <a href="#" className="goto">already signed up? login to your account</a>
          </div>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default SignUpForm;
