import React from 'react';
import { Link, Redirect, browserHistory } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getCenters, centerSelected } from '../actions/centerActions';
import DeleteModal from './deleteModal';
import { getActivity } from '../actions/activityActions';

// const store = reduxStore();
@connect((store) => {
  return {
    center: store.center,
    auth: store.auth,
    activity: store.activity,
  };
})

export default class DisplayCenters extends React.Component {

  componentWillMount() {
    this.props.dispatch(getCenters());
    this.props.dispatch(getActivity());
  }

  onClick(e) {
    const center = {
      centerId: e.target.id,
      centerName: e.target.parentNode.id,
    }
    this.props.dispatch(centerSelected(center));
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
    const { activities } = this.props.activity;

    const recentActivity = _.map(activities,  (activity) => {
      return (
        <div className="row ml">
          <Link to="/view-center-event"><span onClick={this.onClick.bind(this)} id={activity.centerId}>{activity.description}</span></Link>
        </div>
      )
    })
    const adminCenter = _.map(centers, (center) => {
      return (
        <div className="row bw" key={center.id}>
          <div className="col-lg-4 col-md-12 col-sm-12 text-center">
            <img className="img-fluid" src={center.image_url}/>
          </div>
          <div className="col-8 col-md-8 col-sm-12 pl-4">

              <h2 className="media-heading text-center">
                <Link to="/view-center-event"><span onClick={this.onClick.bind(this)} id={center.id}>{center.centerName}</span></Link>
              </h2>

                <h3><span>Location: </span> {center.location}</h3>


                <h3><span>capacity: </span> {center.capacity}</h3>
 

                <h3><span>facilities: </span> {center.facilities}</h3>


                <h3><span>description: </span> {center.description}</h3>

          </div>
          <span onClick={this.onClick.bind(this)} className="trash p-2" data-toggle="modal" data-target="#deleteModal"id={center.centerName}><i id={center.id} className="fa fa-trash trash"></i></span>      
        </div>
      )
    }); 
    const adminCenterPage = (
      <div className="row">
        <div className="col-lg-9">
          {adminCenter}
        </div>
        <div className="col-lg-3">
          {recentActivity}
        </div>
      </div>
    )
    const guestCenterPage = _.map(centers, (center) => {
      return (
        <div className="row" id={center.id} key={center.id}>
          <div className="col-lg-4 col-md-12 col-sm-12 text-center">

              <img className="img" src={center.image_url}/>

          </div>
          <div className="col-8 col-md-8 pl-4">
              <h2 className="media-heading text-center">{center.centerName}</h2>

                <h3><span>Location: </span> {center.location}</h3>


                <h3><span>capacity: </span> {center.capacity}</h3>
 

                <h3><span>facilities: </span> {center.facilities}</h3>


                <h3><span>description: </span> {center.description}</h3>
          </div>
        </div>
      )
    });

    return (
      <div>
        { this.props.auth.user.isAdmin ? adminCenterPage : guestCenterPage }
        <DeleteModal path={path}/>
      </div>
    );
  }
}


