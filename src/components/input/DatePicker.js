import React, { Component } from 'react';
/*import * as components from './grid';*/

import Container from '../grid/Container';
import Row from '../grid/Row';
import Div from '../grid/Div';


class DatePicker extends Component {
    state = {
        takenDates: []
    }
    componentDidMount(){
        this.fetchBookings();
        this.countBookings();
    }

    fetchBookings = () => {
        return fetch('api/bookings')
        .then((response) => response.json())
            .then((fetchedBookings) => {
                //this.setState({ takenDates: fetchedBookings })
                return fetchedBookings;
            })
            .catch((error) => {
              // TODO: Handle error output to user, remove console.log
                console.log(error);
            });
    }

    countBookings = () => {
        let numberOfBookings = 0;
        let fullyBooked = [];
        this.fetchBookings()
            .then((fetchedBookings) => {
                let p = 1;
                for (let i = 0; i < fetchedBookings.length; i++) {
                    if (fetchedBookings[i].date === fetchedBookings[p].date && fetchedBookings[i].session === fetchedBookings[p].session) {
                        numberOfBookings += 1;
<<<<<<< HEAD
                        if (numberOfBookings === 10){
=======
                        if (numberOfBookings === 10) {
>>>>>>> master
                            fullyBooked.push({
                                date: fetchedBookings[i].date,
                                session: fetchedBookings[i].session
                            });
                        }
                        if(p < fetchedBookings.length) {
                            p += 1;
                        }
                    }
                    console.log(numberOfBookings);
                    console.log(fetchedBookings[i]);
                }
                /*
                const keys = Object.keys(fetchedBookings);
                for (let key of keys) {
                    console.log(fetchedBookings[key]); /*
                    if(fetchedBookings[key].date === bookings.date && fetchedBookings.session === bookings.session) {
                        console.log('hej');
                    } 
                }*/
            })
    }
    
   
    render () {
        return (
            <input type = "date"/>
        )
    }

}

export default DatePicker;
/*id = { props.id } className = { props.styleClass } onClick = { props.event } */