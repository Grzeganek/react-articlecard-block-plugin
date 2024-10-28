import { useBlockProps } from "@wordpress/block-editor";
import { registerBlockType, BlockConfiguration, BlockEditProps } from "@wordpress/blocks";
import metadata from "../block.json";
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

// Block-Konfiguration
const blockSettings: BlockConfiguration = {
  ...metadata,
  icon: { src: "welcome-learn-more" },
  edit: EditComponent,
};

registerBlockType(metadata.name, blockSettings);

// Leeres Interface für die Block-Attribute
interface BlockAttributes {}

// Statische Vorschau-Komponente für den Editor
function EditComponent(props: BlockEditProps<BlockAttributes>) {
  return (
    <div {...useBlockProps()}>
      <Card>
        <CardContent>
          <Typography variant="h3">Ruhr Nachrichten ArtikelCards</Typography>
          <Typography variant="h5">Dieses Block-Plugin lädt Artikel von Ruhr Nachrichten und stellt sie als Kartenansicht dar.</Typography>
          <Typography variant="h5">Die API-Daten werden nur im Frontend geladen und hier im Editor nicht angezeigt.</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditComponent;
