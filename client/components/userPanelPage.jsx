import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect, Link } from 'react-router-dom';

import { getEvents, getEventSelected } from '../actions/eventActions';
import EventForm from '../components/eventPage/editEventForm';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import FlashMessageList from './flash/flashMessagesList';
import DeleteModal from './deleteModal';

@connect((store) => {
  return {
    auth: store.auth,
    events: store.event.events,
  };
})

export default class EventPage extends React.Component {

  componentWillMount() {
    this.props.dispatch(getEvents());
    
  }

  onClick(e) {
    this.props.dispatch(getEventSelected(e.target.id));
  }

  showHiddenDiv(e) {
    let id = e.target.dataset.toggleId;
    let id2 = e.target.id;
    if(!id) return;
    const div = document.getElementById(id);
    div.hidden = !div.hidden;
    if (id) {
      const div2 = document.getElementById(id2);
      if (!div.hidden) {
        return div2.style.display="none";
      }
      return div2.style.display="";
    } 
  }
   
  render() {
    let eventId, editEventId;
    if (!this.props.auth.isAuth) {
      <Redirect to="/" />
    }
    const { pathname } = this.props.location;
    const content = _.map(this.props.events, (event) => {
      eventId = `eventDetails${event.id}`;
      editEventId = `editEventDetails${event.id}`;
      return (
        <div>
          <div id={eventId}>
            <div className="row" key={event.id}>
              <div className="col-lg-3">
                <div className="media">
                  <img className="img" src="images/image2.jpg"/>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="media-body">
                  <h2 className="media-heading">
                    <span id={event.id}>{event.eventTitle} 
                      <i id={eventId} data-toggle-id={editEventId} className="fa fa-pencil main-color" onClick={this.showHiddenDiv}></i>
                    </span>
                  </h2>
                  <div className="col-lg-9">
                    <h3><span>Date: </span> {event.bookedDate}
                      <i id={eventId} data-toggle-id={editEventId} className="fa fa-pencil main-color" onClick={this.showHiddenDiv}></i>
                    </h3>
                  </div>
                  <div className="col-lg-9">
                    <h3><span>Center: </span> {event.Center.centerName}
                      <Link to="/modify-event"><i className="fa fa-pencil main-color"></i></Link>
                    </h3>
                    
                  </div>
                  <div className="col-lg-9">
                    <h3><span>Location: </span> {event.Center.location}</h3>
                  </div>
                  <div className="col-lg-9">
                    <h3><span>facilities: </span> {event.Center.facilities}</h3>
                  </div>
                  <div className="col-lg-9">
                    <h3><span>Event description: </span> {event.description}
                      <i id={eventId} data-toggle-id={editEventId} className="fa fa-pencil main-color" onClick={this.showHiddenDiv}></i>
                    </h3>
                  </div>
                </div>
                <span onClick={this.onClick.bind(this)} className="trash" data-toggle="modal" data-target="#deleteModal"><i id={event.id} className="fa fa-trash trash"></i></span>
              </div>
            </div>
          </div>
          <div id={editEventId} hidden>
            <div class="form-outer text-center">
              <div class="form-inner">
                <EventForm /> 
              </div>
              <i id={eventId} data-toggle-id={editEventId} className="fa fa-home main-color" onClick={this.showHiddenDiv}> home</i>
            </div>
          </div>
        </div>
      )
    });
    return (
        <div id="event-page">
          <Navbar />
          {content}
          <DeleteModal path={pathname}/>
          <Footer />
        </div>
    );
  }
}

