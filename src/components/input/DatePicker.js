import React, { Component } from 'react';

class DatePicker extends Component {
    state = {
        availableSessions: []
    }
    componentDidMount(){
        this.fetchBookings();
        this.countBookings();
    }

    fetchBookings = () => {
        return fetch('api/sessions')
        .then((response) => response.json())
            .then((fetchedBookings) => {
                //this.setState({ takenDates: fetchedBookings })
                console.log(fetchedBookings);
                return fetchedBookings;

            })
            .catch((error) => {
              // TODO: Handle error output to user, remove console.log
                console.log(error);
            });
    }

    countBookings = () => {
        let numberOfBookings = 0;
        let availableSessions = [];
        this.fetchBookings()
            .then((fetchedBookings) => {
                for (let i = 0; i < fetchedBookings.length; i++) {
                    console.log(fetchedBookings[i].count);
                    if (fetchedBookings[i].count < 10) {
                        let numberOfBookings = fetchedBookings[i].count;
                        const tablesLeft = 10 - numberOfBookings;

                        availableSessions.push({
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
            });
    }
    
    countFullyBooked = () => {
        let fullyBookedDates = [];
        let firstSession = 0;
        let secondSession = 0;
        for (let i = 0; i < this.state.fullyBookedSessions.length; i++) {
            if (this.state.fullyBookedSessions[i].session === 18.00){
                firstSession += 1;
            }
            else if (this.state.fullyBookedSessions[i].session === 21.00) {
                secondSession += 1;
            }
            if (firstSession === 10 && secondSession === 10) {
                fullyBookedDates.push(this.state.fullyBookedSessions[i].date);
            }
        }
        this.setState({ fullyBookedDates : fullyBookedDates });
        console.log(this.state.fullyBookedSessions);
        console.log(this.state.fullyBookedDates);
    }

    render () {
        return (
            <input type = "date"/>
        )
    }

}

export default DatePicker;

/*
    countBookings = () => {
        let numberOfBookings = 0;
        let fullyBookedSessions = [];
        this.fetchBookings()
            .then((fetchedBookings) => {
                let p = 1;
                for (let i = 0; i < fetchedBookings.length; i++) {
                        if (fetchedBookings[i].date === fetchedBookings[p].date && fetchedBookings[i].session === fetchedBookings[p].session) {
                            numberOfBookings += 1;
                            if (numberOfBookings === 10) {
                                fullyBookedSessions.push({
                                    date: fetchedBookings[i].date,
                                    session: fetchedBookings[i].session
                                });
                            }
                        }
                    
                    this.setState({ fullyBookedSessions: fullyBookedSessions });
                    console.log(numberOfBookings);
                    console.log(fetchedBookings[i]);
                    p += 1;
                }
            })
    }
    
    countFullyBooked = () => {
        let fullyBookedDates = [];
        let firstSession = 0;
        let secondSession = 0;
        for (let i = 0; i < this.state.fullyBookedSessions.length; i++) {
            if (this.state.fullyBookedSessions[i].session === 18.00){
                firstSession += 1;
            }
            else if (this.state.fullyBookedSessions[i].session === 21.00) {
                secondSession += 1;
            }
            if (firstSession === 10 && secondSession === 10) {
                fullyBookedDates.push(this.state.fullyBookedSessions[i].date);
            }
        }
        this.setState({ fullyBookedDates : fullyBookedDates });
        console.log(this.state.fullyBookedSessions);
        console.log(this.state.fullyBookedDates);
    }
    */