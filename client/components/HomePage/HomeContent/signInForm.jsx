import React from 'react';

export default class SignInForm extends React.Component {
  constructor() {
    super();

    this.state = {
      signInEmail: '',
      signInPassword: ''
    }

    this.onChange = this.onChange.bind(this);
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
          <div className="logo text-uppercase"><strong className="text-primary">Sign In</strong></div>
          <h2>Welcome Back!</h2>
          <form id="login-form">
            <div className="form-group">
              <input id="signInEmail" type="email" placeholder="Email" onChange={this.onChange} value={this.state.email} required/>
            </div>
            <div className="form-group">
              <input id="signInPassword" type="password" placeholder="Password" onChange={this.onChange} value={this.statepasswird} required/>
            </div>
            <input id="login" type="submit" value="login" className="btn btn-primary"/>
          </form>
          <a href="#" className="goto">Forgot Password? Click Here</a><br/>
          <a href="#" className="goto">are you new here? Create An Account</a>
        </div>
      </div>
    </div>
    );
  }
}