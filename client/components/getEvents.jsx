import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';


class DisplayEvents extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    this.props.getUserEvents().then((response) => {
      this.setState({
        events: response.data.events,
      });
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

DisplayEvents.propTypes = {
  getUserEvents: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default DisplayEvents;