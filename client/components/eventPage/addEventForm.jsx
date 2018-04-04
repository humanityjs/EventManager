import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { getCenters, getCenterSelected } from '../../actions/centerActions';
import { createEvent, getCenterEvents , modifyEvent } from '../../actions/eventActions';
import TextField from '../../common/textField';
import CenterSearch from '../centerSearch';
import DatePicker from '../datePicker';
import { addEventValidation, modifyEventValidation } from '../../shared/eventValidations';



@connect((store) => {
  return {
    auth: store.auth,
    centers: store.center.centers,
    center: store.center.center,
    dates: store.event.disableDates,
    event: store.event,
  }
})

export default class AddEventForm extends React.Component {
  constructor() {
    super();
    this.state = {
      eventTitle: '',
      bookedDate: '',
      description: '',
      errors: {},
      isLoading: false,
      centerId: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.search = this.search.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  
  componentDidUpdate() {

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() + 1;
    let currentDate = `${year}-${month}-${day}`;
    
    <script>
      $(document).ready( function() {
        $('#bookedDate').datepicker({
          format:'yyyy-mm-dd',
          autoclose:true,
          startDate: currentDate,
        })
      });
    </script>
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    
    if (e.target.id === 'centerId') {
      this.setState({
        centerId: e.target.value
      });
      this.props.dispatch(getCenterSelected(e.target.value));
  
    }

  }

  isValid() {
    if (this.props.path === '/modify-event') {
      const { errors, isValid } = modifyEventValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      return isValid;
    } else {
      const { errors, isValid } = addEventValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      
      return isValid;
    }
  }

  search() {
    this.props.dispatch(getCenters(this.state));
  }

  onSubmit(e) {
    e.preventDefault();
    let data = {
      eventinfo: this.state,
      centerId:this.state.centerId,
      user: this.props.auth.user.fullname,
      centername: this.props.center.centerName,
      eventTitle: this.state.eventTitle,
      userId: this.props.auth.user.id,
      reason: '',
      suggestion: '',
      text: '',
    }
    
    let id = document.getElementById('bookedDate');
    this.state.bookedDate = id.value;
    if (this.props.path === '/modify-event') {
      const { event } = this.props.event;
      if (isEmpty(this.state.bookedDate)) {
        this.state.bookedDate = event.bookedDate;
      }
      if (isEmpty(this.state.centerId)) {
        this.state.centerId = event.centerId;
      }
      if (isEmpty(this.state.eventTitle)) {
        this.state.eventTitle = event.eventTitle;
      }
      this.state.isApproved = event.isApproved;
        if (!isEmpty(this.state.description) || !isEmpty(this.state.eventTitle)
      || !isEmpty(this.state.bookedDate) || !isEmpty(this.state.centerId)) {
        if (this.isValid()) {
          this.props.dispatch(modifyEvent(this.props.event.event.id, this.state. this.state.centerId));
        }
      }      
    } else {
      if (this.isValid()) {
        this.props.dispatch(createEvent(data));
      }
    }
  }

  render() {
    const { event } = this.props.event;
    let buttonValue;
    if (this.props.path === '/modify-event') {
      buttonValue = "save changes";
    } else {
      buttonValue = "add event";
    }

    let titleHolder, dateHolder, descriptionHolder;
    if (this.props.path === '/modify-event') {
      titleHolder = event.eventTitle;
      dateHolder = event.bookedDate;
      descriptionHolder = event.description;
    } else {
      titleHolder = "Give your event a title";
      dateHolder = "Choose a date for your event";
      descriptionHolder = "Write few things about the event";
    }
    const { eventTitle, bookedDate, description, errors, isLoading, centerId } = this.state;
    const showCenters = _.map(this.props.centers, (center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    
    return (
      <div>        
        <form id="add-event-form" onSubmit={this.onSubmit}>
          <span className="help-block">{this.props.event.error}</span>
          <CenterSearch />
          <p className="subtitle">select your preferred event center</p>
          <div className="form-group">
            <select className="form-control" defaultValue={this.state.centerId} id="centerId" onChange={this.onChange}>            
              <option value="">Select Center</option>
              {showCenters}
            </select>
          </div>

          <span className="help-block">{errors.bookedDate}</span>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <i className="fa fa-calendar"></i>
              </span>
              <input type="text" id="bookedDate" onBlur={this.onChange} class="form-control" value={this.state.bookedDate} placeholder={dateHolder}/>
            </div>
          </div>

          <span className="help-block">{errors.eventTitle}</span>
          <div class="form-group">   
            <div class="input-group">
              <span class="input-group-addon">
                <i className="fa fa-microphone"></i>
              </span> 
              <input type="text" id="eventTitle" onChange={this.onChange} class="form-control" value={this.state.eventTitle} placeholder={titleHolder}/>
            </div>
          </div>
          <span className="help-block">{errors.description}</span>
          <p className="subtitle">describe your event in few words</p>
          <div className="form-group">
            <textarea className="form-control" id="description"
          onChange={this.onChange} placeholder={descriptionHolder}></textarea>
          </div> 
          <input id="add-event" type="submit" value={buttonValue} className="btn btn-primary"/>
        </form> 
      </div>
    )
  }
}

  // onFocus(e) {
  //   let disableDates = _.map(this.props.center.Events, (event) => {
  //     return (
  //       event.bookedDate
  //     );
  //   });
  //   this.setState({
  //     date: disableDates,
  //   })
  // }
{/* <div class="form-group">
            <button onClick={this.onClick.bind(this)}>Click Me</button>    
          </div>

          <div class="form-group">
      <label for="name">Date</label>    
      <input type="text" id={calendar} onFocus={this.onFocus.bind(this)} onClick={this.onClick.bind(this)} data-date={this.state.centerId} name="date" class="form-control"/>
    </div> */}

    {/* <div class="form-group">
      <label for="name">Date2</label>    
      <input type="text" id="date2" onFocus={this.onFocus.bind(this)} onClick={this.onClick.bind(this)} data-date={this.state.centerId} name="date" class="form-control"/>
    </div> */}
          {/* <TextField
          id='date'
          value={this.state.date}
          placeholder='choose date'
          type='text'
          error={errors.date}
          onMouseout={this.onClick.bind(this)} /> */}

          // let calendar = `date${this.state.centerId}`;
    // console.log(calendar);

    //   onClick(e) {
//     e.preventDefault();
//     let id = e.target.dataset.date;
//     let calendar = e.target.id;
//     let id2 = this.props.dates;
//     console.log(`center = ${id}`);
//     console.log(id2, calendar);


//   <script>
//     if ( id === '1') {
// function loadDate(id2){
  
//   $('#date1').datepicker({
//     format:'yyyy-mm-dd',
//     autoclose:true,
//     datesDisabled: id2,
//   })
// }
//     }
// if ( id === '2') {
//   function loadDate(id2){
    
//     $('#date2').datepicker({
//       format:'yyyy-mm-dd',
//       autoclose:true,
//       datesDisabled: id2,
//     })
//   }
// }
    
// </script>
    
//     // if ( id === '2') {
//     //  <script>
//     //   function loadDate(id2){
        
//     //     $('#date2').datepicker({
//     //       format:'yyyy-mm-dd',
//     //       autoclose:true,
//     //       datesDisabled: id2,
//     //     })
//     //   }
       
//     //  </script>
//     // }
//   }