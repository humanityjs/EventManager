import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import { logout } from '../actions/signInActions';
import { addCenter } from '../actions/centerActions';
import addCenterValidation from '../shared/centerValidations';
import TextField from '../common/textField';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

@connect((store) => {
  return {
    user: store.auth.user,
    center: store.center,
  }
})

export default class AddCenterPage extends React.Component {
  constructor() {
    super();

    this.state = {
      centerName:'',
      location:'',
      facilities:'',
      description:'',
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(addCenter(this.state));
  
      // this.context.router.history.push('/admin-center')
      // if (this.props.center.addCenterError === 'Token is Invalid or Expired') {
      //   console.log(this.props);
      // }
    }
    
  }

  isValid() {
    const { errors, isValid } = addCenterValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  // logout(e) {
  //   this.props.logout();
  // }
  
  render() {
    // console.log(this.props.logout);
    // if (this.props.center.addCenterError === 'Token is Invalid or Expired') {
    //   {this.logout.bind(this)}
    // }
    if (!this.props.user.isAdmin) {
      return (<Redirect to="/dashboard" />);
    };
    const {
      centerName,
      location,
      facilities,
      description,
      errors,
      serverError,
    } = this.state;
    return (
      
      <div id="add-center">
        <Navbar />
        <div class="container">
          <div class="row">
            <div className="col-lg-3">
              <div className="media">
                <img className="img" src="images/image2.jpg"/>
              </div>
            </div>
            <div className="col-lg-9">
              <div class="form-outer text-center">
                <div class="form-inner">
                  <div class="logo"><strong class="text-primary">add a new center</strong></div>
                  <hr/>
                  <span className="help-block">{this.props.center.addCenterError}</span>
                  <form id="add-center-form" onSubmit={this.onSubmit}>
                  <TextField
                    id='centerName'
                    value={this.state.centerName}
                    placeholder='center name'
                    type='text'
                    error={errors.centerName} 
                    onChange={this.onChange} />

                  <TextField
                    id='location'
                    value={this.state.location}
                    placeholder='location'
                    type='text'
                    error={errors.location} 
                    onChange={this.onChange} />
                  <p class="subtitle">separate facilities with spaces</p>
                  <TextField
                    id='facilities'
                    value={this.state.facilities}
                    placeholder='facilities in center'
                    type='text'
                    error={errors.facilities} 
                    onChange={this.onChange} />

                    <p class="subtitle">describe the center in few words</p>
                    <span className="help-block">{errors.description}</span>
                    <div class="form-group">
                      <textarea class="form-control" id="description" onChange={this.onChange}></textarea>
                    </div> 
                    <input id="add-event" type="submit" value="Add Center" class="btn btn-primary"/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


