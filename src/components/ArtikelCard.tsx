import { Card, CardContent, CardMedia, Typography, CircularProgress, Grid, Button } from "@mui/material";
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

  // Zustand für die maximale Anzahl an API-Aufrufen
  const [pollingCount, setPollingCount] = useState<number>(0);
  const maxPollingCount = 10; // Maximal 10 Aktualisierungen

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 95 : prev + 5));
      }, 250);

      const result = await fetchArticles();

      clearInterval(progressInterval);
      setProgress(100);

      if (result.success) {
        setArticles(result.data || []);
        setError(null); // Fehler zurücksetzen, falls vorher ein Fehler auftrat
      } else {
        setError(result.error || "Unbekannter Fehler");
      }
      setIsLoading(false);
    };

    // Erstmaliger API-Aufruf
    loadArticles();

    // Polling nur ausführen, wenn die maximale Anzahl noch nicht erreicht wurde
    if (pollingCount < maxPollingCount) {
      const intervalId = setInterval(() => {
        loadArticles();
        setPollingCount((prev) => prev + 1); // Erhöhe den Zähler
      }, 180000); // Aktualisiere alle 180 Secunden

      // Säubere das Intervall bei Komponenten-Unmount
      return () => clearInterval(intervalId);
    }
  }, [pollingCount]); // Abhängig von `pollingCount`

  if (isLoading) {
    return (
      <div className="loading-indicator" style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress variant="determinate" value={progress} />
        <Typography variant="h4">Ruhr Nachrichten</Typography>
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
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Ruhr Nachrichten
      </Typography>
      <Grid container spacing={2}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Grid item xs={12} sm={6} md={6} key={article.id}>
              <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <CardMedia component="img" height="200" image={article?._embedded["wp:featuredmedia"][0]?.source_url} alt={article.title.rendered || "Kein Titel"} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontSize: "1em", paddingBottom: 2 }} variant="h6" color="text.primary">
                    {article?.title?.rendered}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Autor: {article?._embedded?.author?.[0]?.name || "Unbekannt"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kategorie: {article?._embedded?.["wp:term"]?.[0]?.[0]?.name || "Keine Kategorie"}
                  </Typography>
                </CardContent>
                <Button
                  href={article.link} // `article.link` sollte die URL des Artikels enthalten
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ margin: 1 }}
                  variant="contained"
                  color="primary"
                >
                  Details anzeigen
                </Button>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Keine Artikel gefunden</Typography>
        )}
      </Grid>
    </div>
  );
}

export default OurComponent;
