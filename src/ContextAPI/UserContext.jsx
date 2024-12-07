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
    const savedSong = localStorage.getItem("currentSong"); // Lấy giá trị từ localStorage
    return savedSong ? JSON.parse(savedSong) : null;
  });
  const audioRef = useRef(null);
  const [listsongs, setListSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => {
    const savedIsPlay = localStorage.getItem("isPlaying");
    return savedIsPlay ? JSON.parse(savedIsPlay) : false; // Mặc định là false
  });
  const [playSong, setPlaySong] = useState(null);
  const [isAccountType, setIsAccountType] = useState(() => {
    const savedAccountType = localStorage.getItem("isAccountType");
    return savedAccountType ? (savedAccountType) : "basic"; 
  });
  const handleFetchSongs = async (type , id) => {
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
        case "theloai":
          fetchedSongs = await fetch(`${API_URL}/the-loai/${id}/bai-hat`); 
          break;
        default:
          console.error("Unknown type");
          return;
      }
      const dataList = await fetchedSongs.json();
      setListSongs(dataList);
      setPlaySong(dataList[0]); 
      setCurrentSongIndex(0); 
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };
  const handleAddSong = async (type, id) => {
    try {
      let fetchedSong;
      // Xử lý gọi API dựa trên type
      switch (type) {
        case "song":
          fetchedSong = await fetch(`${API_URL}/${id}/play`); 
          break;
        default:
          console.error("Unknown type");
          return;
      }
      const dataSong = await fetchedSong.json();
      setListSongs(dataSong.rand);
      setPlaySong(dataSong.song); 
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
    if (currentSong) {
      localStorage.setItem("currentSong", JSON.stringify(currentSong)); // Lưu giá trị vào localStorage
    }
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
        handleAddSong,
        playSong, setPlaySong,
        isAccountType, setIsAccountType
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
