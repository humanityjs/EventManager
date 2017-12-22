import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import './center.css';



class displayevents extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    axios.get('api/v1/events').then((response) => {
      this.setState({
        events: response.data.events
      })
    });
  }

  render() {
    const events = _.map(this.state.events, (event) => {
      return (
        <div class="form-outer text-center" key={event.id}>
          <div class="inner-img">
            <img src="images/image2.jpg" class="img"/>
          </div>
          <h3><a href="#" data-toggle="modal" data-target="#myModal">{event.eventTitle}</a></h3>
          <p><span>Venue: </span> {event.Center.centerName}</p>
          <p><span>Date: </span> {event.bookedDate}</p>
          <p><span>Description: </span> {event.description}</p>
          <span className="edit"><i className="fa fa-user-circle"></i></span>
          <span className="trash"><i className="fa fa-user-circle"></i></span>
        </div>
      )
    });

    return (
      <div className="container">
        {events}
      </div>
    );
  }
}

export default displayevents;