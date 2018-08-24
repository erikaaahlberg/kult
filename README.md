# Kult Restaurang

> "Ha det så kult på restaurangen"

Site and booking-system for the fashionable, non existing restaurant Kult. Inspired by [kult på restaurangen.](https://www.youtube.com/watch?v=qCSfy670df4)

## Installation

1. Clone this repository into your desired local directory.
2. `cd` to the folder `kult`.
3. Install dependencies using `npm install` or `yarn`.

## Setup

The api is built upon a MySQL database following the schema found in `db_structure.sql`.

1. Create your own database by importing the sql-file to phpMyAdmin.
2. Start up MAMP (or equivalent).
3. In the file `server.js`, make sure the connection applies to your local settings.

## Development

1. Start up development server with either `yarn start` or `npm start`.
2. In a new terminal tab, run either `yarn server` or `npm run server`.
3. The app should be up and running!


## Resources

* [Moment.js](https://momentjs.com/)
* [ReactJS Datepicker](https://reactdatepicker.com/)
* [React Router](https://reacttraining.com/react-router/)
* [Express](https://expressjs.com/)