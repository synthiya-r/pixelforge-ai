import React from "react";

export default function SectionHeading({eyebrow, title, text, center=false}) {
  return (
    <div className={center ? "section-heading center" : "section-heading"}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
