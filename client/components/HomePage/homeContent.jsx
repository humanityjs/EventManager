import React from 'react';

import Welcome from './HomeContent/welcome.jsx';
import SignIn from './HomeContent/signInForm.jsx';
import SignUp from  './HomeContent/signUpForm.jsx';

export default class MainContent extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Welcome />
          <SignIn />
          <SignUp />
        </div>
      </div>
    );
  }
}