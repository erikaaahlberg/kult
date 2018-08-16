import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class BookingForm extends Component{
  state = {
    startDate: moment(),
  }

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render(){
    return(
      <form action="/api/create_booking/" method="POST">
        <label htmlFor="create_guest">Antal gäster</label>
        <br/>
        <input placeholder="Max 4" name="create_guests"/>
        <br/>
        <label htmlFor="create_session">Sittning</label>
        <br/>
        <input placeholder="18:00 eller 21:00" name="create_session"/>
        <br/>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange} 
        />
        <br/>
        <label htmlFor="create_date">Namn</label>
        <br/>
        <input placeholder="Kult Svensson" name="create_name"/>
        <br/>
        <label htmlFor="create_date">E-mail</label>
        <br/>
        <input placeholder="kult@gmail.com" name="create_email"/>
        <br/>
        <label htmlFor="create_date">Phone</label>
        <br/>
        <input placeholder="+46 761234567" name="create_phone" required/>
        <br/>
        <button>Boka</button>
      </form>
    )
  }
};
