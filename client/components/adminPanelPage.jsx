import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import { getCenters } from '../actions/centerActions';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

@connect((store) => {
  return {
    centers: store.center.centers,
    user: store.auth.user
  };
})

class AdminPanelPage extends React.Component {

  componentWillMount() {
    this.props.dispatch(getCenters());
  }
  
  render() {
    if (!this.props.user.isAdmin) {
      return (<Redirect to="/user-dashboard" />);
    }
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
                <span onClick={this.onClick} id={center.id}>{center.centerName} </span>
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
    return (
        <div id="center-page">
          <Navbar />
          {adminCenterPage}
          <Footer />
        </div>
    );
  }
}

export default AdminPanelPage;