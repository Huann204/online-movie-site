// import HomePage from "./Content/HomePage.jsx";
import { Routes, Route } from "react-router-dom";
import AllMovies from "../pages/Movies/AllMovies";
import HomePage from "../pages/Home/HomePage";
import SearchPage from "../pages/Search/SearchPage";

import WatchPage from "../pages/Movies/WatchPage";

import MovieDetailPage from "../pages/Movies/MovieDetailPage";
import CategoryPage from "../components/ui/CategoryPage";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tim-kiem" element={<SearchPage />} />
        <Route path="/phim/:slug" element={<MovieDetailPage />} />
        <Route path="/watch/:slug" element={<WatchPage />} />
        <Route
          path="/phim-hanh-dong"
          element={
            <CategoryPage
              genreSlug="hanh-dong"
              title="Phim Hành động"
              limit="18"
            />
          }
        />
        <Route
          path="/phim-kinh-di"
          element={
            <CategoryPage genreSlug="kinh-di" title="Phim Kinh Dị" limit="18" />
          }
        />
        <Route
          path="/phim-tinh-cam"
          element={
            <CategoryPage
              genreSlug="tinh-cam"
              title="Phim Tình Cảm"
              limit="18"
            />
          }
        />
        <Route
          path="/phim-vien-tuong"
          element={
            <CategoryPage
              genreSlug="vien-tuong"
              title="Phim Viễn Tưởng"
              limit="24"
            />
          }
        />
        <Route path="tat-ca/:slug" element={<AllMovies limit="18" />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
