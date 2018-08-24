import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import Selector from "./Form/Selector";
import moment from 'moment';
import 'moment/locale/sv';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/Datepicker.css';

export default class Calendar extends Component{
  state = {
    startDate: moment(),
    selectedDate: '',
    allBookings: [],
    fullyBookedDates: []
  }

  formatDateString = (unformatted) => {
    return moment(unformatted).format('YYYY/MM/DD');
  }

  handleChange = (date) => {
    /**
     * Import functions recived as props,
     * setNewDateToState sets state to parent,
     * which can be either Admin or Book.
     */
    const { fetchSelectedDate, setNewDateToState, fullyBookedDates, findSessionForSelectedDate } = this.props;

    this.setState({
      startDate: date,
    });

    /** Component does not always recive these props,
    avoid errors by first checking if it exists. */
    if(setNewDateToState){
      const newDate = this.formatDateString(date);
      console.log(newDate);
      setNewDateToState(newDate);
      if(findSessionForSelectedDate) {
        console.log('fan va kuuuult');
        findSessionForSelectedDate(newDate);
      }
    }
    if(fetchSelectedDate) {
      const formattedDateString = this.formatDateString(date);
      const encodedDate = encodeURIComponent(formattedDateString);
      fetchSelectedDate(encodedDate);
    }
  }

  renderBookingDatePicker = () => {
    const { startDate } = this.state;
    const { fullyBookedDates } = this.props;
    return(
      <React.Fragment>
        <DatePicker
          locale="sv"
          minDate={moment()}
          dateFormat={'YYYY/MM/DD'}
          selected={startDate}
          onChange={this.handleChange}
          excludeDates={fullyBookedDates}
        />
      </React.Fragment>
    )
  }

  /** Admin datepicker does not have a minDate, since admin
   * should be able to select bookings from past dates.
  */
  renderAdminDatePicker = () => {
    const { startDate } = this.state;
    return(
      <React.Fragment>
        <DatePicker
          //inline
          dateFormat={'YYYY/MM/DD'}
          selected={startDate}
          onChange={this.handleChange}
        />
      </React.Fragment>
    )
  }

  render(){
    const { showAdminCalendar } = this.props;
    return(
      <React.Fragment>
        {showAdminCalendar &&
          <React.Fragment>
            {this.renderAdminDatePicker()}
          </React.Fragment>
        }
        {!showAdminCalendar &&
          <React.Fragment>
            {this.renderBookingDatePicker()}
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
};
