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

  fetchBookingsByCount = () => {
    return fetch('api/count')
      .then((response) => response.json())
        .then((fetchedBookings) => {
          console.log(fetchedBookings);
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

  formatDateString = (unformatted) => {
    return moment(unformatted).format('YYYY/MM/DD');
  }

  sortBySession = () => {
    const allBookings = this.state.allBookings;
    let numberOfBookings = 0;
    let fullyBookedSessions = [];

    for (let i = 0; i < allBookings.length; i++) {
      let numberOfBookings = allBookings[i].count;
      console.log(allBookings[i].count);

      if (numberOfBookings === 5) {
        fullyBookedSessions.push({
          date: allBookings[i].date,
          session: allBookings[i].session
        });
      }
    }
    if (fullyBookedSessions.length > 0) {
      console.log(fullyBookedSessions);
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

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });

    const { fetchSelectedDate, setNewDateToState } = this.props;
    this.findSessionForSelectedDate();

    /** Component does not always recive these props,
    avoid errors by first checking if it exists. */
    if(!fetchSelectedDate){
      // This function has not been passed along as props.
      return;
    } else {
      const formattedDateString = this.formatDateString(date);
      const encodedDate = encodeURIComponent(formattedDateString);
      fetchSelectedDate(encodedDate);
    }

    if(!setNewDateToState){
      return;
    } else {
      // Sets the changed date to a parent-state that also needs it.
      const newDate = this.formatDateString(date);
      setNewDateToState(newDate);
    }
  }



  reconstructDate = () => {
    const date = new Date(this.state.startDate);
    return date.toLocaleDateString().split('-').join('/');
  }

  removeFromArray = (array, value) => {
    return array.filter(e => e !== value);
  }

  findSessionForSelectedDate = () => {
    console.log(this.state.fullyBookedSessions);
    let sessionsLeft = ['18.00', '21.00'];
    console.log(this.state.availableSessions);
    const selectedDate = this.reconstructDate();
    for (let i = 0; i < this.state.fullyBookedSessions.length; i++) {
      console.log(this.state.fullyBookedSessions[i].date);
      console.log(selectedDate);
      if (selectedDate === this.state.fullyBookedSessions[i].date) {
        console.log('tjenare');
        sessionsLeft = this.removeFromArray(sessionsLeft,  this.state.fullyBookedSessions[i].session);
      }
    }
    console.log(sessionsLeft);
    this.setState({
      availableSessions: sessionsLeft
    });
    console.log(this.state.availableSessions);
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
        <input hidden type="text" name="create_date" readOnly value={this.formatDateString(this.state.startDate)} />
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
        {/* {this.renderSessionInput()} */}
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
