import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    }
    this.onChange =this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    this.props.userSignupRequest(this.state).then(() => {
      // this.props.addFlashMessage({
      //     type: 'Success',
      //     text: 'Successfully Created Account.'
      // });
      // this.context.router.history.push('/dashboard');
  })
  .catch((error) => {
    console.log(error.response.data);
    this.setState({ errors: error.response.data})});
 
  }

 

  render() {
    return (
      <div className="col-lg-4">
      <div className="form-outer text-center"> 
        <div className="form-inner">
          <span className="logo text-uppercase"><strong className="text-primary">sign up</strong></span>
          <h2>Please fill in your details to get started</h2>
          <form id="signup-form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input id="fullname" type="text" placeholder="Fullname" onChange={this.onChange} value={this.state.fullname} />
            </div>
            <div className="form-group">
              <input id="email" type="email" placeholder="Email" onChange={this.onChange} value={this.state.email} />
            </div>
            <div className="form-group">
              <input id="password" type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} />
            </div>
            <div className="form-group">
              <input id="retypePass" type="password" placeholder="Retype Password" onChange={this.onChange} value={this.state.retypePass} />
            </div>
            <input id="signup" type="submit" value="Create Account" className="btn btn-primary"/>
          </form>
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
