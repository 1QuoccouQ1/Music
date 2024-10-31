import React, { createContext, useState, useEffect } from "react";

// Tạo Context
export const UserContext = createContext();

// Tạo Provider để cung cấp giá trị cho Context
export const UserProvider = ({ children }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? JSON.parse(savedVolume) : 1; // Giá trị mặc định là 1
  });
  const [currentTime, setCurrentTime] = useState(() => {
    const savedTime = localStorage.getItem("currentTime");
    return savedTime ? JSON.parse(savedTime) : 0; // Giá trị mặc định là 0
  });
  const [isModal, setIsModal] = useState(false);
  const [user, setUser] = useState(() => {
    // Lấy user từ localStorage nếu có
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [currentSong, setCurrentSong] = useState(() => {
    // Lấy bài hát từ cookie nếu có
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
  console.log(currentSong);

  // Lưu giá trị volume vào localStorage khi nó thay đổi
  useEffect(() => {
    localStorage.setItem("volume", JSON.stringify(volume));
  }, [volume]);

  // Lưu giá trị currentTime vào localStorage khi nó thay đổi
  useEffect(() => {
    localStorage.setItem("currentTime", JSON.stringify(currentTime));
  }, [currentTime]);

  // Mỗi khi user thay đổi, lưu nó vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  // console.log(user);

  // Lưu bài hát đang nghe vào cookie trước khi người dùng đóng trang hoặc tải lại trang
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
        isPlay, setIsPlay
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
