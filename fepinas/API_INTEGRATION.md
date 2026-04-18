# Steam Analytics Dashboard - API Integration Guide

## Overview

This Steam Analytics Dashboard is designed to integrate with a backend API running at `http://127.0.0.1:8000`. The application will automatically fall back to mock data if the API is unavailable, ensuring a seamless development and testing experience.

## API Endpoints

### 1. Get Games by Category
**Endpoint:** `GET /api/games/{category}`

**Parameters:**
- `category` (string): One of `hidden-gems`, `best-value`, `toxic-games`, or `popular-games`

**Expected Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "score": number,
    "rank": number,
    "category": "string"
  }
]
```

**Example:**
```bash
curl http://127.0.0.1:8000/api/games/hidden-gems
```

### 2. Get Game Detail
**Endpoint:** `GET /api/game/{gameId}`

**Parameters:**
- `gameId` (string): Unique identifier for the game

**Expected Response:**
```json
{
  "id": "string",
  "name": "string",
  "rank": number,
  "hiddenGemsScore": number,
  "valueScore": number,
  "toxicityScore": number,
  "popularityScore": number,
  "totalScore": number,
  "players": number,
  "price": number,
  "rating": number
}
```

**Example:**
```bash
curl http://127.0.0.1:8000/api/game/game-123
```

## How It Works

### API Integration Layer

The application uses a centralized API layer located in `/src/app/lib/api.ts` that:

1. **Attempts to fetch from the real API** at `http://127.0.0.1:8000`
2. **Automatically falls back to mock data** if the API is unavailable
3. **Provides TypeScript types** for all data structures
4. **Handles errors gracefully** with console warnings

### Usage in Components

```typescript
import { fetchGamesByCategory, fetchGameDetail } from "../lib/api";

// Fetch games by category
const games = await fetchGamesByCategory("hidden-gems");

// Fetch game details
const gameDetail = await fetchGameDetail("game-123");
```

## Starting Your Backend API

To connect the dashboard to your backend:

1. Ensure your API server is running at `http://127.0.0.1:8000`
2. Implement the two endpoints listed above
3. The frontend will automatically detect and use your API
4. Check the browser console for connection status

## CORS Configuration

If you encounter CORS errors, ensure your backend API includes the following headers:

```python
# Example for Python/FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Mock Data

When the API is unavailable, the application uses realistic mock data:

- **Hidden Gems:** Popular indie games like Celeste, Hollow Knight, etc.
- **Best Value:** Games known for great value like Portal 2, Terraria, etc.
- **Toxic Games:** Games with known community issues
- **Popular Games:** Current trending and popular titles

This allows full frontend development and testing without requiring a backend connection.

## Development Tips

1. **Test with API offline first** to verify the fallback works correctly
2. **Monitor the browser console** to see which data source is being used
3. **Customize mock data** in `/src/app/lib/api.ts` to match your needs
4. **TypeScript types ensure** data consistency between API and frontend

## Theme System

The dashboard features "The Duality of Realms" theme system:

- **Dark Mode (Space Theme):** Cosmic backgrounds with nebula effects, floating astronauts, shooting stars
- **Light Mode (Nature Theme):** Forest atmosphere with butterflies, falling leaves, parallax trees
- **Celestial Gate Transition:** Magical theme switching with visual effects

Toggle between themes using the button in the top-right corner of any page.
