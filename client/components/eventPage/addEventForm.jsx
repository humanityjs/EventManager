import React from 'react';
import { connect } from 'react-redux';
import { getCenters, getCenterSelected } from '../../actions/centerActions';
import { createEvent, getCenterEvents } from '../../actions/eventActions';
import TextField from '../../common/textField';
import CenterSearch from '../centerSearch';
import DatePicker from '../datePicker';

@connect((store) => {
  return {
    centers: store.center.centers,
    center: store.center.center,
  }
})

export default class AddEventForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      date: '',
      description: '',
      errors: {},
      isLoading: false,
      centerId: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillUpdate() {
//     console.log(this.state.date);
//   <script>
//   $(document).ready( function() {
//     $('#date').datepicker({
//       format:'yyyy-mm-dd',
//       autoclose:true,
//       startDate: '2018-01-01',
//       datesDisabled: this.state.date,
//     })
//   });
// </script>
  }
  onClick(e) {
    e.preventDefault();
    console.log("me")
    return <DatePicker />
    
  //   const disableD= ['2018-01-10'];
  //   <script>
  //   $(document).ready( function() {
  //     $('#date').datepicker({
  //       format:'yyyy-mm-dd',
  //       autoclose:true,
  //       startDate: '2018-01-01',
  //       datesDisabled: this.state.date,
  //     })
  //   });
  // </script>
  }
  onChange(e) {
    
    this.setState({
      [e.target.id]: e.target.value
    });
    if (e.target.id === 'centerId') {
      this.props.dispatch(getCenterSelected(e.target.value));
      this.props.dispatch(getCenterEvents(e.target.value));
    }

  }

  onFocus(e) {
    let disableDates = _.map(this.props.center.Events, (event) => {
      return (
        event.bookedDate
      );
    });
    this.setState({
      date: disableDates,
    })
  }
  search() {
    this.props.dispatch(getCenters(this.state));
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    // this.props.createEvent(this.state);
  }

  render() {

    const { title, date, description, errors, isLoading, centerId } = this.state;
    const showCenters = _.map(this.props.centers, (center) => {
      return (
        <option key={center.id} value={center.id}>{center.centerName}</option>
      )
    });
    
    return (
      <div>
      <form id="add-event-form" onSubmit={this.onSubmit}>
        <CenterSearch />
        <DatePicker />
        <p className="subtitle">select your preferred event center location</p>
        <div className="form-group">
          <select className="form-control" defaultValue={this.state.centerId} id="centerId" onChange={this.onChange}>            
            <option value="">Select Center</option>
            {showCenters}
          </select>
        </div>
        <div class="form-group">
          <button onClick={this.onClick.bind(this)}>Click Me</button>    
        </div>

        {/* <TextField
        id='date'
        value={this.state.date}
        placeholder='choose date'
        type='date'
        error={errors.date}
        onChange={this.onChange} /> */}
        <TextField
        id='title'
        value={this.state.title}
        placeholder='give your event a title'
        type='text'
        error={errors.title}
        onChange={this.onChange} />
        <p className="subtitle">describe your event in few words</p>
        <div className="form-group">
          <textarea className="form-control" id="description" error={errors.title}
        onChange={this.onChange}></textarea>
        </div> 
        <input id="add-event" type="submit" value="Add Event" className="btn btn-primary"/>
      </form>
      
      </div>
     
    )
  }
}
