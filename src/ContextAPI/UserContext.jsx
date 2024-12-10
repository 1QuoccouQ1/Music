import { createContext, useState, useEffect, useRef } from "react";
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
    const savedAccountType = localStorage.getItem("user");
    return savedAccountType ? JSON.parse(savedAccountType).users_type : "Basic";
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);

  const handleFetchSongs = async (type, id) => {
    try {
      let fetchedSongs;
      switch (type) {
        case "rank":
          fetchedSongs = await fetch(`${API_URL}/rand-10`);
          break;
        case "new":
          fetchedSongs = await fetch(`${API_URL}/new-song`);
          break;
        case "trending":
          fetchedSongs = await fetch(`${API_URL}/trending`);
          setIsUpdate(true)
          break;
        case "toplisten":
          fetchedSongs = await fetch(`${API_URL}/top-listen`);
          setIsUpdate(true)
          break;
        case "yeuthich":
          fetchedSongs = await fetch(`${API_URL}/top-like`);
          setIsUpdate(true)
          break;
        case "theloai":
          fetchedSongs = await fetch(`${API_URL}/the-loai/${id}/bai-hat`);
          setIsUpdate(true)
          break;
        case "quocgia":
          fetchedSongs = await fetch(`${API_URL}/quoc-gia/${id}/bai-hat`);
          setIsUpdate(true)
          break;
        case "casi":
          fetchedSongs = await fetch(`${API_URL}/ca-si/${id}/bai-hat`);
          setIsUpdate(true)
          break;
        case "favorite":
          fetchedSongs = await fetch(`${API_URL}/${id}/bai-hat-yeu-thich`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }
          });
          setIsUpdate(true)
          break;
        case "bxh":
          fetchedSongs = await fetch(`${API_URL}/bxh-100`);
          setIsUpdate(true)
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
  const handleListSongs = (type) => {
    try {
      let fetchedSongs;
      switch (type) {
        case "history":
          fetchedSongs = JSON.parse(localStorage.getItem("songHistory"));
          setIsUpdate(true)
          break;
        default:
          console.error("Unknown type");
          return;
      }
      setListSongs(fetchedSongs);
      setPlaySong(fetchedSongs[0]);
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
          setIsUpdate(true)
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
        handleListSongs,
        playSong, setPlaySong,
        isAccountType, setIsAccountType,
        isUpdate, setIsUpdate,
        isSidebar, setIsSidebar
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
