import React from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signUpActions.js';
import { userSignInRequest } from '../../actions/signInActions.js';
import { addFlashMessage } from '../../actions/flashMessages.js';
import PropTypes from 'prop-types';

import Welcome from './HomeContent/welcome.jsx';
import SignInForm from './HomeContent/signInForm.jsx';
import SignUpForm from  './HomeContent/signUpForm.jsx';

class HomeContent extends React.Component {

  render() {
    const  { userSignInRequest, addFlashMessage } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Welcome />
          {/* <SignUpForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>  */}
          <SignInForm userSignInRequest={userSignInRequest} addFlashMessage={addFlashMessage} />
        </div>
      </div>
    );
  }
}

HomeContent.propTypes = {
  // userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  userSignInRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignInRequest, addFlashMessage })(HomeContent);