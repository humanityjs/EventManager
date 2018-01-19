import React from 'react';
import { Link, Redirect, browserHistory } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getCenters, centerSelected } from '../actions/centerActions';
import DeleteModal from './deleteModal';

// const store = reduxStore();
@connect((store) => {
  return {
    center: store.center,
    auth: store.auth,
  };
})

export default class DisplayCenters extends React.Component {

  componentWillMount() {
    this.props.dispatch(getCenters());
  }

  onClick(e) {
    this.props.dispatch(centerSelected(e.target.id));
  }

  componentDidUpdate() {
    if (this.props.center.status === 200) {
      $(document).ready( function(){
        $('#deleteModal').modal('hide');
      });
    }
  }

  render() {
    const path = this.props.path;
    const { centers } = this.props.center;
    const adminCenterPage = _.map(centers, (center) => {
      return (
        <div className="row" key={center.id}>
          <div className="col-lg-3">
            <div className="media">
              <img className="img" src={center.image_url}/>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="media-body">
              <h2 className="media-heading">
                <Link to="/view-center-event"><span onClick={this.onClick.bind(this)} id={center.id}>{center.centerName}</span></Link>
              </h2>
              <div className="col-lg-9">
                <h3><span>Location: </span> {center.location}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>capacity: </span> {center.capacity}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>facilities: </span> {center.facilities}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>description: </span> {center.description}</h3>
              </div>
            </div>
          </div>
          <span onClick={this.onClick.bind(this)} className="trash" data-toggle="modal" data-target="#deleteModal"><i id={center.id} className="fa fa-trash trash"></i></span>      
        </div>
      )
    }); 
    
    const guestCenterPage = _.map(centers, (center) => {
      return (
        <div className="row" id={center.id} key={center.id}>
          <div className="col-lg-3">
            <div className="media">
              <img className="img" src={center.image_url}/>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="media-body">
              <h2 className="media-heading">{center.centerName}</h2>
              <div className="col-lg-9">
                <h3><span>Location: </span> {center.location}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>capacity: </span> {center.capacity}</h3>
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
        <DeleteModal path={path}/>
      </div>
    );
  }
}


