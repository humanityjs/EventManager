import React from 'react';
import { connect } from 'react-redux';

import { confirmEmail, generateCode, updateUserDetails } from '../../actions/signInActions';
import { recoverPassword, updateUser } from '../../shared/userValidation';
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
      retypePass: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  isValid(id) {
    if (id === 'verifyEmail') {
      const { error, isValid } = recoverPassword(this.state);
      if (!isValid) {
        this.setState({ error });
      }
      return isValid;
    } else if (id === 'newPassword') {
      const { error, isValid } = updateUser(this.state);
      if (!isValid) {
        this.setState({ error });
      }
      return isValid;
    }
  }
  onSubmit(e) {
    e.preventDefault();
    if (e.target.id === 'verifyEmail') {
      if (this.isValid(e.target.id)) {
        this.props.dispatch(confirmEmail(this.state));
      }
    } else if (e.target.id === 'verifyCode') {
      if (this.state.code === this.props.auth.code) {
        this.showDiv('verifyCode', 'newPassword');
      }
    } else if (e.target.id === 'newPassword') {
      if (this.isValid(e.target.id)) {
        this.props.dispatch(updateUserDetails(this.state));
      }
    }
  }
  showDiv(id1, id2) {
    document.getElementById(id1).hidden = true;
    document.getElementById(id2).hidden =  false;
  }
  componentDidUpdate() {
    if (this.props.auth.status === 200) {
      this.props.dispatch(generateCode());
      this.showDiv('verifyEmail', 'verifyCode');
    }
  }

  render() {
    let form;
    const { email, error, code, password, retypePass } = this.state;
    
    return (
    <div>
      <div id="newPassword" hidden>
        <form id="newPassword" onSubmit={this.onSubmit}>
          <span className="help-block">{this.props.auth.message}</span>
          <div id="input text-center">
            <input
            id='password'
            value={this.state.password}
            placeholder="Password"
            type='text'
            onChange={this.onChange}
            error={error.password} 
            />
            <border></border>
          </div>
          <div id="input text-center">
            <input
            id='retypePass'
            value={this.state.retypePass}
            placeholder='Type password again'
            type='text'
            onChange={this.onChange}
            error={error.retypePass} 
            />
            <border></border>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary basic"/>
        </form>
      </div>
      <div id="verifyCode" hidden>
        <form id="verifyCode" onSubmit={this.onSubmit}>
          <span className="help-block">{this.props.auth.message}</span>
          <div id="input text-center">
            <input
            id='code'
            value={this.state.code}
            placeholder='---------'
            type='text'
            onChange={this.onChange}
            error={error.code} 
            />
            <border></border>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
      </div>
      <div id="verifyEmail">
        <form id="verifyEmail" onSubmit={this.onSubmit}>
          <span className="help-block">{this.props.auth.message}</span>
          <div id="input text-center">
          <input
          id='email'
          value={this.state.email}
          placeholder='Email address'
          type='email'
          onChange={this.onChange}
          error={error.email} 
          />
          <border></border>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
      </div>
    </div>
    )
  }
}