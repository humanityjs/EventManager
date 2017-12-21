import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../../../common/textField';
import validation from '../../../shared/userSignInValidation';

class SignInForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {},
      serverError: '',
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { errors, isValid } = validation(this.state);
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
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignInRequest(this.state).then(() => {
        this.props.addFlashMessage({
            type: 'Success',
            text: 'Successfully Signed In.'
        });
        this.context.router.history.push('/dashboard')
      })
      .catch((error) => {
        this.setState({ serverError: error.response.data.message });
        this.setState({ errors: error.response.data, isLoading: false})
      });
    }

  }

  render() {
    const { email, password, errors, serverError } = this.state;
    return (
    <div className="col-lg-4">
      <div className="form-outer text-center">
        <div className="form-inner">
          <div className="logo text-uppercase"><strong className="text-primary">Sign In</strong></div>
          <h2>Welcome Back!</h2>
          <span className="help-block">{serverError}</span>
          <form id="login-form" onSubmit={this.onSubmit}>
          <TextField
                id='email'
                value={this.state.email}
                placeholder='email address'
                type='email'
                error={errors.email}
                onChange={this.onChange} />
                
                <TextField
                id='password'
                value={this.state.password}
                placeholder='password'
                type='password'
                error={errors.password} 
                onChange={this.onChange} />

            <input id="login" type="submit" value="login" className="btn btn-primary" disabled={this.state.isLoading}/>
          </form>
          <a href="#" className="goto">Forgot Password? Click Here</a><br/>
          <a href="#" className="goto">are you new here? Create An Account</a>
        </div>
      </div>
    </div>
    );
  }
}

SignInForm.propTypes = {
  userSignInRequest: PropTypes.func.isRequired,
}

SignInForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignInForm;
