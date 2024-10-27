import "./index.scss";
import { useBlockProps } from "@wordpress/block-editor";
import { registerBlockType, BlockConfiguration, BlockEditProps } from "@wordpress/blocks";
import metadata from "../block.json";
import React, { useState } from "react";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { fetchArticles } from "../api/api.ruhrnachrichten";
import { Article } from "../interfaces/IArticle";

// Block-Konfiguration
const blockSettings: BlockConfiguration = {
  ...metadata,
  icon: { src: "welcome-learn-more" },
  edit: EditComponent,
};

registerBlockType(metadata.name, blockSettings);

interface BlockAttributes {} // Leeres Interface für die Block-Attribute

function EditComponent(props: BlockEditProps<BlockAttributes>) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Funktion für den Klick-Event, um die API-Daten zu laden
  const loadArticles = async () => {
    const result = await fetchArticles();
    if (result.success) {
      setArticles(result.data || []);
    } else {
      setError(result.error || "Unbekannter Fehler");
    }
  };

  return (
    <div {...useBlockProps()}>
      <Button variant="contained" color="primary" onClick={loadArticles}>
        Lade Artikel
      </Button>

      {error && <div className="error">Fehler beim Laden der Artikel: {error}</div>}

      {articles.length > 0 && (
        <div className="article-list">
          {articles.map((article) => (
            <Card sx={{ margin: 2 }} key={article.id}>
              <CardMedia component="img" height="140" image={article.featured_media_url || "https://example.com/path/to/image.jpg"} alt={article.title.rendered || "Kein Titel"} />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  {article.title.rendered}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Autor: {article._embedded?.author?.[0]?.name || "Unbekannt"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kategorie: {article._embedded?.["wp:term"]?.[0]?.[0]?.name || "Keine Kategorie"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default EditComponent;
