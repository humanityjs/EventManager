import React from 'react';
import PropTypes from 'prop-types';

import { validateSignupInput } from '../../../shared/userValidation';
import TextField from '../../../common/textField3';




class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retypePass: '',
      errors: {},
      isLoading: '',
      serverError: '',
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
    const { errors, isValid } = validateSignupInput(this.state);
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
        this.props.addFlashMessage({
            type: 'Success',
            text: 'Successfully Created Account.'
        });
        let title = 'Welcome to Ecenter';
        let message = `Thank you for choosing Ecenter, We hope to make your events
        memorable.<br/> Click on this <a href="#">link</a> to see our event centers and get started`
        this.props.sendMail(this.state.email, message, title);
        this.context.router.history.push('/dashboard')
      })
      .catch((error) => {
        this.setState({ serverError: error.response.data.message });
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
      serverError
    } = this.state;
    return (
      <div>
        <div className="logo text-uppercase"><strong className="text-primary">Sign Up</strong></div>          
        <h2>Please fill in your details to get started</h2>
        <form id="signup-form" onSubmit={this.onSubmit}>
          <TextField
            id='fullname'
            value={this.state.fullname}
            placeholder='Fullname'
            type='text'
            error={errors.fullname} 
            onChange={this.onChange} />
            
            <TextField
            id='email'
            value={this.state.email}
            placeholder='Email Address'
            type='email'
            error={errors.email, serverError}
            onChange={this.onChange} />
            
            <TextField
            id='password'
            value={this.state.password}
            placeholder='Password'
            type='password'
            error={errors.password} 
            onChange={this.onChange} />
            
            <TextField
            id='retypePass'
            value={this.state.retypePass}
            placeholder='Re-type Password'
            type='password'
            error={errors.retypePass} 
            onChange={this.onChange} />

          <input id="signup" type="submit" value="Create Account" className="btn btn-primary"/>
        </form>     
      </div>
    )
  }
}

SignUpForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  sendMail: PropTypes.func.isRequired,
}

SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpForm;
