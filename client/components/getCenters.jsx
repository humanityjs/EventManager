import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import './center.css';



class displayCenters extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    axios.get('api/v1/centers').then((response) => {
      this.setState({
        centers: response.data.centers
      })
    });
  }

  render() {
    const adminCenterPage = _.map(this.state.centers, (center) => {
      return (
        <div className="row" id={center.id} key={center.id}>
          <div className="col-lg-3">
            <div className="media">
              <img className="img" src="images/image2.jpg"/>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="media-body">
              <h2 className="media-heading">
                <Link to="/view-center-event">{center.centerName} </Link>
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
    
    const guestCenterPage = _.map(this.state.centers, (center) => {
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

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(displayCenters);