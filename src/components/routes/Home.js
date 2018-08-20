import React, {Component} from "react";
import "../styles/Navbar.css";
import "../styles/Keyframes.css";
import CloseIcon from '../images/close.svg';

export default class Home extends Component {
  state = {
    toggle: "",
  }

  toggleMenu = () => {
    this.setState({
      toggle: "open",
    })

    if(this.state.toggle === "open") {
      this.setState({
        toggle: "",
      })
    }
  }
  
  render(){
    return (
      <React.Fragment>
        <div className="wrapper">
          <div id="navIcon" className={this.state.toggle} onClick={this.toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1>KULT</h1>
          <p>Det här är komponenten för landingssidan – jag finns i components/routes/Home.</p>
        </div>
        <div className="gdpr">
          <img className="closeIcon" src={CloseIcon} alt="Close GDPR" />
          <p>
            Casper nose grab aerial 1080 Danny Way. Nosegrind pogo boned out indy grab. Air
            rail Stacy Peralta hand rail hardware. Kevin Harris drop in lip fastplant. Craig
            Patterson speed wobbles judo air blunt Tracker. Grab 540 baseplate nosegrind. 
            Bruised heel nose bump ho-ho vert. Cess slide bluntslide kidney Mike York skater.
            Rad 900 Primo slide helipop Powell Peralta.
          </p>
        </div>
      </React.Fragment>
    )
  }
};