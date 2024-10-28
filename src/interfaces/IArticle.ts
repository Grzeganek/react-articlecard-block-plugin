// Schnittstellen für die Komponente

export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface FeaturedMedia {
  id: number;
  source_url: string;
}

export interface Article {
  id: number;
  title: { rendered: string };
  link: string; // URL des Artikels
  _embedded: {
    author: Author[];
    "wp:term": Category[][];
    "wp:featuredmedia": FeaturedMedia[];
  };
}
