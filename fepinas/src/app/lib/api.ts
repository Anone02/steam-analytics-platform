const API_BASE_URL = "http://127.0.0.1:8000";

export interface GameData {
  id: string;
  name: string;
  score: number;
  rank: number;
  category: string;
}

export interface GameDetail {
  id: string;
  name: string;
  rank: number;
  hiddenGemsScore: number;
  valueScore: number;
  toxicityScore: number;
  popularityScore: number;
  totalScore: number;
  players: number;
  price: number;
  rating: number;
}

/**
 * Fetch games by category from REAL API
 */
export async function fetchGamesByCategory(category: string): Promise<GameData[]> {
  try {
    const mapCategory: Record<string, string> = {
      "hidden-gems": "hidden",
      "best-value": "value",
      "toxic-games": "toxic",
      "popular-games": "popular",
    };

    const type = mapCategory[category] || "popular";

    const response = await fetch(
      `${API_BASE_URL}/scores?type=${type}&limit=50`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data.map((item: any, index: number) => {
      let score = 0;

      if (category === "hidden-gems") score = item.hidden_gem_score;
      if (category === "best-value") score = item.value_score;
      if (category === "toxic-games") score = item.toxic_score;
      if (category === "popular-games") score = item.popularity_score;

      return {
        id: String(item.appid),
        name: item.name,
        score: score,
        rank: index + 1,
        category,
      };
    });
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return []; // 🔥 biar gak crash (ganti dari mock)
  }
}

/**
 * Fetch detailed game information by ID
 * (sementara ambil dari list API juga)
 */
export async function fetchGameDetail(gameId: string): Promise<GameDetail> {
  try {
    const types = ["hidden", "value", "toxic", "popular"];

    let allData: any[] = [];

    for (const type of types) {
      const response = await fetch(
        `${API_BASE_URL}/scores?type=${type}&limit=50`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.warn(`❌ Failed fetch type=${type}`);
        continue;
      }

      const data = await response.json();
      allData = [...allData, ...data];
    }

    console.log("🔥 ALL DATA:", allData);

    const game = allData.find(
      (item: any) => String(item.appid) === gameId
    );

    if (!game) {
      throw new Error("Game not found");
    }

    return {
      id: String(game.appid),
      name: game.name,
      rank: 0,

      hiddenGemsScore: game.hidden_gem_score || 0,
      valueScore: game.value_score || 0,
      toxicityScore: game.toxic_score || 0,
      popularityScore: game.popularity_score || 0,

      totalScore:
        (
          (game.hidden_gem_score || 0) +
          (game.value_score || 0) +
          (game.toxic_score || 0) +
          (game.popularity_score || 0)
        ) / 4,

      players: 0,
      price: 0,
      rating: 0,
    };
  } catch (error) {
    console.error("❌ DETAIL ERROR:", error);
    throw error;
  }
}