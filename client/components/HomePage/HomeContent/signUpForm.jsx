import React from 'react';



export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpFullname: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpRetypePassword: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userSignUpRequest(this.state);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
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
                <input id="signUpFullname" type="text" placeholder="Fullname" value={this.state.fullname} onChange={this.onChange} required/>
              </div>
              <div className="form-group">
                <input id="signUpEmail" type="email" placeholder="Email" value={this.state.email} onChange={this.onChange} required/>
              </div>
              <div className="form-group">
                <input id="signUpPassword" type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} required/>
              </div>
              <div className="form-group">
                <input id="signUpRetypePassword" type="password" placeholder="Retype Password" value={this.state.retypePassword} onChange={this.onChange} required/>
              </div>
              <input id="signup" type="submit" value="Create Account" className="btn btn-primary"/>
            </form>
            <a href="#" className="goto">already signed up? login to your account</a>
          </div>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: React.PropTypes.func.isRequired
}