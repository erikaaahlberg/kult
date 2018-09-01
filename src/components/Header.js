import React from "react";

export default function Header({
  id, className, title,
}) {
  return (
    <header>
      <h1 id={id} className={className}>
        { title }
      </h1>
    </header>
  );
}
