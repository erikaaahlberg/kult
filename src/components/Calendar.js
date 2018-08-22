import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import Selector from "./Form/Selector";
import moment from 'moment';
import 'moment/locale/sv';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/Datepicker.css';

export default class Calendar extends Component{
  state = {
    startDate: moment(),
    availableSessions: [],
    fullyBookedSessions: [],
    fullyBookedDates: []
  }
  componentDidMount() {
    this.fetchBookingsByCount();
    this.sortBySession();
  }
  fetchBookingsByCount = () => {
    return fetch('api/count')
      .then((response) => response.json())
        .then((fetchedBookings) => {
          console.log(fetchedBookings);
          return fetchedBookings;
        })
        .catch((error) => {
          // TODO: Handle error output to user, remove console.log
          console.log(error);
        });
  }

  sortBySession = () => {
    let numberOfBookings = 0;
    let availableSessions = [];
    let fullyBookedSessions = [];

    this.fetchBookingsByCount()
      .then((fetchedBookings) => {
        for (let i = 0; i < fetchedBookings.length; i++) {
          let numberOfBookings = fetchedBookings[i].count;
          console.log(fetchedBookings[i].count);

          if (numberOfBookings < 5) {
            const tablesLeft = 5 - numberOfBookings;

            availableSessions.push({
              date: fetchedBookings[i].date,
              session: fetchedBookings[i].session,
              tablesLeft: tablesLeft
            });
          }
          else if (numberOfBookings === 5) {
            const tablesLeft = 5 - numberOfBookings;
            fullyBookedSessions.push({
              date: fetchedBookings[i].date,
              session: fetchedBookings[i].session,
              tablesLeft: tablesLeft
            });
          }
        }
        if (availableSessions.length > 0) {
          console.log(availableSessions);
          this.setState({ availableSessions: availableSessions });
        }
        if (fullyBookedSessions.length > 0) {
          console.log(fullyBookedSessions);
          this.setState({ fullyBookedSessions: fullyBookedSessions });
          this.sortByFullyBookedDates();
        }
      });
  }

  sortByFullyBookedDates = () => {
    let fullyBookedSessions = this.state.fullyBookedSessions;
    let fullyBookedDates = this.findDuplicateDates(fullyBookedSessions);
    if(fullyBookedDates.length > 0) {
      this.setState({ fullyBookedDates: fullyBookedDates });
    }
  }

  findDuplicateDates = (array) => {
    let duplicateDates = [];
    const lastIndex = array.length -1;
    for (let i = 0; i < array.length; i++) {
      if (i != lastIndex) {
        for (let p = i + 1; p < array.length; p++) {
          if (array[i].date === array[p].date) {
            duplicateDates.push(array[i].date);
          }
        }
      }
    }
    return duplicateDates;
  }

  findSessionForSelectedDate = () => {
    console.log(this.reconstructDate());
  }

  handleChange = (date) => {
    const { fetchSelectedDate } = this.props;
    this.setState({
      startDate: date
    });
    /** Component does not always recive this prop,
    avoid errors by first checking if it exists. */
    if(!fetchSelectedDate){
      return;
    } else {
      let formattedDateString = moment(date).format('YYYY/MM/DD');
      // Replace "/" in path so url will send correct date-format to route
      let encodedDate = encodeURIComponent(formattedDateString);
      console.log(encodedDate);
      fetchSelectedDate(encodedDate);
      this.findSessionForSelectedDate();
    }
  }

  reconstructDate = () => {
    const date = new Date(this.state.startDate);
    return date.toLocaleDateString().split('-').join('/');
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
          excludeDates = {this.props.fullyBooked}
          name="create_date"
        />
        <br />
        <input hidden type="text" name="create_date" value={this.reconstructDate()} />
      </React.Fragment>
    )
  }

  renderSessionInput = () => {
    return(
      <React.Fragment>
        <label htmlFor="create_session">Sittning</label>
        <br/>
        <Selector name = "create_session" availableSessions = {this.state.availableSessions}/>
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
          excludeDates = {this.props.fullyBooked}
        />
        <br />
        <input type="text" name="create_date" value={this.reconstructDate()} />
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
        {this.renderSessionInput()}
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
