import React from "react";
import Header from "../Header";
import ContactForm from "../form/ContactForm";
import "../../assets/styles/Contact.css";

export default function Contact() {
  return (
    <div className="mainWrapper">
      <div className="contentWrapper">
        <div className="contactBackground" />
        <div className="rightContent">
          <Header className="tinyHeader" title="KONTAKT" />
          <p>
            GRISKULTSGATAN 59, 113 23 STOCKHOLM
          </p>
          <p>
            + 46(0)8 949113
          </p>
          <p>
            Kontakta oss gärna nedan!
          </p>
          <ContactForm />
          <button className="button" type="submit">SKICKA</button>
        </div>
      </div>
    </div>
  );
}
