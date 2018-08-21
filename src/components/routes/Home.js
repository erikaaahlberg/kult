import React, {Component} from "react";
import "../styles/Keyframes.css";
import Image from "../Image";
import CloseIcon from '../images/close.svg';

export default class Home extends Component {
  state = {
    gdpr: "gdprVisible",
  }

  removeGDPR = () => {
    this.setState({
      gdpr: "gdprHidden",
    })
  }
  
  render(){
    return (
      <React.Fragment>
        <div className="wrapper">
          <h1 className="header">KULT</h1>
          <p>Ha så kult på restaurangen!</p>
        </div>
        <div className={ this.state.gdpr }>
          <Image className="closeIcon" src={ CloseIcon } alt="Close GDPR" handleChange={ this.removeGDPR } />
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