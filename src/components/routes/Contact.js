import React from "react";
import "../../assets/styles/Contact.css";


export default function Contact(){
  return(
    <div className="rapper">
    <div className="imageWrapper">
    </div>
    <div className="crapper">
      <h1 className="smallHeader">KONTAKT</h1>
      <div className="contactUs">
        <p>GRISKULTSGATAN 59</p>
        <p>Stockholm</p>
        <p>+4613370808</p> 
        
        <p>Kontakta oss gärna nedan!</p>
        </div>
        <div className="contactUsWrapper">
        <label htmlFor="name">Namn*</label>
        <br />
        <input
          type="text"
          placeholder="Namn"
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
            placeholder="Meddelande"
            id="contactMessage"
          />
         </div>
        </div>
        <button className="button" type="submit">SKICKA</button>
      </div>
      </div>
  )
};