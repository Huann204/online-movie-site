import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Pagination from "../../components/shared/Pagination";

import MovieList from "../../components/shared/MovieList";

function AllMovies({ limit }) {
  const { slug } = useParams();
  // console.log(slug);

  const titleMap = {
    "tv-shows": "TV SHOWS Đề Cử",
    "hoat-hinh": "Phim Hoạt Hình",
    "phim-kinh-di": "Phim Kinh Dị",
    "phim-hanh-dong": "Phim Hành Động",
    "phim-vien-tuong": "Phim Viễn Tưởng",
    "phim-bo": "PHIM BỘ ĐỀ CỬ",
    "phim-le": "Phim Lẻ Đề Cử",
    "phim-vietsub": "PHIM VIETSUB",
  };

  const title = titleMap[slug] || "Tất cả phim";

  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState(null);

  const handleDataFetched = (data) => {
    setMovies(data); // Cập nhật dữ liệu vào state
  };
  // console.log(movies.data.params.totalPages);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div>
      <MovieList
        genreSlug={slug}
        title={title}
        limit={limit}
        page={currentPage}
        onDataFetched={handleDataFetched}
      />
      {movies && (
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={movies.data.params.pagination.totalPages}
        />
      )}
    </div>
  );
}

export default AllMovies;
