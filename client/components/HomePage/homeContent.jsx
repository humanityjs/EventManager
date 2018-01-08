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
  constructor() {
    super();
    this.state = {
      signupHidden: false,
      signinHidden: true,
    }
  }
  toggleDiv() {
    this.setState({
      signinHidden: !this.state.signinHidden,
      signupHidden: !this.state.signupHidden,
    })
  }
 

  render() {
    let messageDisplay;
    const  { userSignupRequest, userSignInRequest, addFlashMessage } = this.props;
    if (this.state.signupHidden) {
      messageDisplay = "Are you new here? Create An Account";
    }
    else {
      messageDisplay = "Already Signed Up? Sign In To Your Account";
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <Welcome />
          </div>        
          <div className="col-lg-4">
            <div className="form-outer text-center">
              <div className="form-inner">
                {!this.state.signupHidden && <SignUpForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>}    
                {!this.state.signinHidden && <SignInForm userSignInRequest={userSignInRequest} addFlashMessage={addFlashMessage} />}
                <span onClick={this.toggleDiv.bind(this)} className="goto">{messageDisplay}</span>       
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomeContent.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  userSignInRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, userSignInRequest, addFlashMessage })(HomeContent);