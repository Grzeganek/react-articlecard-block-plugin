// Schnittstelle für die Komponente
export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: { rendered: string };
  _embedded: {
    author: Author[];
    "wp:term": Category[][];
  };
  featured_media_url: string;
}
