import { Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import "./ArtikelCard.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { fetchArticles } from "../api/api.ruhrnachrichten";
import { Article } from "../interfaces/IArticle";

const divsToUpdate = document.querySelectorAll(".update");

divsToUpdate.forEach((div) => {
  const preElement = div.querySelector("pre");

  if (preElement) {
    const data = JSON.parse(preElement.innerText);
    const root = ReactDOM.createRoot(div);
    root.render(<OurComponent {...data} />);
    div.classList.remove("update");
  }
});

function OurComponent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);

      // Simulierten Fortschritt starten
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 95 : prev + 5));
      }, 250); // Fortschritt alle 250ms um 5% erhöhen, bis 90% erreicht ist

      // API-Anfrage starten
      const result = await fetchArticles();

      clearInterval(progressInterval); // Stoppe den Fortschritts-Timer
      setProgress(100); // Fortschritt auf 100% setzen, wenn die Daten vollständig geladen sind

      if (result.success) {
        setArticles(result.data || []);
      } else {
        setError(result.error || "Unbekannter Fehler");
      }
      setIsLoading(false);
    };

    loadArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-indicator" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CircularProgress variant="determinate" value={progress} />
        <Typography variant="h4">Ruhr Nachrichten </Typography>
        <Typography variant="body1" color="text.secondary" style={{ marginTop: "10px" }}>
          Bitte warten, Nachrichten werden geladen... ({progress}%)
        </Typography>
      </div>
    );
  }

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
