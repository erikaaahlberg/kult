import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class Calendar extends Component{
  state = {
    startDate: moment(),
  }

  handleChange = (date) => {
    const { fetchSelectedDate } = this.props;

    this.setState({
      startDate: date,
    });

    /** Component does not always recive this prop,
    avoid errors by first checking if it exists. */
    if(!fetchSelectedDate){
      return;
    } else {
      let formattedDateString = moment(date).format('DD/MM/YYYY');
      // Replace "/" in path so url will send correct date-format to route
      let encodedDate = encodeURIComponent(formattedDateString);
      fetchSelectedDate(encodedDate);
    }
  }

  renderRegularDatePicker = () => {
    return(
      <DatePicker
        dateFormat={'DD/MM/YYYY'}
        minDate={moment()}
        selected={this.state.startDate}
        onChange={this.handleChange}
        name="create_date"
      />
    )
  }

  /** Admin datepicker does not have a minDate, since admin
   * should be able to select bookings from past dates.
  */
  renderAdminDatePicker = () => {
    return(
      <DatePicker
        dateFormat={'DD/MM/YYYY'}
        selected={this.state.startDate}
        onChange={this.handleChange}
        name="create_date"
      />
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
