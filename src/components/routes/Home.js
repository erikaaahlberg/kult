import React from "react";
import MainWrapper from "../MainWrapper";
import Header from "../Header";
import Gdpr from "../Gdpr";

export default function Home() {
  return (
    <main>
      <div className="homeWrapper">
        <Header id="homeHeader" title="KULT" />
        <p>Ha så kult på restaurangen!</p>
        <Gdpr />
      </div>
    </main>
  );
}
