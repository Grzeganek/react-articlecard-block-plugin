// api.ts

// Importierte Typen
import axios from "axios";
import { Article } from "../interfaces/IArticle";

// Typen für den Rückgabewert der Funktion
interface ApiResponse {
  success: boolean;
  data?: Article[];
  error?: string;
}

// Asynchrone Funktion zum Abrufen von Artikeldaten mit Axios
export const fetchArticles = async (): Promise<ApiResponse> => {
  const url = "https://www.ruhrnachrichten.de/wp-json/wp/v2/posts?per_page=12&orderby=date&order=desc&_embed&status=publish";

  try {
    // API-Anfrage mit Axios
    const response = await axios.get<Article[]>(url);

    // Erfolgreiche Rückgabe der Daten
    console.log("Daten von API", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    // Fehlerbehandlung für Axios-Fehler
    const errorMessage = axios.isAxiosError(error) && error.response ? `Fehler beim Laden der Artikel: ${error.response.status}` : "Ein unbekannter Fehler ist aufgetreten";

    console.error("API-Fehler:", errorMessage);
    return { success: false, error: errorMessage };
  }
};
