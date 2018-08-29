import React from "react";
import "../../assets/styles/Booking.css";


export default function Contact(){
  return(
    <div className="wrapper">
      <h1 className="smallHeader">KONTAKT</h1>
      <p>hej@kultrestaurang.se</p>

      <div className="contactUsWrapper">
        <p>
          Kontakta oss gärna!
        </p>
        <label htmlFor="name">Namn*</label>
        <br />
        <input type="text"
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
        <input type="text" 
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
  )
};