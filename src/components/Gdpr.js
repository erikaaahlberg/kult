import React, { Component } from "react";
import "../assets/styles/Gdpr.css";
import Image from "./Image";
import CloseIcon from "../assets/images/close.svg";

export default class Gdpr extends Component {
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
      <div className={this.state.gdpr}>
        <Image className="closeIcon" src={CloseIcon} alt="Close GDPR" handleChange={this.removeGDPR} />
        <p>
            Genom att fortsätta på denna sida accepterar du vår integritetspolicy
            och villkoren som ingår i den. Du tillåter oss även att lagra den
            informationen du ger oss vid bokningar och direkt kontakt.
            Du kan läsa mer om detta under integritetspolicy eller villkor.
        </p>
        <p>För frågor når du oss via vår kontaktsida.</p>
        <p>Ha så kult på restaurangen!</p>
      </div>
    );
  }
}
