# Mein React ArticleCard Block Plugin

Dieses Plugin fügt einen benutzerdefinierten Block in WordPress hinzu. Es wurde mit React und TypeScript entwickelt und enthält einige zusätzliche Funktionen, die nicht gefordert waren, um die Benutzererfahrung zu verbessern.

## Motivation

Die Aufgabe war, ein Block-Plugin zu erstellen. Ich habe mich für TypeScript entschieden, weil es mehr Typensicherheit und besseren Code-Support bietet. Zudem wollte ich Redux integrieren, da es die Verwaltung des Zustands effizienter gestaltet.

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
