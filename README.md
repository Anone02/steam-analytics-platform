# 🚀 Steam Analytics Dashboard

> A modern **data-driven SaaS application** that transforms raw Steam game data into actionable insights.

This project goes beyond a typical dashboard by combining **data engineering, backend APIs, and interactive frontend visualization** to uncover patterns such as hidden gems, toxic communities, and value-for-money games.

---

## 🧠 Why This Project Matters

Most dashboards only display data.
This project is built to **extract insights**.

It answers questions like:

- Which great games are underrated?
- Which communities are toxic?
- Which games give the best value for money?

---

## ✨ Core Features

### 🎯 Insight Engine

- **Hidden Gems Detection**
  High rating + low popularity

- **Best Value Score**
  Playtime vs price optimization

- **Toxic Community Analysis**
  Based on review sentiment patterns

- **Popularity Ranking**
  Trending & most played games

---

### 📊 Interactive Dashboard

- Dynamic category filtering (Hidden, Value, Toxic, Popular)
- Sortable rankings (ascending / descending)
- Smooth UI interactions & transitions
- Clean SaaS-style layout (inspired by Stripe / Vercel)

---

### 🔎 Search & Exploration

- Real-time search via API
- Fast filtering and data retrieval
- Seamless UX between discovery → detail view

---

### 📄 Game Detail View

Each game includes:

- Full score breakdown:
  - `hidden_gem_score`
  - `value_score`
  - `toxic_score`
  - `popularity_score`

- Data visualization:
  - Bar chart (comparison)
  - Radar chart (multi-metric insight)

- Explanation of why the game belongs to a category

---

### 📈 Summary Insights

- Total games analyzed
- Top hidden gem
- Most toxic game
- Aggregated statistics

---

## 🏗️ Architecture Overview

```id="arch1"
Data → Processing → FastAPI → REST API → React Dashboard → Visualization
```

This project demonstrates **end-to-end data flow**, from raw data processing to user-facing insights.

---

## ⚙️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- shadcn/ui
- Recharts

### Backend

- FastAPI (Python)
- REST API design

### Data & Logic

- Custom scoring algorithms
- Data transformation & aggregation

---

## 🔌 API Endpoints

```id="api1"
GET /scores?type=hidden|value|toxic|popular&limit=20
GET /games/{appid}
GET /search?q=keyword
GET /summary
```

---

## 📊 Example Data

```id="data1"
{
  "appid": 620,
  "name": "Portal 2",
  "hidden_gem_score": 98.7,
  "value_score": 87.3,
  "toxic_score": 5.1,
  "popularity_score": 82.4
}
```

---

## 🚀 What I Built & Learned

- Designed a **fullstack data product**, not just a UI
- Built REST APIs for structured data delivery
- Created custom scoring systems for analytics
- Transformed raw data into meaningful insights
- Developed an interactive SaaS-style dashboard
- Handled async data fetching, loading states, and errors

---

## 💼 Skills Demonstrated

- Fullstack Development (React + FastAPI)
- Data Modeling & Scoring Logic
- API Design & Integration
- Data Visualization
- UX for analytics dashboards

---

## 📌 Potential Improvements

- Normalize all scores to a consistent 0–100 scale
- Add authentication & user personalization
- Deploy to cloud (Vercel + Railway)
- Implement real-time data pipeline (Kafka)
- Add AI-generated insight explanations

---

## 🧑‍💻 Author

Built as a portfolio project to demonstrate **data-driven product thinking and fullstack engineering skills**.

---

## ⭐ Final Note

This is not just a dashboard —
it’s a **data product that turns information into insight**.
