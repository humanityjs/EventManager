import React from 'react';
import { connect } from 'react-redux';
import { deleteCenterEvent, deleteEvent, clearEventState } from '../actions/eventActions';
import { deleteCenter } from '../actions/centerActions';
import { getUserEmail, sendMail } from '../actions/signInActions';


@connect((store) => {
  return {
    center: store.center,
    user: store.auth.user,
    event: store.event,
    events: store.event.events,
    message: store.event.message,
    auth: store.auth,
  };
})
export default class DeleteModal extends React.Component {
  constructor() {
    super(); 
    this.state = {
      reason:'',
      suggestion: '',
    }
    this.onChange = this.onChange.bind(this);
  }
  onAttend(e) {
    if (this.props.path === '/dashboard') {
      this.props.dispatch(deleteEvent(this.props.event.eventSelected));
    } else if (this.props.path === '/admin-centers') {
      const centerId = this.props.center.centerSelected;
      this.props.dispatch(deleteCenter(centerId));
    } else {
      const { event } = this.props.event;
      const data = {
        eventTitle: event.eventTitle,
        centerId: event.centerId,
        id: event.id,
        text: 'deleted',
        userId: event.userId,
        reason: this.state.reason,
        suggestion: this.state.suggestion,
      }
      this.props.dispatch(getUserEmail(event.userId));
      this.props.dispatch(deleteCenterEvent(data));
    }
  }
  componentDidUpdate() {
    if (this.props.event.message === 'Event Deleted') {
      const { event } = this.props.event;
      const { center } = this.prop.center;
      const title = 'Event Disapproved';
      const message = `We are sorry to tell you that your event booking, "${event.eventTitle}" has been disapproved due to the reason(s) shown below
      <br/>
      <b>Event: ${event.eventTitle}</b> <br/>
      <b>Date: ${event.bookedDate}</b> <br/>
      <b>Center: ${center.centerName}</b> <br/>
      <b> Reasons </b><br/>
      ${this.state.reason}
      <br/>
      <b>Suggestions</b><br/>
      ${this.state.suggestion} <br/>
      Best Regards
      ${this.props.user.fullname}`;
      this.props.dispatch(sendMail(title, message, this.props.auth.email));
      this.props.dispatch(clearEventState());
    }
  }
  onCancel() {
      $(document).ready( function(){
        $('#deleteModal').modal('hide');
      });
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  render() {
    let content;
    if (this.props.path === '/view-center-event') {
      content = (
        <div className="form-inner">
          <p className="text-primary">{this.props.event.event.eventTitle}</p>
          <span className="help-block">Are sure you want to delete event?</span>
          <br/><br/>
          <div class="form-group">
              <textarea class="form-control" id="reason" onChange={this.onChange} placeholder="Give reasons for disapproving this event" value={this.state.reason}></textarea>
            </div>
            <div class="form-group">
              <textarea class="form-control" id="suggestion" onChange={this.onChange} placeholder="Suggestions" value={this.state.suggestion}></textarea>
            </div>
          <i className="fa fa-trash red"  id="disapprove" onClick={this.onAttend.bind(this)}></i>
          <i className="fa fa-save green" onClick={this.onCancel.bind(this)}></i>
          <br/>
          <span><br/>Yes</span>
          <span><br/>No</span>
        </div>
      );
    } else {
      content = (
        <div className="form-inner">
          <p className="text-primary">{this.props.event.event.eventTitle}</p>
          <span className="help-block">Are sure you want to delete event?</span>
          <br/>
          <i className="fa fa-trash red"  id="disapprove" onClick={this.onAttend.bind(this)}></i>
          <i className="fa fa-save green" onClick={this.onCancel.bind(this)}></i>
          <br/>
          <span><br/>Yes</span>
          <span><br/>No</span>
      </div>
      );
    }
    return (
      <div className="modal hide" id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="form-inner text-center">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}