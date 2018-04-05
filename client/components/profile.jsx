import React from 'react';
import { connect } from 'react-redux';
import TextField from '../common/textField3';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import { uploadImage } from '../actions/centerActions';
import UploadImage from './imageUpload';
import { updateUserValidation } from '../shared/userValidation';
import { updateUserDetails, checkPassword } from '../actions/signInActions';
import { eventBooked } from '../actions/eventActions';

@connect((store) => {
  return {
    auth: store.auth,
    event: store.event,
  };
})

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      retypePass: '',
      newPassword: '',
      oldPassword: '',
      errors: {},
      wrongPasswordError: '',
    }
    this.initialState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.showDiv = this.showDiv.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }
  componentWillMount() {
    const { id } = this.props.auth.user;
    this.props.dispatch(eventBooked(id));
  }
  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({
      fullname: user.fullname || '',
      email: user.email || '',
      id: this.props.auth.user.id,
    })
  }
  
  showDiv(e) {
    if (e) {
      e.preventDefault();
    } 
    const div = document.getElementById('passwordUpdate');
    const div2 = document.getElementById('submitButton');
    const span = document.getElementById('subtitle');
    div.hidden = !div.hidden;
    div2.hidden = !div2.hidden;
    span.hidden = !span.hidden;
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  checkPassword(e) {
    e.preventDefault();
    this.props.dispatch(checkPassword(this.state));
  }
  isValid() {
    const { errors, isValid } = updateUserValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.initialState !== this.state) {
      if (this.isValid()) {
        this.props.dispatch(updateUserDetails(this.state));
      }
    }
  }
  componentDidUpdate() {
    if (this.props.auth.message === 'Password Match') {
      const div = document.getElementById('newPasswordDiv');
      const span = document.getElementById('subtitle');
      this.showDiv();
      div.hidden = false;
      span.hidden = true;
    } else if (this.props.auth.message === 'Wrong Password') {
        this.state.wrongPasswordError= 'Wrong Password';
    }
  }

  render() {
    const { fullname, email, retypePass, newPassword, oldPassword, errors, wrongPasswordError } = this.state;
    const createdAt = this.props.auth.user.createdAt.slice(0, 10);
    const evenBooked = _.map()
    return (
      <div id="profile-page">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="card col-lg-3 text-center pt-4 bb mb-4 pb-4">
              <div className="text-primary">Personal Information</div>
              <hr/>
              <form id="editdetails">
                <UploadImage />
                <h3 className="pt-1">
                  <TextField
                    id='fullname'
                    value={fullname}
                    placeholder='Fullname'
                    type='text'
                    error={errors.fullname} 
                    onChange={this.onChange}
                    className="no-border"
                  />
                </h3>
                <TextField
                id='email'
                value={email}
                placeholder='Email Address'
                type='email'
                error={errors.email}
                onChange={this.onChange} />
                
                <span className="subtitle pointer" id="subtitle" onClick={this.showDiv}>Click here to change your password</span>
                <div id="passwordUpdate" hidden>
                  <span className="help-block">{this.props.auth.message}</span>
                  <br/>
                  <span className="subtitle">Password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                    <input id='oldPassword'
                      value={oldPassword}
                      placeholder='Type old password'
                      type='password'
                      error='' 
                      onChange={this.onChange} />
                    <border></border>
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <button onClick={this.checkPassword} className="btn btn-sm btn-success mt-2 mr-4">check</button>
                  <button onClick={this.showDiv} id="cancelButton" className="btn btn-sm btn-danger mt-2">cancel</button>
                  {/* <input type="button" className="btn btn-sm btn-primary mt-4" value="check" onClick={this.checkPassword} /> */}
                </div>

                <div id="newPasswordDiv" hidden>
                  <span className="subtitle">New password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                      <input
                        id='newPassword'
                        value={newPassword}
                        placeholder='New Password'
                        type='password'
                        error={errors.newPassword} 
                        onChange={this.onChange} />
                      <border></border>
                    </div>
                  </div>
                  <span className="subtitle">Retype password</span>
                  <div className="form-check-inline">
                    <div class="col-12 no-padding">
                      <input
                        id='retypePass'
                        value={retypePass}
                        placeholder='Retype Password'
                        type='password'
                        error={errors.retypePass} 
                        onChange={this.onChange} />
                      <border></border>
                    </div>
                  </div>
                </div>
                <div id="submitButton">
                  <input id="updateDetails" onClick={this.onSubmit} type="button" value="submit" className="btn btn-sm btn-success mt-4"/>
                </div>
              </form>
            </div>
            <div className="card col-lg-3 text-center pt-4 bb">
              
              <div className="text-primary">Activities</div>
              <hr/>
              <div className="mb-4">
              <h4 className="mt-4">Date Joined</h4>
              <h3 className="mt-4">{createdAt}</h3>
              </div>
              <div className="mb-4">
              <h4 className="mt-4">Events Booked</h4>
              <span className="display-3">{this.props.event.eventBookedCount}</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
