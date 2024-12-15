import React, { useEffect, useState } from "react";
import { CirclePlus, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from "../../services/apiService";
import { toast } from "react-toastify";

function PlaylistDiv({ songId , onClose }) {
  const [privatePlaylists, setPrivatePlaylists] = useState([]); // Dữ liệu từ API cá nhân
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.name;
  // Gọi API ngay khi component render lần đầu
  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      if (localStorage.getItem("user")) {
        try {
          const user_id = user.id;
          // Gọi API cá nhân
          const privateResponse = await fetch(`${API_URL}/playlist-user/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
          const privateData = await privateResponse.json();
          setPrivatePlaylists(privateData);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        } finally {
          setLoading(false);
        }
      }
      
    };

    fetchPlaylists();
  }, [songId]);

   // Hàm xử lý thêm bài hát vào playlist
   const handleAddSongToPlaylist = async (playlistId) => {
    try {
      const response = await fetch(`${API_URL}/playlist-user/${playlistId}/add-song`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ song_id: songId }), // Truyền song_id vào body
      });

      if (response.ok) {
        const errorData = await response.json();
        toast.success( errorData.message || "Bài hát đã được thêm vào playlist!");
      } else {
        const errorData = await response.json();
        console.error("Error adding song:", errorData);
        toast.error(errorData.message || "Không thể thêm bài hát vào playlist.");
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast.error("Đã xảy ra lỗi khi thêm bài hát.");
    }
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-20 flex items-center justify-center text-white bg-slate-800/40" onClick={onClose}>
        <div className="w-[600px] h-[350px] rounded-md bg-medium z-20" onClick={(e) => e.stopPropagation()} >
          {/* Thanh điều hướng */}
          <nav className="flex items-center px-7 py-4">
            <div className="text-2xl font-bold pr-5 border-r-1 border-slate-600 border-solid py-3">
              Play List
            </div>
            <div
              className={`font-medium border-b-2  border-white  border-solid hover:border-white duration-300 py-4 mx-3 cursor-pointer`}
            >
              Của Tôi
            </div>
          </nav>

          {/* Nội dung */}
          <div className="flex items-center h-[250px] px-7 py-4">
            <div className="mr-3 flex-none border border-solid border-slate-200 rounded-md h-full w-[170px] flex flex-col items-center justify-center space-y-4 hover:border-red-400 cursor-pointer group duration-300">
              <CirclePlus className="group-hover:text-red-400" />
              <p className="text-sm truncate group-hover:text-red-400">
                Tạo playlist mới
              </p>
            </div>
            {loading ? (
              <div className="text-center text-white">Đang tải...</div>
            ) : (
              <Swiper
                spaceBetween={20}
                slidesPerView="auto" // Số item hiện trong 1 lần
                className="mySwiper"
              >
                {privatePlaylists.length > 0 ? privatePlaylists.map((playlist, index) => (
                  <SwiperSlide key={index} style={{ width: "auto" }}>
                    <div className="rounded-md h-full w-[170px] mx-5 relative group   duration-300">
                      <img
                        src={playlist.background}
                        alt={playlist.name}
                        className="w-full rounded-md group-hover:opacity-70"
                      />
                      <p className="font-medium text-sm mt-2 truncate">
                        {playlist.playlist_name}
                      </p>
                      <p className="text-slate-700 text-sm truncate">
                        {username}
                      </p>
                      <CirclePlus className="absolute top-3 right-3 cursor-pointer group-hover:opacity-100" color="red" onClick={() => handleAddSongToPlaylist(playlist.id)} />
                    </div>
                  </SwiperSlide>
                )) : ""}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaylistDiv;
