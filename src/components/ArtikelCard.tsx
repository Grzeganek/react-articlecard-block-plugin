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
        console.log("Daten", articles);
      } else {
        setError(result.error || "Unbekannter Fehler");
      }
    };

    loadArticles();
  }, []);

  const data = {
    card: {
      featured_media_url: "https://example.com/path/to/image.jpg",
      title: {
        rendered: "Beispieltitel für einen Artikel",
      },
      author: {
        name: "Max Mustermann",
      },
      category: {
        name: "Nachrichten",
      },
    },
  };
  return (
    <div className="frontend">
      <Card sx={{ margin: 2 }}>
        <CardMedia component="img" height="140" image={data.card.featured_media_url} alt={data.card.title.rendered} />
        <CardContent>
          <Typography variant="h5" color="red" component="div">
            {data.card.title.rendered}
          </Typography>
          <Typography variant="h5" color="blue" component="div">
            Autor: {data.card.author.name}
          </Typography>
          <Typography variant="h5" color="text.secondary" component="div">
            Kategorie: {data.card.category.name}
          </Typography>
        </CardContent>
      </Card>

      <p>
        <Button sx={{ marginTop: 1, marginRight: 1 }} variant="contained">
          Toggle view grass color !!!
        </Button>
        <Button sx={{ marginTop: 1 }} variant="contained">
          Toggle view sky color ???
        </Button>
      </p>
    </div>
  );
}

export default OurComponent;
