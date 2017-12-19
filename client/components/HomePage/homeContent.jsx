import React from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions.jsx';
import { addFlashMessage } from '../../actions/flashMessages.js';
import PropTypes from 'prop-types';

import Welcome from './HomeContent/welcome.jsx';
import SignInForm from './HomeContent/signInForm.jsx';
import SignUpForm from  './HomeContent/signUpForm.jsx';

class HomeContent extends React.Component {

  render() {
    const  { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Welcome />
          <SignUpForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
        </div>
      </div>
    );
  }
}

HomeContent.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(HomeContent);