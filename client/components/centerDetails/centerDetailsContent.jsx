import React from 'react';
import { connect } from 'react-redux';
import { getCenterSelected } from '../../actions/centerActions';
import { getEventSelected, modifyCenterEvent, deleteCenterEvent, getCenterEvents } from '../../actions/eventActions';
import ModalContent from '../modalContent';

@connect((store) => {
  return {
    center: store.center,
    user: store.auth.user,
    event: store.event.event,
    // events: store.center.centerEvents,
    events: store.event.events,
    message: store.event.message,
  };
})
export default class CenterDetailsContent extends React.Component {
  constructor() {
    super();
    this.state = {
      centerName:'',
      location:'',
      facilities:'',
      description:'',
      errors: {},
      event:{},
    }
    this.onClick = this.onClick.bind(this);
    this.onAttend = this.onAttend.bind(this);
    this.showHiddenDiv = this.showHiddenDiv.bind(this);
  }

  onClick(e) {
    this.props.dispatch(getEventSelected(e.target.id));
  }

  onAttend(e) {
    const centerId = this.props.center.centerSelected;
    if (e.target.id === "approve") {
      const data = {
        eventTitle: this.props.event.eventTitle,
        description: this.props.event.description,
        centerId: this.props.event.centerId,
        bookedDate: this.props.event.bookedDate,
        isApproved: 'TRUE',
      }
      this.props.dispatch(modifyCenterEvent(this.props.event.id, data, centerId));
    } else {
      this.props.dispatch(deleteCenterEvent(this.props.event.id, centerId));
    } 
  }

  showHiddenDiv(e) {
    
    let id = e.target.dataset.toggleId;
    if(!id) return;
    const div = document.getElementById(id);
    div.hidden = !div.hidden;
  }


  center() {
    const { center } = this.props.center;
    const events = _.map(this.props.events, (event) => {
      let eStatus;
      if (event.isApproved == true) {
        eStatus = <span onClick={this.onClick} data-toggle="modal" data-target="#eventStatus"><i id={event.id} className="fa fa-thumbs-up"></i></span>
        } else {
          eStatus = <span onClick={this.onClick} data-toggle="modal" data-target="#eventStatus"><i id={event.id} className="fa fa-spinner"></i></span>;
        }
      return (
      <tr id={event.id} key={event.id}>
        <td><span id={event.id} onClick={this.onClick} data-toggle="modal" data-target="#eventStatus">{event.eventTitle}</span></td>
        <td>{event.bookedDate}</td>
        <td>{eStatus}</td>
        <td><span onClick={this.onClick} data-toggle="modal" data-target="#deleteModal"><i id={event.id} className="fa fa-trash"></i></span></td>				
      </tr>
      )
    });
    return (
      <div className="container">
        <div className="row">
  	 	    <div className="col-lg-5">
            <div className="form-outer text-center">
              <div className="form-inner">
                <div className="media">
                  <img className="img" src="images/image2.jpg"/>
                </div>
                <strong className="logo text-primary">{center.centerName}</strong>
                <p>{center.location}</p>
                <h3>facilities</h3>
                <p>{center.facilities}</p>
                <h3>description</h3>
			          <p>{center.description}</p>	
              </div>
            </div>
          </div>
          <div className="col-lg-7">
	 	        <div className="form-outer text-center d-flex align-items-center">
              <div className="form-inner">
                <strong className="logo text-primary">events scheduled</strong>
                <div>
                  <table cellPadding="0" className="table table-responsive table-hover text-center">
                    <thead>
                      <tr>
                        <th>title</th>
                        <th>date</th>
                        <th>status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {events}
                      <tr>
                        <td>
                          <i className="fa fa-spinner"></i><br/>
                          <span>Pending</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <i className="fa fa-thumbs-up"></i><br/>
                          <span>Approved</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="eventStatus">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="form-inner text-center">
                  <div className="form-inner">
                    <p className="text-primary">{this.props.event.eventTitle}</p>
                    <i id="approve" className="fa fa-thumbs-up green" onClick={this.onAttend}></i>
                    <i data-toggle-id="disapprove" className="fa fa-thumbs-down red" onClick={this.showHiddenDiv}></i>
                    <br/>
                    <span><br/>Approve</span>
                    <span><br/>Disapprove</span>
                    <div id="disapprove" hidden>
                  
                      <p> Disapproved event will be deleted. Are you sure you want to disapprove event?</p>
                      <i id="disapprove" className="fa fa-trash red" onClick={this.onAttend}></i>
                      <i data-toggle-id="disapprove" className="fa fa-close" onClick={this.showHiddenDiv}></i>
                      <br/>
                      <span><br/>delete</span>
                      <span><br/>cancel</span>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="deleteModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="form-inner text-center">
                  <div className="form-inner">
                    <p className="text-primary">{this.props.event.eventTitle}</p>
                    <span className="help-block">Are sure you want to delete event?</span>
                    <br/>
                    <a href="#"><i className="fa fa-trash red"  id="disapprove" onClick={this.onAttend}></i></a>
                    <i className="fa fa-save green"></i>
                    <br/>
                    <span><br/>Yes</span>
                    <span><br/>No</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
  
  componentWillMount() {
    if (!this.props.user.isAdmin) {
      return (<Redirect to="/dashboard" />);
    }
    const id = this.props.center.centerSelected;
    this.props.dispatch(getCenterSelected(id));
    this.props.dispatch(getCenterEvents(id));
  }

  render() {
    return (
      <div id="center-event">
      { this.center() }
      </div>
    )
  }
}
