import React from 'react';
import { connect } from 'react-redux';
import { deleteCenterEvent, deleteEvent } from '../actions/eventActions';
import { deleteCenter } from '../actions/centerActions';

@connect((store) => {
  return {
    center: store.center,
    user: store.auth.user,
    event: store.event,
    events: store.event.events,
    message: store.event.message,
  };
})
export default class DeleteModal extends React.Component {
  onAttend(e) {
    if (this.props.path === '/dashboard') {
      this.props.dispatch(deleteEvent(this.props.event.eventSelected));
    } else if (this.props.path === '/admin-centers') {
      const centerId = this.props.center.centerSelected;
      this.props.dispatch(deleteCenter(centerId));
    } else {
      const centerId = this.props.center.centerSelected;
      this.props.dispatch(deleteCenterEvent(this.props.event.id, centerId));
    }
  }
  onCancel() {
      $(document).ready( function(){
        $('#deleteModal').modal('hide');
      });
  }
  render() {

    return (
      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="form-inner text-center">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}