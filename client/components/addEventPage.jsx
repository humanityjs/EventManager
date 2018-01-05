import React from 'react';
import { connect } from 'react-redux';
import { getCenters, getCenterSelected } from '../actions/centerActions';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import AddEventForm from './eventPage/addEventForm';

@connect((store) => {
  return {
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
    const center = this.props.center;
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="form-outer text-center">
                <div className="form-inner">
                  <div className="media">
                    <img className="img" src="images/image2.jpg"/>
                  </div>
                  <div className="media-body">
                    <h2 className="media-heading">
                      <span></span>
                    </h2>
                    <h3><span>Location: </span>{center.location}</h3>
                    <h3><span>facilities: </span>{center.facilities}</h3>
                    <h3><span>description: </span>{center.description}</h3>
                  </div>
                </div>
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
        <Footer />
      </div>
    )
  }
}

