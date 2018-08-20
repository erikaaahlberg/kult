import React, {Component} from "react";
import { Link } from "react-router-dom";
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
        <div id="navIcon" className={this.state.toggleHamburger} onClick={this.toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={this.state.toggleMenu}>
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/book">Boka</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </React.Fragment>
    )
  }
};
