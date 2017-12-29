import React from 'react';
import { connect } from 'react-redux';

import { getCenters } from '../actions/centerActions';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

@connect((store) => {
  return {
    centers: store.center.centers,
  };
})

class CenterPage extends React.Component {

  componentWillMount() {
    this.props.dispatch(getCenters());
  }
  
  render() {

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
      <div id="center-page">
        <Navbar />
        {guestCenterPage}
        <Footer />
      </div>
    );
  }
}

// CenterPage.propTypes = {
//   getCenters: PropTypes.func.isRequired
//  }

export default CenterPage;