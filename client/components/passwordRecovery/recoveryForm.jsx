import React from 'react';
import { connect } from 'react-redux';

import { confirmEmail, generateCode, modifyPassword } from '../../actions/signInActions';
import { recoverPassword } from '../../shared/userValidation';
import TextField from '../../common/textField';

@connect((store) => {
  return {
    auth: store.auth,
  }
})
export default class RecoveryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      error: '',
      code: '',
      password: '',
      passwordRetype: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onSubmitCode = this.onSubmitCode.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  isValid() {
    const { error, isValid } = recoverPassword(this.state);
    if (!isValid) {
      this.setState({ error });
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(confirmEmail(this.state));
    }
     
  }
  showDiv() {
    this.props.dispatch(generateCode());
    document.getElementById("verifyEmail").hidden = true;
    document.getElementById("verifyCode").hidden =  false;
  }
  componentDidUpdate() {
    if (this.props.auth.status === 200) {
      this.showDiv();
    }
  }
  onSubmitCode(e) {
    e.preventDefault();
    if (this.state.code === this.props.auth.code) {
      document.getElementById("verifyCode").hidden = true;
      document.getElementById("newPassword").hidden = false;
    }
  }
  onSubmitPassword(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordRetype) {
      this.props.dispatch(modifyPassword(this.state));
    }
  }

  render() {
    let form;
    const { email, error, code, password, passwordRetype } = this.state;
    
    return (
    <div>
      <div id="newPassword" hidden>
        <form onSubmit={this.onSubmitPassword}>
          <span className="help-block">{this.props.auth.message}</span>
          <TextField
          id='password'
          value={this.state.password}
          placeholder="Password"
          type='text'
          onChange={this.onChange}
          error={error.password} 
          />
          <TextField
          id='passwordRetype'
          value={this.state.passwordRetype}
          placeholder='Type password again'
          type='text'
          onChange={this.onChange}
          error={error.passwordRetype} 
          />
          <input type="submit" value="Submit" className="btn btn-primary basic"/>
        </form>
      </div>
      <div id="verifyCode" hidden>
        <form onSubmit={this.onSubmitCode}>
          <span className="help-block">{this.props.auth.message}</span>
          <TextField
          id='code'
          value={this.state.code}
          placeholder='------'
          type='text'
          onChange={this.onChange}
          error={error.code} 
          />
          <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
      </div>
      <div id="verifyEmail">
        <form onSubmit={this.onSubmit}>
          <span className="help-block">{this.props.auth.message}</span>
          <TextField
          id='email'
          value={this.state.email}
          placeholder='Email address'
          type='text'
          onChange={this.onChange}
          error={error.email} 
          />
          <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
      </div>
    </div>
    )
  }
}