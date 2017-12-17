import React from 'react';
import { connect } from 'react-redux';
import { userSignUpRequest } from '../../actions/signUpActions.jsx'

import Welcome from './HomeContent/welcome.jsx';
import SignIn from './HomeContent/signInForm.jsx';
import SignUp from  './HomeContent/signUpForm.jsx';

class HomeContent extends React.Component {

  render() {
    const { userSignUpRequest } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Welcome />
          <SignIn />
          <SignUp userSignUpRequest = {userSignUpRequest}/>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: React.PropTypes.func.isRequired
}

export default connect(null,{ userSignUpRequest })(HomeContent);