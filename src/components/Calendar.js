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
      let formattedDateString = moment(date).format('YYYY/MM/DD');
      // Replace "/" in path so url will send correct date-format to route
      let encodedDate = encodeURIComponent(formattedDateString);
      fetchSelectedDate(encodedDate);
    }
  }

  displayDate = () => {
    const date = new Date(this.state.startDate);
    return date.toLocaleDateString().split('-').join('/');
  }


  renderRegularDatePicker = () => {
    return(
      <React.Fragment>
        <DatePicker
          //inline
          locale="sv"
          minDate={moment()}
          dateFormat={'YYYY/MM/DD'}
          selected={this.state.startDate}
          onChange={this.handleChange}
          name="create_date"
        />
        <br />
       {/* <input hidden type="text" name="create_date" value={this.displayDate()} /> */}
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
          //inline
          dateFormat={'YYYY/MM/DD'}
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
        <br />
        {/* <input type="text" name="create_date" value={this.displayDate()} /> */}
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
