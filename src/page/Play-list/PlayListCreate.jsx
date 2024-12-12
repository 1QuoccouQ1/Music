import React, { useState } from "react";
import { API_URL } from "../../services/apiService"; // Đường dẫn API

function PlayListCreate({ onClose }) {
  const [playlistName, setPlaylistName] = useState(""); // Lưu tên playlist
  const [isPublic, setIsPublic] = useState(false); // Lưu trạng thái công khai

  // Hàm xử lý khi tạo mới playlist
  const handleCreatePlaylist = async () => {
    if (!playlistName) {
      alert("Vui lòng nhập tên playlist.");
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
          share: isPublic, // Truyền trạng thái công khai
          user_id: JSON.parse(localStorage.getItem("user")).id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Tạo playlist thành công!");
        onClose(); // Đóng modal sau khi tạo thành công
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Không thể tạo playlist.");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Đã xảy ra lỗi khi tạo playlist.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-medium text-white rounded-lg w-full max-w-md p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Tạo playlist mới</h2>
            <button
              className="text-gray-400 hover:text-white"
              onClick={onClose} // Đóng modal
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Nội dung */}
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
      </div>
    </>
  );
}

export default PlayListCreate;
