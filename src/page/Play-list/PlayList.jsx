import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from "../../services/apiService";
import { toast } from "react-toastify";

function PlaylistDiv({ songId, onClose }) {
  const [privatePlaylists, setPrivatePlaylists] = useState([]); // Dữ liệu từ API cá nhân
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState(""); // Tên playlist khi tạo mới
  const [isPublic, setIsPublic] = useState(false);
  const [activeTab, setActiveTab] = useState("myPlaylists");
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name;

  // Gọi API ngay khi component render lần đầu
  useEffect(() => {
    fetchPlaylists();
  }, [songId]);

  const fetchPlaylists = async () => {
    setLoading(true);
    if (localStorage.getItem("user")) {
      try {
        const user_id = user.id;
        // Gọi API cá nhân
        const privateResponse = await fetch(
          `${API_URL}/playlist-user/${user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const privateData = await privateResponse.json();
        setPrivatePlaylists(privateData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  // Hàm xử lý thêm bài hát vào playlist
  const handleAddSongToPlaylist = async (playlistId) => {
    try {
      const response = await fetch(
        `${API_URL}/playlist-user/${playlistId}/add-song`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ song_id: songId }), // Truyền song_id vào body
        }
      );

      if (response.ok) {
        const errorData = await response.json();
        toast.success(
          errorData.message || "Bài hát đã được thêm vào playlist!"
        );
      } else {
        const errorData = await response.json();
        console.error("Error adding song:", errorData);
        toast.error(
          errorData.message || "Không thể thêm bài hát vào playlist."
        );
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast.error("Đã xảy ra lỗi khi thêm bài hát.");
    }
  };

  // Hàm xử lý khi tạo playlist mới
  const handleCreatePlaylist = async () => {
    if (!playlistName) {
      toast.error("Vui lòng nhập tên playlist.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/playlist-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          playlist_name: playlistName,
          share: isPublic,
          user_id: user.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Tạo playlist thành công!");
        setPlaylistName("");
        fetchPlaylists();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Không thể tạo playlist.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tạo playlist.");
    }
  };

  return (
    <>
      <div
        className="fixed top-0 bottom-0 right-0 left-0 z-20 flex items-center justify-center text-white bg-slate-800/50"
        onClick={onClose}
      >
        <div
          className="sm:w-[600px] w-full h-[350px] rounded-md bg-medium z-20 p-1"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Thanh điều hướng */}
          <nav className="flex items-center px-7 py-4">
            <div className="text-2xl font-bold pr-5 border-r-1 border-slate-600 border-solid py-3">
              Play List
            </div>
            <div
              className={`font-medium py-4 mx-3 cursor-pointer ${
                activeTab === "myPlaylists" ? "border-b-2 border-white" : ""
              }`}
              onClick={() => {
                setShowCreatePlaylist(false);
                setActiveTab("myPlaylists");
              }}
            >
              Của Tôi
            </div>
            <div
              className={`font-medium py-4 mx-3 cursor-pointer ${
                activeTab === "createPlaylist" ? "border-b-2 border-white" : ""
              }`}
              onClick={() => {
                setShowCreatePlaylist(true);
                setActiveTab("createPlaylist");
              }}
            >
              Tạo Playlist
            </div>
          </nav>

          {/* Nội dung */}
          {showCreatePlaylist ? (
            <div className=" text-white p-5 rounded-md">
              <div className="space-y-6">
                {/* Input tên playlist */}
                <input
                  type="text"
                  placeholder="Nhập tên playlist"
                  className="w-full bg-[#3b3156] text-white placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)} // Lưu giá trị tên playlist
                />
                {/* Công khai toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Công khai</p>
                    <p className="text-sm text-gray-400">
                      Mọi người có thể nhìn thấy playlist này
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)} // Lưu trạng thái công khai
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6C5DD3]"></div>
                  </label>
                </div>
                {/* Nút Tạo Mới */}
                <button
                  className="w-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-opacity-75 text-white font-medium py-3 rounded-md transition duration-300"
                  onClick={handleCreatePlaylist} // Gửi dữ liệu lên API
                >
                  TẠO MỚI
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center h-[250px] py-4">
              {loading ? (
                <div className="text-center text-white ml-10">Đang tải...</div>
              ) : (
                <Swiper
                  spaceBetween={20}
                  slidesPerView="auto" // Số item hiện trong 1 lần
                  className="mySwiper ml-0"
                >
                  {privatePlaylists.map((playlist, index) => (
                    <SwiperSlide key={index} style={{ width: "auto" }}>
                      <div className="rounded-md h-full sm:w-[170px] w-[130px] sm:mx-5  relative group duration-300">
                        <img
                          src={playlist.background}
                          alt={playlist.name}
                          className="w-full rounded-md group-hover:opacity-70 "
                        />
                        <p className="font-medium text-sm mt-2 truncate">
                          {playlist.playlist_name}
                        </p>
                        <p className="text-slate-700 text-sm truncate">
                          {username}
                        </p>
                        <CirclePlus
                          className="absolute top-3 right-3 cursor-pointer group-hover:opacity-100"
                          color="red"
                          onClick={() => handleAddSongToPlaylist(playlist.id)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PlaylistDiv;
