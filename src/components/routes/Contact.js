import React from "react";
import "../../assets/styles/Contact.css";

export default function Contact() {
  return (
    <div className="mainWrapper">
      <div className="contentWrapper">
        <div className="contactBackground" />
        <div className="rightContent">
          <h1 className="tinyHeader">KONTAKT</h1>
          <p>
            GRISKULTSGATAN 59, 113 23 STOCKHOLM
          </p>
          <p>
            + 46(0)8 949113
          </p>
          <p>
            Kontakta oss gärna nedan!
          </p>
          <div className="contactUsWrapper">
            <label className="contactLabel" htmlFor="name">Namn*</label>
            <br />
            <input
              type="text"
              placeholder="Namn"
              id="contactName"
            />
            <div className="phoneEmail">
              <div className="phone">
                <label className="contactLabel" htmlFor="name">Telefon*</label>
                <br />
                <input
                  type="text"
                  placeholder="Telefon"
                  id="contactPhone"
                />
              </div>
              <div className="email">
                <label className="contactLabel" htmlFor="name">Email*</label>
                <br />
                <input
                  type="text"
                  placeholder="Email"
                  id="contactEmail"
                />
              </div>
            </div>
            <div className="contactMessage">
              <label className="contactLabel" htmlFor="name">Meddelande*</label>
              <br />
              <textarea
                placeholder="Meddelande"
                id="contactMessage"
              />
            </div>
          </div>
          <button className="button" type="submit">SKICKA</button>
        </div>
      </div>
    </div>
  );
}
