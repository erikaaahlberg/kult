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
    availableSessions: [],
    fullyBookedSessions: [],
    fullyBookedDates: []
  }

  componentDidMount() {
    /*this.setState({
      availableSessions: ['18.00', '21.00']
    });*/
    this.fetchBookingsByCount();
  }

  formatDateString = (unformatted) => {
    return moment(unformatted).format('YYYY/MM/DD');
  }

  fetchBookingsByCount = () => {
    return fetch('api/count')
      .then((response) => response.json())
        .then((fetchedBookings) => {
          // console.log(fetchedBookings);
          this.setState({
            allBookings: fetchedBookings
          });
          this.sortBySession();
          this.findSessionForSelectedDate();
        })
        .catch((error) => {
          // TODO: Handle error output to user, remove console.log
          console.log(error);
        });
  }

  sortBySession = () => {
    const allBookings = this.state.allBookings;
    let numberOfBookings = 0;
    let fullyBookedSessions = [];

    for (let i = 0; i < allBookings.length; i++) {
      let numberOfBookings = allBookings[i].count;
      // console.log(allBookings[i].count);

      if (numberOfBookings === 5) {
        fullyBookedSessions.push({
          date: allBookings[i].date,
          session: allBookings[i].session
        });
      }
    }
    if (fullyBookedSessions.length > 0) {
      // console.log(fullyBookedSessions);
      this.setState({ fullyBookedSessions: fullyBookedSessions });
      this.sortByFullyBookedDates();
    }
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

  removeFromArray = (array, value) => {
    return array.filter(e => e !== value);
  }

  findSessionForSelectedDate = () => {
    // console.log(this.state.fullyBookedSessions);
    let sessionsLeft = ['18.00', '21.00'];
    // console.log(this.state.availableSessions);
    const selectedDate = this.formatDateString();
    for (let i = 0; i < this.state.fullyBookedSessions.length; i++) {
      // console.log(this.state.fullyBookedSessions[i].date);
      // console.log(selectedDate);
      if (selectedDate === this.state.fullyBookedSessions[i].date) {
        console.log('tjenare');
        sessionsLeft = this.removeFromArray(sessionsLeft,  this.state.fullyBookedSessions[i].session);
      }
    }
    // console.log(sessionsLeft);
    this.setState({
      availableSessions: sessionsLeft
    });
    // console.log(this.state.availableSessions);
    /*const allBookings = this.fetchBookingsByCount()
    .then((fetchedBookings) => {
      console.log(selectedDate);

      }
    })
    const found = this.state.allBookings.find(function(date) {
      return date === selectedDate;
    });
    console.log(found);*/
  }


  handleChange = (date) => {
    /**
     * Import functions recived as props,
     * setNewDateToState sets state to parent,
     * which can be either Admin or Book.
     */
    const { fetchSelectedDate, setNewDateToState } = this.props;

    this.findSessionForSelectedDate();

    this.setState({
      startDate: date,
    });

    /** Component does not always recive these props,
    avoid errors by first checking if it exists. */
    if(setNewDateToState){
      const newDate = this.formatDateString(date);
      setNewDateToState(newDate);
    }
    if(fetchSelectedDate) {
      const formattedDateString = this.formatDateString(date);
      const encodedDate = encodeURIComponent(formattedDateString);
      fetchSelectedDate(encodedDate);
    }
  }

  renderBookingDatePicker = () => {
    const { startDate } = this.state;
    const { fullyBooked } = this.props;
    return(
      <React.Fragment>
        <DatePicker
          locale="sv"
          minDate={moment()}
          dateFormat={'YYYY/MM/DD'}
          selected={startDate}
          onChange={this.handleChange}
          excludeDates={fullyBooked}
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
