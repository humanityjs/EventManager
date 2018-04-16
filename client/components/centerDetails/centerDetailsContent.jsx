import React from 'react';
import { connect } from 'react-redux';
import { getCenterSelected, modifyCenter, clearState } from '../../actions/centerActions';
import { getEventSelected, modifyCenterEvent, deleteCenterEvent, getCenterEvents } from '../../actions/eventActions';
import ModalContent from '../modalContent';
import CenterForm from '../addCenterForm';
import DeleteModal from '../deleteModal';
import Modal from '../flash/modal';
import UploadImage from '../imageUpload';


@connect((store) => {
  return {
    center: store.center,
    event: store.event,
    events: store.event.centerEvents,
    message: store.event.message,
  };
})

export default class CenterDetailsContent extends React.Component {
  constructor(props) {
    super(props);
    const {
      centerName,
      location,
      description,
      capacity,
      imageUrl,
      facilities, 
      id } = props.center.center;

    this.state = {
      centerName: centerName || '',
      location: location || '',
      facilities: facilities.join() || '',
      description: description || '',
      capacity: capacity || '',
      errors: '',
      event: '',
      imageUrl: imageUrl || '',
      id: id || '',
    }
    this.initialState = this.state;
    this.onClick = this.onClick.bind(this);
    this.onAttend = this.onAttend.bind(this);
    this.showHiddenDiv = this.showHiddenDiv.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(e) {
    if (this.props.center.message) {
      this.props.dispatch(clearState());
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  onSubmit(e) {
    if (this.state != this.initialState) {
      this.props.dispatch(modifyCenter(this.state, this.state.id));
    }
    this.showHiddenDiv(e);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.center.center !== this.props.center.center) {
      const {
        centerName,
        location,
        facilities,
        description,
        capacity,
        imageUrl,
        id
      } = nextProps.center.center;
      this.setState({
        centerName: centerName || '',
        location: location || '',
        facilities: facilities.join() || '',
        description: description || '',
        imageUrl: imageUrl || '',
        capacity: capacity || '',
        id: id || '',
      })
    }
  }
  componentDidUpdate() {
    if (this.props.event.status === 201 || this.props.event.status === 200 || this.props.center.status === 200) {
      $(document).ready( function(){
        $('#eventStatus').modal('hide');
        $('#deleteModal').modal('hide');
      });
    }
  }

  onClick(e) {
    this.props.dispatch(getEventSelected(e.target.id, 'tag'));
  }

  onAttend(e) {
    const {
      id,
      eventTitle,
      userId
    } = this.props.event.event;
    const centerId = this.props.center.center.id;
    if (e.target.id === "approve") {
      const data = {
        eventTitle: eventTitle,
        centerId,
        isApproved: 'TRUE',
        id,
        userId,
        text: 'approved',
        reason:'',
        suggestion:'',
      }
      this.props.dispatch(modifyCenterEvent(data));
    } else {
      const data = {
        eventTitle: event.eventTitle,
        centerId: event.centerId,
        id: event.id,
        text: 'disapproved',
      }
      this.props.dispatch(deleteCenterEvent(data));
    } 
  }

  showHiddenDiv(e) {
    let id = e.target.dataset.toggleId;
    if(!id) return;
    const div = document.getElementById(id);
    div.hidden = !div.hidden;
    if (id === 'editCenterDetails') {
      const div2 = document.getElementById('centerDetails');
      if (!div.hidden) {
        return div2.style.display="none";
      }
      return div2.style.display="";
    } 
  }  
  

  render() {
    const { center } = this.props.center;
    const {
      centerName,
      location,
      facilities,
      description,
      imageUrl,
      capacity,
      errors
    } = this.state;
    const { path } = this.props;
    const { event } = this.props.event;
    const events = _.map(this.props.events, (event) => {
      let eStatus;
      if (event.isApproved == true) {
        eStatus = <i id={event.id} className="fa fa-thumbs-up green"></i>
        } else {
          eStatus = <span onClick={this.onClick} data-toggle="modal" data-target="#eventStatus" id={event.eventTitle}><i id={event.id} className="fa fa-spinner main-color"></i></span>;
        }
      return (
      <tr id={event.id} key={event.id}>
        <td><span id={event.id} onClick={this.onClick} data-toggle="modal" data-target="#eventStatus">{event.eventTitle}</span></td>
        <td>{event.bookedDate}</td>
        <td>{eStatus}</td>
        <td><span onClick={this.onClick} data-toggle="modal" data-target="#deleteModal"><i id={event.id} className="fa fa-trash trash"></i></span></td>				
      </tr>
      )
    });
    let message;
    if (this.props.event.status === 201) {
      message = "Approved";
    } else if (this.props.event.status === 200) {
      message = this.props.event.message;
    } else if (this.props.center.status === 200) {
      message = this.props.center.message;
    }
    return (
      <div id="center-event">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 card bb text-center pt-4 pb-4">
              <div id="centerDetails">          
                <div className="imageUpload">
                  <img className="img-fluid dropzone" src={imageUrl}/>
                </div>
                <div className="media-body text-center mb-4 mt-4">
                  <strong className="logo text-primary mb-2">{centerName}</strong>
                  <h3 className="mt-2">location</h3>
                  <p>{location}</p>
                  <h3 className="mt-2">capacity</h3>
                  <p>{capacity}</p>
                  <h3 className="mt-2">facilities</h3>
                  <p>{facilities}</p>
                  <h3 className="mt-2">description</h3>
                  <p>{description}</p>
                </div>  
                ... <i data-toggle-id="editCenterDetails" className="fa fa-pencil main-color" onClick={this.showHiddenDiv}> edit</i>	
              </div>
              <div id="editCenterDetails" hidden>
                <UploadImage path={this.props.path} uploadedImage={imageUrl}/>
                <div className="media-body text-center mb-4">
                  <form id="edit-center-form">
                    <div>
                      <input type="text" value={centerName} id='centerName' onChange={this.onChange} className="logo text-primary text-center no-border"/>
                    <border></border>
                    </div>
                    <h3 className="mt-2">location</h3>
                    <div>
                      <input type="text" value={location} id='location' onChange={this.onChange} className="text-center no-border mt-0 "/>
                    <border></border>
                    </div>
                    <h3 className="mt-2">capacity</h3>
                    <div>
                      <input type="text" value={capacity} id='capacity' onChange={this.onChange} className="text-center no-border mt-0 "/>
                    <border></border>
                    </div>
                    <h3 className="mt-2">facilities</h3>
                    <div>
                      <input type="text" value={facilities} id='facilities' onChange={this.onChange} className="text-center no-border mt-0 "/>
                    <border></border>
                    </div>
                    <h3 className="mt-2">description</h3>
                    <div>
                      <input type="text" value={description} id='description' onChange={this.onChange} className="text-center no-border mt-0 "/>
                    <border></border>
                    </div>
                    <input type="button" data-toggle-id="editCenterDetails" className="btn btn-sm btn-success p-1 mr-1" onClick={this.onSubmit} value="save"/>
                    <input type="button" data-toggle-id="editCenterDetails" className="btn btn-sm btn-danger p-1 ml-1" onClick={this.showHiddenDiv} value="cancel"/>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
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
                            <i className="fa fa-spinner main-color"></i><br/>
                            <span>Pending</span>
                          </td>
                          <td></td>
                          <td></td>
                          <td>
                            <i className="fa fa-thumbs-up green"></i><br/>
                            <span>Approved</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal hide" id="eventStatus">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="form-inner text-center">
                    <div className="form-inner">
                      <i id="approve" className="fa fa-thumbs-up green" onClick={this.onAttend}></i>
                      <i data-toggle-id="disapprove" className="fa fa-thumbs-down trash" onClick={this.showHiddenDiv}></i>
                      <br/>
                      <span><br/>Approve</span>
                      <span><br/>Disapprove</span>
                      <div id="disapprove" hidden>
                    
                        <p> Disapproved event will be deleted. Are you sure you want to disapprove event?</p>
                        <div class="form-group">
                          <textarea class="form-control" id="comment" onChange={this.onChange} placeholder="Give reasons for disapproving this event" value={this.state.comment}></textarea>
                        </div>
                        <i id="disapprove" className="fa fa-trash trash" onClick={this.onAttend}></i>
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
            <DeleteModal path={path}/>
            <Modal message={message}/>
          </div>
        </div>
      </div>
    )
  }
}
