import "./index.scss";
import { useBlockProps } from "@wordpress/block-editor";
import { registerBlockType, BlockEditProps, BlockConfiguration } from "@wordpress/blocks";
import metadata from "../block.json";
import React from "react";
import { Attributes } from "../interfaces/iIAttributes";

// Block-Konfiguration explizit festlegen und Metadaten manuell auflisten
const blockSettings: BlockConfiguration<Attributes> = {
  ...metadata,
  attributes: {
    skyColor: { type: "string" },
    grassColor: { type: "string" },
  },
  icon: {
    // Icon manuell festlegen
    src: "welcome-learn-more",
  },
  edit: EditComponent,
};

registerBlockType<Attributes>(metadata.name, blockSettings);

function EditComponent(props: BlockEditProps<Attributes>) {
  function updateSkyColor(e: React.ChangeEvent<HTMLInputElement>) {
    props.setAttributes({ skyColor: e.target.value });
  }

  function updateGrassColor(e: React.ChangeEvent<HTMLInputElement>) {
    props.setAttributes({ grassColor: e.target.value });
  }

  return (
    <div {...useBlockProps()}>
      <div className="makeUpYourBlockTypeName">
        <input type="text" value={props.attributes.skyColor || ""} onChange={updateSkyColor} placeholder="sky color..." />
        <input type="text" value={props.attributes.grassColor || ""} onChange={updateGrassColor} placeholder="grass color..." />
      </div>
    </div>
  );
}
