import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import Loading from "./Loading";

function MovieCard({ data, loading }) {
  if (loading) {
    return (
      <div className="col-span-full flex justify-center items-center py-10 ">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-80">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="col-span-full text-center py-12 ">
        <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 hover:scale-102 transition-transform duration-300">
          <div className="text-6xl mb-4 ">🎬</div>
          <p className="text-gray-300 text-lg font-medium mb-2">
            Không có phim nào
          </p>
          <p className="text-gray-500 text-sm">
            Hãy thử tìm kiếm với từ khóa khác
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {data.map((item, index) => (
        <MovieCardItem key={item.slug || index} item={item} index={index} />
      ))}
    </>
  );
}

function MovieCardItem({ item, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`group transform transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95"
      }`}
    >
      <Link to={`/phim/${item.slug}`}>
        <div className="relative w-full h-[300px] overflow-hidden rounded-xl shadow-xl bg-gray-800 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {/* Movie poster */}
          <img
            src={`https://img.phimapi.com/${item.poster_url}`}
            alt={item.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quality badge */}
          {item.quality && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-md shadow-lg transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {item.quality}
            </div>
          )}

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110 active:scale-95">
              <FaPlay className="text-gray-800 text-xl ml-1" />
            </div>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

          {/* Border glow */}
          <div className="absolute inset-0 rounded-xl ring-2 ring-yellow-500/0 group-hover:ring-yellow-500/30 transition-all duration-300"></div>
        </div>
      </Link>

      <Link to={`/phim/${item.slug}`}>
        <div className="mt-4 space-y-2 group-hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-sm text-gray-100 font-semibold tracking-wide line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
            {item.name}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-1 group-hover:text-gray-300 transition-colors duration-300">
            {item.origin_name}
          </p>

          {/* Year and genre info */}
          {(item.year || item.genre) && (
            <div className="flex items-center space-x-2 text-xs text-gray-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {item.year && (
                <span className="px-2 py-1 bg-gray-800 rounded-md group-hover:bg-gray-700 transition-colors duration-300">
                  {item.year}
                </span>
              )}
              {item.genre && (
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {item.genre}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
