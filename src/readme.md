# Mein React ArticleCard Block Plugin

Dieses Plugin fügt einen benutzerdefinierten Block in WordPress hinzu. Es wurde mit React und TypeScript entwickelt und enthält einige zusätzliche Funktionen, die nicht gefordert waren, um die Benutzererfahrung zu verbessern.

## Motivation

Die Aufgabe war, ein Block-Plugin zu erstellen. Ich habe mich für TypeScript entschieden, weil es mehr Typensicherheit und besseren Code-Support bietet. Zudem wollte ich Redux integrieren, da es die Verwaltung des Zustands effizienter gestaltet.

## ruhrnachrichten API

Für die Aufgabe war es erforderlich, eine geeignete API zu untersuchen, um die neuesten 12 Artikel als Kacheln darzustellen. Diese Kacheln sollen jeweils das Artikelbild, den Titel, den Namen des Autors sowie die Kategorie, in der der Artikel veröffentlicht wurde, beinhalten.

Die API, die ich hierfür analysiert habe, stammt von Ruhrnachrichten und ist über folgenden Endpunkt abrufbar: https://www.ruhrnachrichten.de/wp-json/wp/v2/posts?per_page=12&orderby=date&order=desc&_embed&status=publish. Dieser Endpunkt liefert die letzten 12 Artikel in absteigender Reihenfolge nach Datum, was ideal ist, um stets die aktuellsten Veröffentlichungen in meiner Anwendung anzuzeigen.

Da der API-Response durch das \_embed-Parameter erweitert wird, erhalte ich alle eingebetteten Daten, die nötig sind, um die Artikel optisch ansprechend und informativ als Kachel darzustellen. Insbesondere sind hier das Titelbild (Featured Image), der Artikel-Titel, der Autor und die Kategorie verfügbar, was die Implementierung erheblich vereinfacht und mir erlaubt, die gewünschten Informationen effizient in die Kachel-Ansicht einzubinden.

## Installation

1. Lade das ZIP-Archiv des Plugins hoch.
2. Installiere und aktiviere das Plugin in WordPress.

## Features

- **React & TypeScript**: Für bessere Wartbarkeit und Typsicherheit.
- **Zusätzliche Filter**: Die Filterfunktionen sind optional, aber ich habe sie hinzugefügt, um die Benutzerfreundlichkeit zu steigern.
- **Custom Styles**: Ich habe SCSS verwendet, um die Styles klar zu organisieren und erweiterbar zu machen.

## Codebeispiel

```typescript
import React, { useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Klicks: {count}</button>;
}

```

## Clean Code

Ja, ich wende "Clean Code"-Prinzipien in meiner täglichen Arbeit an. Dabei versuche ich zu achten besonders auf:

- Klare Benennungen: Ich verwende sprechende Namen für Variablen und Funktionen, sodass ihre Bedeutung direkt ersichtlich ist.
- Vermeidung von Redundanz: Ich wende das DRY-Prinzip an, um doppelten Code zu vermeiden, was Änderungen und Wartung erleichtert.
- Konsistente Formatierung: Ich halte mich an einheitliche Formatierungsregeln, um den Code optisch sauber und lesbar zu gestalten.
- Tests: Wann immer möglich, schreibe ich Tests, doch in der Realität hängt dies oft von den Anforderungen und dem Projektumfang ab.

Diese Prinzipien helfen mir, Code zu schreiben, der auch für andere Entwickler leicht verständlich und wartbar ist.

## OOP oder funktional

Ich programmiere hauptsächlich objektorientiert (OOP), da dies für komplexe Projekte eine strukturierte und modulare Entwicklung ermöglicht. Durch die Verwendung von Klassen und Objekten kann ich den Code in wiederverwendbare und logisch organisierte Einheiten aufteilen, was Wartung und Erweiterbarkeit vereinfacht. Wenn jedoch kleinere, spezifische Aufgaben erforderlich sind, nutze ich auch funktionale Programmiertechniken, da diese oft zu einem kürzeren und klareren Code führen.
