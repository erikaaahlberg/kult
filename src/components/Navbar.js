import React, {Component} from "react";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";
import "./styles/Navbar.css";
import "./styles/Keyframes.css";

export default class Navbar extends Component {
  state = {
    toggleHamburger: "",
    toggleMenu: "navbarHidden",
  }

  toggleMenu = () => {
    this.setState({
      toggleHamburger: "open",
      toggleMenu: "navbarVisible",
    })

    if(this.state.toggleHamburger === "open") {
      this.setState({
        toggleHamburger: "",
      })
    }

    if(this.state.toggleMenu === "navbarVisible") {
      this.setState({
        toggleMenu: "navbarHidden",
      })
    }
  }

  render(){
    return(
      <React.Fragment>
        <Hamburger className={this.state.toggleHamburger} handleChange={this.toggleMenu} />
        <ul className={this.state.toggleMenu}>
          <li className="navigation">
            <Link to="/" onClick={this.toggleMenu}>Hem</Link>
          </li>
          <li className="navigation">
            <Link to="/book" onClick={this.toggleMenu}>Boka</Link>
          </li>
          <li className="navigation">
            <Link to="/contact" onClick={this.toggleMenu}>Kontakt</Link>
          </li>
          <li className="navigation">
            <Link to="/admin" onClick={this.toggleMenu}>Admin</Link>
          </li>
        </ul>
      </React.Fragment>
    )
  }
};
