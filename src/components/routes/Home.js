import React, { Component } from "react";
import "../../assets/styles/Gdpr.css";
import Image from "../Image";
import CloseIcon from "../../assets/images/close.svg";

export default class Home extends Component {
  state = {
    gdpr: "gdprVisible",
  }

  removeGDPR = () => {
    this.setState({
      gdpr: "gdprHidden",
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="homeWrapper">
          <h1 id="homeHeader">KULT</h1>
          <p>Ha så kult på restaurangen!</p>
        </div>
        <div className={this.state.gdpr}>
          <Image className="closeIcon" src={CloseIcon} alt="Close GDPR" handleChange={this.removeGDPR} />
          <p>
          Genom att fortsätta på denna sida accepterar du vår integritetspolicy och villkoren som ingår i den. 
          Du tillåter oss även att lagra den informationen du ger oss vid bokningar och direkt kontakt. 
          Du kan läsa mer om detta under integritetspolicy eller villkor. <br></br>
          För frågor når du oss via vår kontaktsida.<br></br>
         <br></br>Ha så kult på restaurangen!
          </p>

        </div>
      </React.Fragment>
    );
  }
}
