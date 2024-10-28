import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./ArtikelCard.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { fetchArticles } from "../api/api.ruhrnachrichten";
import { Article } from "../interfaces/IArticle";

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
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      const result = await fetchArticles();
      if (result.success) {
        setArticles(result.data || []);
      } else {
        setError(result.error || "Unbekannter Fehler");
      }
    };

    loadArticles();
  }, []);

  if (error) {
    return <div className="error">Fehler beim Laden der Artikel: {error}</div>;
  }

  return (
    <div className="frontend">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Card sx={{ margin: 2 }} key={article.id}>
            <CardContent>
              <CardMedia component="img" height="auto" image={article._embedded["wp:featuredmedia"][0].source_url} alt={article.title.rendered || "Kein Titel"} />
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
        ))
      ) : (
        <div>Keine Artikel gefunden</div>
      )}
    </div>
  );
}

export default OurComponent;
