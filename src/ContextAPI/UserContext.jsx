import  { createContext, useState, useEffect ,useRef } from "react";
import { API_URL } from "../services/apiService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSetting, setIsSetting] = useState(() => {
    const savedIsSetting = localStorage.getItem("isSetting");
    return savedIsSetting ? JSON.parse(savedIsSetting) : false; 
  });
  const [isPlay, setIsPlay] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? JSON.parse(savedVolume) : 1;
  });
  const [currentTime, setCurrentTime] = useState(() => {
    const savedTime = localStorage.getItem("currentTime");
    return savedTime ? JSON.parse(savedTime) : 10; 
  });
  const [isModal, setIsModal] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [currentSong, setCurrentSong] = useState(() => {
    const savedSong = document.cookie
      .split("; ")
      .find((row) => row.startsWith("currentSong="));
    return savedSong
      ? JSON.parse(decodeURIComponent(savedSong.split("=")[1]))
      : {
          song_name: "",
          composer: "",
          song_image: "",
        };
  });
  const audioRef = useRef(null);
  const [listsongs, setListSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => {
    const savedIsPlay = localStorage.getItem("isPlaying");
    return savedIsPlay ? JSON.parse(savedIsPlay) : false; // Mặc định là false
  });
  const [isListUpdated, setIsListUpdated] = useState(false);
  const handleFetchSongs = async (type, id) => {
    try {
      let fetchedSongs;
      // Xử lý gọi API dựa trên type
      switch (type) {
        case "rank":
          fetchedSongs = await fetch(`${API_URL}/rand-10`); 
          break;
        case "trending":
          fetchedSongs = await fetch(`${API_URL}/trending`); 
          break;
        case "toplisten":
          fetchedSongs = await fetch(`${API_URL}/top-listen`); 
          break;
        case "yeuthich":
          fetchedSongs = await fetch(`${API_URL}/top-like`); 
          break;
        case "song":
          fetchedSongs = await fetch(`${API_URL}/${id}/play`); 
          break;
        default:
          console.error("Unknown type");
          return;
      }
      const data = await fetchedSongs.json();
      setListSongs(data);
      setCurrentSongIndex(0); 
      setIsListUpdated(true);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("isSetting", JSON.stringify(isSetting));
  }, [isSetting]);
  useEffect(() => {
    localStorage.setItem("volume", JSON.stringify(volume));

  }, [volume]);
  useEffect(() => {
    localStorage.setItem("currentTime", JSON.stringify(currentTime));
  }, [currentTime]);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentSong.song_name) {
        document.cookie = `currentSong=${encodeURIComponent(
          JSON.stringify({
            ...currentSong,
          })
        )}; path=/; max-age=31536000`;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    
  }, [currentSong]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isModal,
        setIsModal,
        currentSong,
        setCurrentSong,
        volume,
        setVolume,
        currentTime,
        setCurrentTime,
        isPlay, setIsPlay,
        isSetting, setIsSetting,
        audioRef,
        listsongs, setListSongs,
        currentSongIndex, setCurrentSongIndex,
        isPlaying, setIsPlaying,
        handleFetchSongs,
        isListUpdated, setIsListUpdated
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
