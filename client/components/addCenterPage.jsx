import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import { logout } from '../actions/signInActions';
// import { addCenter } from '../actions/centerActions';
// import addCenterValidation from '../shared/centerValidations';
import CenterForm from './addCenterForm';
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

  // logout(e) {
  //   this.props.logout();
  // }
  
  render() {
     //Check if user is logged in and is also an Admin
     if (!this.props.user.isAuth) {
      return (<Redirect to="/" />);
    } else if (!this.props.user.isAdmin) {
      return (<Redirect to="/dashboard" />);
    }
    
    const { pathname } = this.props.location
    // console.log(this.props.logout);
    // if (this.props.center.addCenterError === 'Token is Invalid or Expired') {
    //   {this.logout.bind(this)}
    // }
    if (!this.props.user.isAdmin) {
      return (<Redirect to="/dashboard" />);
    };
    return (
      
      <div id="add-center">
        <Navbar />
        <div class="container">
          <div class="row">
            <div className="col-lg-6">
              <div class="form-outer text-center">
                <div class="form-inner">
                  <div class="logo"><strong class="text-primary">add a new center</strong></div>
                  <hr/>
                  <CenterForm path={pathname}/>
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


