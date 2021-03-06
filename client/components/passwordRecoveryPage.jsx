import React from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import Form from './passwordRecovery/recoveryForm';

export default class PasswordRecovery extends React.Component {
  render() {
    return (
      <div id="recover-password">
        <Navbar />
        <div className="container">
          <div className="row">
          <div className="col-lg-4">
            <div className="form-outer text-center">
              <div className="form-inner">
                <Form />
              </div>
            </div>
          </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}