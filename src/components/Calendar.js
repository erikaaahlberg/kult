import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/sv';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/Datepicker.css';

export default class Calendar extends Component{
  state = {
    startDate: moment(),
  }

  formatDateString = (unformatted) => {
    return moment(unformatted).format('YYYY/MM/DD');
  }

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });

    const { fetchSelectedDate, setNewDateToState } = this.props;

    if(!setNewDateToState){
      return;
    } else {
      // Sets the changed date to a parent-state that also needs it.
      const newDate = this.formatDateString(date);
      setNewDateToState(newDate);
    }

    if(!fetchSelectedDate){
      // This function has not been passed along as props.
      return;
    } else {
      const formattedDateString = this.formatDateString(date);
      const encodedDate = encodeURIComponent(formattedDateString);
      fetchSelectedDate(encodedDate);
    }
  }

  renderRegularDatePicker = () => {
    return(
      <React.Fragment>
        <DatePicker
          inline
          locale="sv"
          minDate={moment()}
          dateFormat={'YYYY/MM/DD'}
          selected={this.state.startDate}
          onChange={this.handleChange}
          name="create_date"
        />
        <br />
        <input hidden type="text" name="create_date" readOnly value={this.formatDateString(this.state.startDate)} />
      </React.Fragment>
    )
  }

  /** Admin datepicker does not have a minDate, since admin
   * should be able to select bookings from past dates.
  */
  renderAdminDatePicker = () => {
    return(
      <React.Fragment>
        <DatePicker
          inline
          dateFormat={'YYYY/MM/DD'}
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
        <br />
        <input type="text" name="update_date" readOnly value={this.formatDateString(this.state.startDate)} />
      </React.Fragment>
    )
  }

  /** TODO:
   * Make comp accept array of excluded/highlighted dates (send in as props)
   * Make dates before today unselectable (min date range or something/use monment, see docs)
  */
  render(){
    const { showAdminCalendar } = this.props;
    return(
      <React.Fragment>
       {!showAdminCalendar &&
        <React.Fragment>
        {this.renderRegularDatePicker()}
        </React.Fragment>
       }
       {showAdminCalendar &&
        <React.Fragment>
        {this.renderAdminDatePicker()}
        </React.Fragment>
       }
      </React.Fragment>
    )
  }
};
