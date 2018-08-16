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
        this.sortBookings();
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

    sortBookings = () => {
        let numberOfBookings = 0;
        this.fetchBookings()
            .then((fetchedBookings) => {
                for (let i = 0; i < fetchedBookings.length; i++) {
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