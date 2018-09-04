import React from "react";

export default function ContactForm() {
  return (
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
  );
}
