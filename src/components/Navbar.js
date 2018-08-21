import React, {Component} from "react";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";
import Listitem from "./Listitem";
import "./styles/Hamburger.css";
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
    const { toggleHamburger } = this.state;
    const { toggleMenu } = this;
    return(
      <React.Fragment>
        <Hamburger className={ toggleHamburger } handleChange={ toggleMenu } />
        <ul className={ this.state.toggleMenu }>
          <Listitem className="navigation">
            <Link to="/" onClick={ toggleMenu }>Hem</Link>
          </Listitem>
          <Listitem className="navigation">
            <Link to="/book" onClick={ toggleMenu }>Boka</Link>
          </Listitem>
          <Listitem className="navigation">
            <Link to="/contact" onClick={ toggleMenu }>Kontakt</Link>
          </Listitem>
          <Listitem className="navigation">
            <Link to="/admin" onClick={ toggleMenu }>Admin</Link>
          </Listitem>
        </ul>
      </React.Fragment>
    )
  }
};
