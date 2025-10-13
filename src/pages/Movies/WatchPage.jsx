import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { getMovieDetail } from "../../services/api";
import Loading from "../../components/shared/loading";

function WatchPage() {
  const { slug } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState(0); // Tập đang chọn
  const [selectedServer, setSelectedServer] = useState(0); // Server đang chọn
  const [episodes, setEpisodes] = useState(null); // Danh sách tập phim
  const [movieInfo, setMovieInfo] = useState(null);
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(null); // Xử lý lỗi

  useEffect(() => {
    getMovieDetail(slug)
      .then((datas) => {
        const data = datas.data.item;
        // Lưu thông tin phim và danh sách server
        setMovieInfo(data);
        setServers(data.episodes);

        // Lấy danh sách tập từ server đầu tiên
        const firstServer = data.episodes[0];
        if (firstServer && firstServer.server_data) {
          setEpisodes(firstServer.server_data);
        } else {
          setError("Không tìm thấy dữ liệu tập phim.");
          setEpisodes([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Lỗi khi tải dữ liệu: " + err.message);
        setEpisodes([]);
      });
  }, [slug]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);
  // Xử lý chọn server
  const handleServerChange = (serverIndex) => {
    setSelectedServer(serverIndex);
    setCurrentEpisode(0); // Reset tập về đầu khi đổi server
    setEpisodes(servers[serverIndex]?.server_data || []);
  };

  // Trạng thái đang tải
  if (!episodes || !movieInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="text-center w-80">
          <Loading />
        </div>
      </div>
    );
  }

  // Trạng thái lỗi
  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-lg font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-blue-500 rounded-full"></div>
            <h2 className="text-xl lg:text-2xl font-bold">
              {episodes[currentEpisode]?.filename ||
                `Tập ${currentEpisode + 1}`}
            </h2>
          </div>
          <div className="flex gap-2">
            {servers.map((server, index) => (
              <button
                key={index}
                onClick={() => handleServerChange(index)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    selectedServer === index
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-gray-200 hover:bg-slate-600"
                  }`}
              >
                {server.server_name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Trình phát video */}
          <div className="xl:col-span-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 shadow-xl">
              <div className="relative aspect-video">
                <iframe
                  src={episodes[currentEpisode]?.link_embed}
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className=" flex items-center p-4 justify-between text-sm text-gray-400">
                <span>Chất lượng: {movieInfo.quality || "HD"}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Đang phát</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách tập phim */}
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/50 shadow-xl">
              <div className="p-4 border-b border-slate-700/50">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AiOutlineVideoCamera className="w-5 h-5 text-emerald-400" />
                  Danh sách tập
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Tổng cộng {episodes.length} tập
                </p>
              </div>
              <div className="p-4 max-h-80 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-4 sm:grid-cols-6 xl:grid-cols-4 gap-2">
                  {episodes.map((episode, index) => {
                    const isActive = currentEpisode === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentEpisode(index)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            isActive
                              ? "bg-emerald-600 text-white shadow-md"
                              : "bg-slate-700 text-gray-200 hover:bg-slate-600 hover:text-white"
                          }`}
                      >
                        {episode.name || index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Điều hướng tập */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setCurrentEpisode(Math.max(0, currentEpisode - 1))
                }
                disabled={currentEpisode === 0}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    currentEpisode === 0
                      ? "bg-slate-700/30 text-gray-500 cursor-not-allowed"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
              >
                ← Tập trước
              </button>
              <button
                onClick={() =>
                  setCurrentEpisode(
                    Math.min(episodes.length - 1, currentEpisode + 1)
                  )
                }
                disabled={currentEpisode === episodes.length - 1}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    currentEpisode === episodes.length - 1
                      ? "bg-slate-700/30 text-gray-500 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
              >
                Tập sau →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </div>
  );
}

export default WatchPage;
