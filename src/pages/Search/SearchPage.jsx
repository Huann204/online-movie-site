// SearchPage.jsx
import React, { useState, useEffect } from "react";
// import Movie from "./Movie"; // import component đã tách
import { useSearchParams } from "react-router-dom";

import { searchMovies } from "../../services/api";
import MovieCard from "../../components/shared/MovieCard";
function SearchPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const keyword = searchParams.get("q") || "";
    setQuery(keyword);

    if (!keyword) return;

    setLoading(true);
    searchMovies(keyword)
      .then((res) => {
        setData(res.data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tìm kiếm:", err);
        setLoading(false);
      });
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-[#09121d] min-h-screen text-white px-4 py-6">
      <div className="max-w-[1320px] mx-auto">
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            placeholder="Tìm phim..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded-md bg-[#1a1c21] border border-gray-600"
          />
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
          <MovieCard data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
