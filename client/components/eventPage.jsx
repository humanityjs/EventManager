import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { getCenters, getCenterSelected } from '../actions/centerActions';
import { getEventSelected } from '../actions/eventActions';
import AddEventForm from './eventPage/addEventForm.jsx';
import Modal from './flash/modal';

@connect((store) => {
  return {
    auth: store.auth,
    centers: store.center.centers,
    center: store.center,
    event: store.event,
  }
})

export default class Event extends React.Component {
  
  
  componentWillMount() {
    this.props.dispatch(getCenters());
    this.props.dispatch(getCenterSelected(this.props.center.centerSelected));
    if (this.props.path == '/modify-event') {
      const id = this.props.event.eventSelected;
      this.props.dispatch(getEventSelected(id));
    }
  }

  componentDidUpdate() {
    if (this.props.event.status === 201) {
      alert(this.props.event.message);
    }
  }

  render() {
    if (this.props.event.status === 201) {
      return (<Redirect to="/dashboard" />);
    }
    const message = this.props.event.message;
    const { path } = this.props;
    const center = this.props.center.center;
    let centerInfo;
    if (isEmpty(center)) {
      centerInfo = (
        <div className="form-inner">
          <div className="media largeIcon">
            <i className="fa fa-home"><h2>Select a center</h2></i>
          </div>
        </div>
      )
    } else {
      centerInfo = (
        <div className="form-inner">
          <img className="img" src={center.image_url}/>
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
                    <AddEventForm path={path}/>
                  </div>
                </div>
              </div>
              <span data-toggle="modal" data-target="#event">Modal</span>
              <Modal message={message}/>
            </div>
          </div>
        </div>
      
    )
  }
}

