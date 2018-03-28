import React from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

@connect((store) => {
  return {
    auth: store.auth,
  }
})

export default class CenterPage extends React.Component {

  render() {
    const { user } = this.props.auth;
    return (
      <div id="center-page">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="form-outer text-center">
                <img src={user.imageUrl} className="img"/>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="form-outer text-center">
                <div className="form-inner">
                  <div className="text-primary">Personal Information</div>
                  <hr/>
                  
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
