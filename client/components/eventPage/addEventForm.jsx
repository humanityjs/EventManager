import React from 'react';
import { connect } from 'react-redux';
import { getCenters, getCenterSelected } from '../../actions/centerActions';
import { createEvent, getCenterEvents } from '../../actions/eventActions';
import TextField from '../../common/textField';
import CenterSearch from '../centerSearch';
import DatePicker from '../datePicker';
import { addEventValidation } from '../../shared/eventValidations';



@connect((store) => {
  return {
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

  componentWillUpdate() {
  <script>
  $(document).ready( function() {
    $('#date').datepicker({
      format:'yyyy-mm-dd',
      autoclose:true,
      startDate: '2018-01-01',
      datesDisabled: this.state.date,
    })
  });
</script>
  }
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
onClick(e) {
  console.log(e.target.id, e.target.value)
  this.setState({
    [e.target.id]: e.target.value
  });
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
      this.props.dispatch(getCenterEvents(e.target.value));
    }

  }
  isValid() {
 
    const { errors, isValid } = addEventValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
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
  search() {
    this.props.dispatch(getCenters(this.state));
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(createEvent(this.state));
    }
  }

  render() {
    // let calendar = `date${this.state.centerId}`;
    // console.log(calendar);
    const { eventTitle, bookedDate, description, errors, isLoading, centerId } = this.state;
    const showCenters = _.map(this.props.centers, (center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    
    return (
     
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

<div class="form-group">
      <label for="name">Date</label>    
      <input type="text" id="bookedDate" onChange={this.onChange} data-date={this.state.centerId} name="date" class="form-control" value={this.state.bookedDate}/>
    </div>

          <TextField
          id='eventTitle'
          value={this.state.eventTitle}
          placeholder='give your event a title'
          type='text'
          error={errors.eventTitle}
          onChange={this.onChange} />
          <p className="subtitle">describe your event in few words</p>
          <div className="form-group">
            <textarea className="form-control" id="description" error={errors.title}
          onChange={this.onChange}></textarea>
          </div> 
          <input id="add-event" type="submit" value="Add Event" className="btn btn-primary"/>
        </form>
      
     
    )
  }
}
