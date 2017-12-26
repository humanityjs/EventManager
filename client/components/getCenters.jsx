import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './center.css';



class DisplayCenters extends React.Component {
  constructor() {
    super();
    this.state = {}
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.props.getCenters().then((response) => {
      this.setState({
        centers: response.data.centers,
      });
    });
  }

  

  onClick(e) {
    // centerSelected: this.props.centerSelected(e.target.id);
    // // this.context.router.history.push('/view-center-event');
  }

  render() {
    const adminCenterPage = _.map(this.state.centers, (center) => {
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

DisplayCenters.propTypes = {
  getCenters: PropTypes.func.isRequired,
  centerSelected: PropTypes.func.isRequired,
 }

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

// function mapDispatchToProps(dispatch) {
//   return dispatch({
//     centerSelected
//   });
// }

DisplayCenters.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(DisplayCenters);