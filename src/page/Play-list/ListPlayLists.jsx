import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Play } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../ContextAPI/UserContext";
import { API_URL } from "../../services/apiService";
import ListSongs from "../Genre/ListSongs";

function ListPlayLists() {
  const [Categories, setCategories] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id,param } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentGradient, setCurrentGradient] = useState("");
  const { handleFetchSongs } = useContext(UserContext);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let privateResponse;
        switch(param){
          case "private":
            privateResponse = await fetch(
              `${API_URL}/playlist-private/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              }
            );
            break;
          case "public":
            privateResponse = await fetch(
              `${API_URL}/playlist-public/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            break;
          default:
        }
        
        const privateData = await privateResponse.json();
        setCategories(privateData);
      } catch (err) {
        
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
        let privateResponse;
        switch(param){
          case "private":
            privateResponse = await fetch(
              `${API_URL}/playlist-song/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              }
            );
            break;
          case "public":
            privateResponse = await fetch(
              `${API_URL}/playlist-public/${id}/song`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            break;
          default:
        }
        
        const privateData = await privateResponse.json();
        setSongs(privateData);
      } catch (err) {
        setSongs([]);
        console.error("Lỗi khi gọi API bài hát:", err);
      } finally {
        
      }
    };

    fetchSongs();
  }, [id]);

  const gradients = [
    "bg-gradient-to-b from-orange-500 to-gray-900",
    "bg-gradient-to-b from-green-500 to-gray-900",
    "bg-gradient-to-b from-purple-500 to-gray-900",
    "bg-gradient-to-b from-lime-500 to-gray-900",
    "bg-gradient-to-b from-sky-500 to-gray-900",
    "bg-gradient-to-b from-indigo-500 to-gray-900",
    "bg-gradient-to-b from-violet-500 to-gray-900",
    "bg-gradient-to-b from-fuchsia-500 to-gray-900",
    "bg-gradient-to-b from-pink-500 to-gray-900",
    "bg-gradient-to-b from-rose-500 to-gray-900",
    "bg-gradient-to-b from-blue-500 to-gray-900",
    "bg-gradient-to-b from-cyan-500 to-gray-900",
    "bg-gradient-to-b from-teal-500 to-gray-900",
    "bg-gradient-to-b from-emerald-500 to-gray-900",
    "bg-gradient-to-b from-yellow-500 to-gray-900",
    "bg-gradient-to-b from-amber-500 to-gray-900",
    "bg-gradient-to-b from-red-500 to-gray-900",
    "bg-gradient-to-b from-stone-500 to-gray-900",
  ];

  const getRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  };

  useEffect(() => {
    setCurrentGradient(getRandomGradient());
  }, []);

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


  return (
    <>
      <div className={`${currentGradient} text-white font-sans pb-[300px] pt-10`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 p-1 md:p-8">
          <img
            src={Categories.background}
            alt="Playlist"
            className="w-68 h-48 rounded-lg "
          />
          <div>
            <p className="uppercase text-sm">PLAYLIST</p>
            <h1 className="lg:text-5xl text-3xl font-bold">{Categories.playlist_name}</h1>
            <p className="my-5 flex items-center text-sm">SoundWave · {songs.length} bài hát</p>
            <div
              className="flex items-center justify-center text-white py-2 px-1 lg:px-7 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer  lg:text-base text-sm"
              onClick={() => {
                handleFetchSongs("playlist",Categories.id);
              }}
            >
              <Play size={18} className="mr-2" />
              Phát Tất Cả
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black bg-opacity-30 rounded-lg -mt-[265px] p-1 md:p-4 mx-1 md:mx-8">
        {/* Playlist Header */}
        {songs.length > 0 ? (
          <ListSongs
            songs={songs}
            start={1}
          />
        ) : (
          <p className='text-center text-gray-400 mt-10'>
            Không có bài hát nào để hiển thị.
          </p>
        )}
      </div>
    </>
  );
}

export default ListPlayLists;
