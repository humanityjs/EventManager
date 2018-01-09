import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getCenters, getCenterSelected } from '../actions/centerActions';

// const store = reduxStore();
@connect((store) => {
  return {
    centers: store.center.centers,
    auth: store.auth,
  };
})

export default class DisplayCenters extends React.Component {

  componentWillMount() {
    this.props.dispatch(getCenters());
  }

  onClick(e) {
    this.props.dispatch(getCenterSelected(e.target.id)).then(() => {
      <Redirect to="/view-center-event" />
    })
  }

  render() {
    const adminCenterPage = _.map(this.props.centers, (center) => {
      return (
        <div className="row" key={center.id}>
          <div className="col-lg-3">
            <div className="media">
              <img className="img" src="images/image2.jpg"/>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="media-body">
              <h2 className="media-heading">
                <span onClick={this.onClick.bind(this)} id={center.id}>{center.centerName}</span>
              </h2>
              <div className="col-lg-9">
                <h3><span>Location: </span> {center.location}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>facilities: </span> {center.facilities}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>description: </span> {center.description}</h3>
              </div>
            </div>
            <span className="trash"><i className="fa fa-user-circle"></i></span>
          </div>
        </div>
      )
    }); 
    
    const guestCenterPage = _.map(this.props.centers, (center) => {
      return (
        <div className="row" id={center.id} key={center.id}>
          <div className="col-lg-3">
            <div className="media">
              <img className="img" src="images/image2.jpg"/>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="media-body">
              <h2 className="media-heading">{center.centerName}</h2>
              <div className="col-lg-9">
                <h3><span>Location: </span> {center.location}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>facilities: </span> {center.facilities}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>description: </span> {center.description}</h3>
              </div>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div className="container">
        { this.props.auth.user.isAdmin ? adminCenterPage : guestCenterPage }
      </div>
    );
  }
}


