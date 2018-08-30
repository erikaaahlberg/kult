import React from "react";
import "../../assets/styles/Contact.css";


export default function Contact(){
  return(
    <div className="megaWrapper">
    <div className="imageWrapper">
    </div>
    <div className="wrapContact">
      <div className="contactUs">
        <h2>KONTAKT</h2>
        <p> 
        GRISKULTSGATAN 59, 113 23 STOCKHOLM
        </p>
        <br />
        <p>+ 46(0)8 949113</p> 
        <br />
          <p>Kontakta oss gärna nedan!</p>
        </div>
        <div className="contactUsWrapper">
        <label htmlFor="name">Namn*</label>
        <br />
        <input
          type="text"
          placeholder="Fullständigt namn"
          id="contactName"
         />
        <div className="phoneEmail">
          <div className="phone">
            <label htmlFor="name">Telefon*</label>
            <br />
            <input 
              type="text" 
              placeholder="Telefon"
              id="contactPhone"
            />
          </div>
          <div className="email">
            <label htmlFor="name">Email*</label>
            <br />
            <input
              type="text" 
              placeholder="Email"
              id="contactEmail"
            />
          </div>
        </div>
        <div className="contactMessage">
          <label htmlFor="name">Meddelande*</label>
          <br />
          <textarea  
            placeholder="Skriv ditt meddelande här"
            id="contactMessage"
          />
         </div>
        </div>
        <button className="button" type="submit">SKICKA</button>
      </div>
      </div>
  )
};