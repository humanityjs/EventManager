import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Link } from 'react-router-dom';

import { getEvents, eventSelected } from '../actions/eventActions';
import EventForm from '../components/eventPage/editEventForm';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import FlashMessageList from './flash/flashMessagesList';
import DeleteModal from './deleteModal';
import { centerSelected } from '../actions/centerActions';
import Modal from './flash/modal';
import { logout } from '../actions/signInActions';

@connect((store) => {
  return {
    auth: store.auth,
    events: store.event.userEvents,
    event: store.event,
  };
})

export default class Dashboard extends React.Component {

  componentWillMount() {
    this.props.dispatch(getEvents()); 
  }
  
  onClick(e) {
    let child = document.getElementById(e.target.id);
    let parent = child.parentNode;
    this.props.dispatch(eventSelected(e.target.id));
    this.getCenter(parent.id);
  }

  getId(e) {
    this.props.dispatch(eventSelected(e.target.id));
  }

  getCenter(id) {
    this.props.dispatch(centerSelected(id));
  }

  componentDidUpdate() {
    if (this.props.event.status === 200) {
      $(document).ready( function(){
        $('#deleteModal').modal('hide');
        $('#event').modal('show');
      });
      setTimeout(() => {
        $('#event').modal('hide');
      },3000)
    }
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

  logout(e) {
    this.props.dispatch(logout());
  }
  
   
  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (this.props.event.status === 401) {
      this.logout();
    }
    
    if (isEmpty(this.props.event)) {
      const content = (
        <div className="form-inner">
          <div className="media largeIcon">
            <img src="images/image2.jpg" className="img" />
          </div>
        </div>
      );
    }
    const message = this.props.event.message;
    let eventId, editEventId, eventBody, form;
    const { pathname } = this.props.location;
    const content = _.map(this.props.events, (event) => {
      eventBody = `event-body${event.id}`;
      eventId = `eventDetails${event.id}`;
      editEventId = `editEventDetails${event.id}`;
      form = `form${event.id}`;
      let dateBooked = `date${event.id}`;
      return (
        <div className="center">
          <div id={eventId} key={eventId}>
            <div className="col-lg-4">
              <div class="form-outer text-center">
                <div class="form-inner">
                  <div id={event.centerId}>
                    <img className="img" src="images/image2.jpg"/>
                    <h2>
                      <span className="media-heading" data-toggle-id={eventBody} onClick={this.showHiddenDiv}>
                        {event.eventTitle} 
                      </span>
                    </h2>
                    <Link to="/modify-event" id={event.centerId}><span onClick={this.onClick.bind(this)} id={event.id}>edit</span></Link>
                  </div>
                  <div id={eventBody} hidden>
                    <div className="media-body">
                        <h3><span>Date: </span> {event.bookedDate}</h3>
                        <h3><span>Center: </span> {event.Center.centerName}</h3>
                        <h3><span>Capacity: </span> {event.Center.capacity}</h3>
                        <h3><span>Location: </span> {event.Center.location}</h3>
                        <h3><span>facilities: </span> {event.Center.facilities}</h3>
                        <h3><span>Event description: </span> {event.description}</h3>
                    </div>
                  </div>
                  <i id={eventId} data-toggle-id={editEventId} className="fa fa-pencil main-color edit" onClick={this.showHiddenDiv}></i>
                  <span onClick={this.getId.bind(this)} className="trash" data-toggle="modal" data-target="#deleteModal"><i id={event.id} className="fa fa-trash trash"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id={editEventId} key={form} hidden>
            <div class="form-outer text-center">
              <div class="form-inner">
                <i className="fa fa-list-alt main-color"></i><br/>
                <span className="media-heading" data-toggle-id={eventBody} onClick={this.showHiddenDiv}>
                  {event.eventTitle} 
                </span>
                <EventForm id={event.id} title={event.eventTitle} description={event.description} isApproved={event.isApproved} date={event.bookedDate} center={event.Center.id}/> 
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
          <div className="container">
            <div className="row">
              {content}
              <DeleteModal path={pathname}/>
              <Modal message={message}/>
            </div>
          </div>
          <Footer />
        </div>
    );
  }
}

