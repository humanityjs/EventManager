import React from 'react';
import { connect } from 'react-redux';
import { getCenterSelected } from '../../actions/centerActions';
import { getEventSelected, modifyEvent } from '../../actions/eventActions';

@connect((store) => {
  return {
    center: store.center,
    user: store.auth.user,
    event: store.event.event,
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
    this.show = this.show.bind(this);
  }

  onClick(e) {
    this.props.dispatch(getEventSelected(e.target.id));
  }


  onAttend(e) {
    const data = {
      eventTitle: this.props.event.eventTitle,
      description: this.props.event.description,
      centerId: this.props.event.centerId,
      bookedDate: this.props.event.bookedDate,
      isApproved: 'TRUE',
    }
    this.props.dispatch(modifyEvent(this.props.event.id, data));
    e.preventDefault();
  }

  show() {
    if(!disapprove) return;
    const div = document.getElementById('disapprove');
    div.hidden = !div.hidden;
  }

  center() {
    const { center } = this.props.center;
    const events = _.map(this.props.center.center.Events, (event) => {
      return (
      <tr id={event.id} key={event.id}>
        <td><span id={event.id} onClick={this.onClick} data-toggle="modal" data-target="#myModal">{event.eventTitle}</span></td>
        <td>{event.bookedDate}</td>
        <td><i class="fa fa-check-square-o"></i></td>
        <td><i class="fa fa-trash"></i></td>				
      </tr>
      )
    });
    return (
      <div class="container">
        <div class="row">
  	 	    <div class="col-lg-5">
            <div class="form-outer text-center">
              <div class="form-inner">
                <div className="media">
                  <img className="img" src="images/image2.jpg"/>
                </div>
                <strong class="logo text-primary">{center.centerName}</strong>
                <p>{center.location}</p>
                <h3>facilities</h3>
                <p>{center.facilities}</p>
                <h3>description</h3>
			          <p>{center.description}</p>	
              </div>
            </div>
          </div>
          <div class="col-lg-7">
	 	        <div class="form-outer text-center d-flex align-items-center">
              <div class="form-inner">
                <strong class="logo text-primary">events scheduled</strong>
                <div class="earnings">
                  <table cellPadding="0" class="table table-responsive table-hover text-center">
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="form-inner text-center">
                  <div class="form-inner">
                    <p>{this.props.event.eventTitle}</p>
                    <i class="fa fa-thumbs-up"><span onClick={this.onAttend}><br/>Approve</span></i>
                    <i class="fa fa-thumbs-down"><span onClick={this.show}><br/>Disapprove</span></i>
                    <div id="disapprove" hidden>
                      <span className="help-block">Click this! <i class="fa fa-thumbs-down"><span id="false" onClick={this.onAttend}><br/>Disapprove</span></i> if you are sure you want to disapprove event</span>
                      <br/>
                      <button class="btn btn-success" onClick={this.show}>cancel</button>
                    </div>

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
  }

  render() {
    return (
      <div>
      { this.center() }
      </div>
    )
  }
}
