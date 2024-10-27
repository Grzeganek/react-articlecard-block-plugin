import "./frontend.scss";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

// Typen für die Attribute definieren
interface OurComponentProps {
  skyColor: string;
  grassColor: string;
}

const divsToUpdate = document.querySelectorAll(".update");

divsToUpdate.forEach((div) => {
  const preElement = div.querySelector("pre");

  if (preElement) {
    // Null-Check hinzufügen
    const data = JSON.parse(preElement.innerText);
    const root = ReactDOM.createRoot(div);
    root.render(<OurComponent {...data} />);
    div.classList.remove("update");
  }
});

function OurComponent(props: OurComponentProps) {
  const [showSkyColor, setShowSkyColor] = useState(false);
  const [showGrassColor, setShowGrassColor] = useState(false);

  return (
    <div className="frontend">
      <p>
        <button onClick={() => setShowSkyColor((prev) => !prev)}>Toggle view sky color ???</button>
        {showSkyColor && <span>{props.skyColor}</span>}
      </p>
      <p>
        <button onClick={() => setShowGrassColor((prev) => !prev)}>Toggle view grass color !!!</button>
        {showGrassColor && <span>{props.grassColor}</span>}
      </p>
    </div>
  );
}

export default OurComponent;
