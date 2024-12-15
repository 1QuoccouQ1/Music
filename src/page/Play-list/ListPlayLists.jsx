import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Play, Heart, CirclePlus } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../ContextAPI/UserContext";
import { API_URL } from "../../services/apiService";
import ListSongs from "../Genre/ListSongs";

function ListPlayLists() {
  const [Categories, setCategories] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { handleFetchSongs } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const user_id = user?.id;
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
        setCategories(privateData);
      } catch (err) {
        setError(err.message);
        console.error("Lỗi khi gọi API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        if (!id) return;
        setLoading(true);

        const privateResponse = await fetch(
          `${API_URL}/playlist/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const privateData = await privateResponse.json();
        setSongs(privateData);
      } catch (err) {
        setSongs([]);
        setError(err.message);
        console.error("Lỗi khi gọi API bài hát:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  const currentCategory = Categories.find(
    (category) => category.id === parseInt(id)
  );

  return (
    <div className="bg-medium w-full h-auto pb-40 min-h-screen">
      {/* Quốc gia */}
      {currentCategory && (
        <div className="relative w-full h-[150px] sm:h-[200px]">
         
          <div className="flex flex-col items-center justify-center absolute bottom-7 px-4 md:left-16 gap-4 md:gap-8">
            <div>
              <div className="flex items-center my-5">
                <p className="text-3xl lg:text-5xl font-semibold text-white">
                  {currentCategory.playlist_name || "Quốc Gia"}
                </p>
                <img
                  className="w-6 h-6 ml-2"
                  src="../imgs/pepicons-pop_checkmark-filled.png"
                  alt="Checkmark"
                />
              </div>
              <div
                className="flex items-center text-white py-2 px-7 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer"
                onClick={() => {
                  handleFetchSongs("playlist", currentCategory.id);
                }}
              >
                <Play size={18} className="mr-2" />
                Phát Tất Cả
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bảng bài hát */}
      {songs.length > 0 ? (
        <ListSongs songs={songs}
        start={1} />
      ) : (
        <p className="text-center text-gray-400 mt-10">
          Không có bài hát nào để hiển thị.
        </p>
      )}

    </div>
  );
}

export default ListPlayLists;
