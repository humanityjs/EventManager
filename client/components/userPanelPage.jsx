import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import { getEvents } from '../actions/eventActions';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

@connect((store) => {
  return {
    user: store.auth.user,
    events: store.event.events,
  };
})

export default class EventPage extends React.Component {

  componentWillMount() {
    this.props.dispatch(getEvents());
  }
  
  render() {
    if (!this.props.user.isAuth) {
      <Redirect to="/" />
    }
    const content = _.map(this.props.events, (event) => {
      return (
        <div className="row" key={event.id}>
          <div className="col-lg-3">
            <div className="media">
              <img className="img" src="images/image2.jpg"/>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="media-body">
              <h2 className="media-heading">
                <span onClick={this.onClick} id={event.id}>{event.eventTitle} </span>
              </h2>
              <div className="col-lg-9">
                <h3><span>Location: </span> {event.Center.location}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>facilities: </span> {event.Center.facilities}</h3>
              </div>
              <div className="col-lg-9">
                <h3><span>description: </span> {event.description}</h3>
              </div>
            </div>
            <span className="trash"><i className="fa fa-user-circle"></i></span>
          </div>
        </div>
      )
    });
    return (
        <div id="event-page">
          <Navbar />
          {content}
          <Footer />
        </div>
    );
  }
}

