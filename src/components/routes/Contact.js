import React from "react";
import MainWrapper from "../MainWrapper";
import Header from "../Header";
import ContactForm from "../form/ContactForm";
import "../../assets/styles/Contact.css";

export default function Contact() {
  return (
    <main>
      <MainWrapper background="contactBackground">
        <Header className="tinyHeader" title="KONTAKT" />
        <p>GRISKULTSGATAN 59, 113 23 STOCKHOLM</p>
        <p>+46(0)8 94 91 13</p>
        <p>Kontakta oss gärna nedan!</p>
        <ContactForm />
        <button className="button" type="submit">SKICKA</button>
      </MainWrapper>
    </main>
  );
}
