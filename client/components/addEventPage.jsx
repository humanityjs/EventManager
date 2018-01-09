import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCenters, getCenterSelected } from '../actions/centerActions';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import AddEventForm from './eventPage/addEventForm.jsx';
import isEmpty from 'lodash/isEmpty';

@connect((store) => {
  return {
    auth: store.auth,
    centers: store.center.centers,
    center: store.center.center,
  }
})

export default class AddEvent extends React.Component {
  

  componentWillMount() {
    this.props.dispatch(getCenters());
  }

  getCenters() {

  }

  render() {
     //Check if user is logged in
     if (!this.props.auth.isAuth) {
      return (<Redirect to="/" />);
    }
    const center = this.props.center;
    let centerInfo;
    if (isEmpty(center)) {
      centerInfo = (
        <div className="form-inner">
          <div className="media largeIcon">
            <i className="fa fa-home"><h3>Select a center</h3></i>
          </div>
        </div>
      )
    } else {
      centerInfo = (
        <div className="form-inner">
          <div className="media">
            <img className="img" src="images/image2.jpg"/>
          </div>
          <div className="media-body">
            <h2 className="media-heading">
              <span>{center.centerName}</span>
            </h2>
            <h3>Location</h3>
            <p>{center.location}</p>
            <h3>Facilities</h3>
            <p>{center.facilities}</p>
            <h3>Description</h3>
            <p>{center.description}</p>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Navbar />
        <div id="event-form">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="form-outer text-center">
                  {centerInfo}
                </div>
              </div>
              <div className="col-lg-8">
                <div className="form-outer text-center">
                  <div className="form-inner">
                    <div className="logo">lets make your <strong className="text-primary">event</strong> a memorable one</div>
                    <hr/>
                    <AddEventForm />
                  </div>
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

