import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router-dom';

import validation from '../../../shared/userValidation';
import TextField from '../../../common/textField'

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
    
    if (isValid()) {
      
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(() => {
        this.props.addFlashMessage({
            type: 'Success',
            text: 'Successfully Created Account.'
        });
        browserHistory.push('/admin_panel')
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
              <TextField
                id='fullname'
                value={this.state.fullname}
                placeholder='fullname'
                type='text'
                error={errors.fullname} 
                onChange={this.onChange} />
                
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
                
                <TextField
                id='retypePass'
                value={this.state.retypePass}
                placeholder='Type password again'
                type='password'
                error={errors.retypePass} 
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
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default SignUpForm;
