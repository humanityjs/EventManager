import React from 'react';
import { connect } from 'react-redux';
import { deleteCenterEvent, deleteEvent } from '../actions/eventActions';

@connect((store) => {
  return {
    center: store.center,
    user: store.auth.user,
    event: store.event.event,
    events: store.event.events,
    message: store.event.message,
  };
})
export default class DeleteModal extends React.Component {
  onAttend(e) {
    if (this.props.path === '/dashboard') {
      console.log(this.props.event)
      this.props.dispatch(deleteEvent(this.props.event.id));
    } else {
      const centerId = this.props.center.centerSelected;
      this.props.dispatch(deleteCenterEvent(this.props.event.id, centerId));
    }
  }
  render() {

    return (
      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="form-inner text-center">
              <div className="form-inner">
                <p className="text-primary">{this.props.event.eventTitle}</p>
                <span className="help-block">Are sure you want to delete event?</span>
                <br/>
                <i className="fa fa-trash red"  id="disapprove" onClick={this.onAttend.bind(this)}></i>
                <i className="fa fa-save green"></i>
                <br/>
                <span><br/>Yes</span>
                <span><br/>No</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}