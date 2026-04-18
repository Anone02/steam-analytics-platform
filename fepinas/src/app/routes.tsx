import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { RankingPage } from "./pages/RankingPage";
import { DetailPage } from "./pages/DetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/ranking/:category",
    Component: RankingPage,
  },
  {
    path: "/detail/:gameId",
    Component: DetailPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);