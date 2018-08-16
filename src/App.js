import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from './components/routes/Home';
import Contact from './components/routes/Contact';
import Book from './components/routes/Book';
import DatePicker from './components/input/DatePicker';
import Admin from './components/routes/Admin';

export default class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar/>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/book" component={Book} />
          <DatePicker/>
          <Route path="/admin" component={Admin} />
        </React.Fragment>
    </Router>
    )
  }
}
