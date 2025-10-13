import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { getMovieDetail } from "../../services/api";
import Loading from "../../components/shared/loading";
import { MdMovie } from "react-icons/md";

function MovieDetailPage() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetail(slug)
      .then((data) => setMovie(data.data.item))
      .catch((err) => console.error(err));
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="text-center w-80 ">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="relative">
        {/* Background */}
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={movie.thumb_url}
            alt={movie.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Layout */}
            <div className="block md:hidden">
              <h1 className="text-xl sm:text-2xl font-bold mb-2 text-white leading-tight">
                {movie.name}
              </h1>

              {movie.origin_name && (
                <h2 className="text-sm sm:text-base text-gray-300 mb-3 font-light">
                  {movie.origin_name}
                </h2>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-red-600 px-2 py-1 rounded-full text-xs font-semibold text-white">
                  {movie.quality}
                </span>
                <span className="bg-blue-600 px-2 py-1 rounded-full text-xs font-semibold text-white">
                  {movie.lang}
                </span>
                <span className="bg-green-600 px-2 py-1 rounded-full text-xs font-semibold text-white">
                  {movie.year}
                </span>
                <span className="bg-purple-600 px-2 py-1 rounded-full text-xs font-semibold text-white">
                  {movie.time}
                </span>
              </div>

              <Link to={`/watch/${slug}`}>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2">
                  <FaPlay />
                  Xem Phim
                </button>
              </Link>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex gap-6 lg:gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  className="w-48 h-72 lg:w-64 lg:h-96 object-cover rounded-lg shadow-2xl border-4 border-gray-700"
                  src={movie.poster_url}
                  alt={movie.name}
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                  {movie.name}
                </h1>

                {movie.origin_name && (
                  <h2 className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 font-light">
                    {movie.origin_name}
                  </h2>
                )}

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {movie.quality}
                  </span>
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {movie.lang}
                  </span>
                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {movie.year}
                  </span>
                  <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {movie.time}
                  </span>
                </div>

                <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-4xl line-clamp-5 ">
                  {movie.content}
                </p>

                <Link to={`/watch/${slug}`}>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-3">
                    <FaPlay />
                    Xem Phim
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content Section - Show poster and description */}
      <div className="block md:hidden bg-gray-900 px-3 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 mb-4">
            <img
              className="w-24 h-36 object-cover rounded-lg shadow-xl border-2 border-gray-700 flex-shrink-0"
              src={movie.poster_url}
              alt={movie.name}
            />
            <div className="flex-1 min-w-0">
              <p className="text-gray-200 text-sm leading-relaxed line-clamp-6">
                {movie.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto p-3 sm:p-6 md:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-6 lg:space-y-8">
            {/* Categories */}
            {movie.category && movie.category.length > 0 && (
              <div className="bg-gray-800/80 backdrop-blur rounded-xl p-3 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-500"></span>
                  Thể Loại
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.category.map((cat, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all cursor-pointer"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cast */}
            {movie.actor && movie.actor.length > 0 && (
              <div className="bg-gray-800/80 backdrop-blur rounded-xl p-3 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4 flex items-center gap-2">
                  Diễn Viên
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {movie.actor.map((actor, index) => (
                    <div
                      key={index}
                      className="bg-gray-700/50 hover:bg-gray-600/50 px-3 py-2 rounded-lg text-gray-200 transition-colors border border-gray-600 text-sm"
                    >
                      {actor}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Director */}
            {movie.director && movie.director.length > 0 && (
              <div className="bg-gray-800/80 backdrop-blur rounded-xl p-3 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4 flex items-center gap-2">
                  Đạo Diễn
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.director.map((director, index) => (
                    <div
                      key={index}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors text-sm"
                    >
                      {director}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-3 sm:space-y-6">
            <div className="bg-gray-800/80 backdrop-blur rounded-xl p-3 sm:p-6 border border-gray-700">
              <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-4">
                Thông Tin Chi Tiết
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-start border-b border-gray-600 pb-1.5">
                  <span className="text-gray-400 flex-shrink-0 mr-2 text-xs">
                    Tên gốc:
                  </span>
                  <span className="text-white font-medium text-right text-xs leading-tight">
                    {movie.origin_name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1.5">
                  <span className="text-gray-400 text-xs">Năm:</span>
                  <span className="text-white font-medium text-xs">
                    {movie.year}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1.5">
                  <span className="text-gray-400 text-xs">Thời lượng:</span>
                  <span className="text-white font-medium text-xs">
                    {movie.time}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-600 pb-1.5">
                  <span className="text-gray-400 text-xs">Chất lượng:</span>
                  <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                    {movie.quality}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1.5">
                  <span className="text-gray-400 text-xs">Ngôn ngữ:</span>
                  <span className="text-white font-medium text-xs">
                    {movie.lang}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-600 pb-1.5">
                  <span className="text-gray-400 text-xs">Trạng thái:</span>
                  <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                    {movie.status === "completed" ? "Hoàn thành" : movie.status}
                  </span>
                </div>
                {movie.country && movie.country.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs">Quốc gia:</span>
                    <span className="text-white font-medium text-xs">
                      {movie.country[0].name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Watch Button */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-3 sm:p-6 text-center">
              <h4 className="text-white font-bold text-sm sm:text-lg mb-2 sm:mb-4">
                Sẵn sàng xem?
              </h4>
              <Link to={`/watch/${slug}`}>
                <button className="w-full bg-white hover:bg-gray-100 text-red-600 py-3 rounded-lg font-bold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <FaPlay />
                  Xem Ngay
                </button>
              </Link>

              {movie.trailer_url && (
                <a
                  href={movie.trailer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 sm:mt-3 text-white hover:text-gray-200 text-base underline"
                >
                  <div className="flex items-center justify-center ">
                    <MdMovie className="mr-1" color="orange" /> Xem Trailer
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
