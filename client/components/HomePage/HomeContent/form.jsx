import React from 'react';

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      showMe: false
    }
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    this.setState({
      showMe : true
    });
  }

  signUp() {
    this.setState({
      showMe: false
    })
  };

  render() {
    if(this.state.showMe) {
      return (
      <div className="col-lg-4">
        <div className="form-outer text-center">
          <div className="form-inner">
            <div className="logo text-uppercase"><strong className="text-primary">Sign In</strong></div>
            <h2>Welcome Back!</h2>
            <form id="login-form">
              <div className="form-group">
                <input id="signin-email" type="email" placeholder="Email" required/>
              </div>
              <div className="form-group">
                <input id="signin-password" type="password" placeholder="Password" required/>
              </div>
              <input id="login" type="submit" value="login" className="btn btn-primary"/>
            </form>
            <a href="#" className="goto">Forgot Password? Click Here</a><br/>
            <a onClick={this.signUp} href="#" className="goto">are you new here? Create An Account</a>
          </div>
        </div>
      </div>
      );
    } else {
      return (
        <div className="col-lg-4">
          <div className="form-outer text-center"> 
            <div className="form-inner">
              <span className="logo text-uppercase"><strong className="text-primary">sign up</strong></span>
              <h2>Please fill in your details to get started</h2>
              <form id="signup-form">
                <div className="form-group">
                  <input id="username" type="text" placeholder="Fullname" required/>
                </div>
                <div className="form-group">
                  <input id="signup-email" type="email" placeholder="Email" required/>
                </div>
                <div className="form-group">
                  <input id="signup-password" type="password" placeholder="Password" required/>
                </div>
                <div className="form-group">
                  <input id="signup-retypepass" type="password" placeholder="Retype Password" required/>
                </div>
                <input id="signup" type="submit" value="Create Account" className="btn btn-primary"/>
              </form>
              <a onClick={this.signIn} href="#" className="goto">already signed up? login to your account</a>
            </div>
          </div>
        </div>
      );
    }
  }
}