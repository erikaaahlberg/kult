import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./assets/styles/App.css";
import "./assets/styles/Fonts.css";
import "./assets/styles/Desktop.css";
import Navbar from "./components/Navbar";
import Home from './components/routes/Home';
import Menu from './components/routes/Menu';
import Contact from './components/routes/Contact';
import Book from './components/routes/Book';
import Admin from './components/routes/Admin';

export default class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar/>
          <Route exact path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/book" component={Book} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
        </React.Fragment>
    </Router>
    )
  }
}

