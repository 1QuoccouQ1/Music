import { Heart, MoreHorizontal, Play } from "lucide-react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import { useRef, useEffect } from "react";
import {
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  Clock,
} from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { API_URL } from "../services/apiService";
import React from "react";

const Footer = React.memo(function FooterComponent() {
  const {
    currentSong,
    setCurrentSong,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    setIsPlay,
    isModal,
    setIsModal,
    isSetting,
    audioRef,
    listsongs,
    currentSongIndex,
    setCurrentSongIndex,
    isPlaying,
    setIsPlaying,
    handleFetchSongs,
    playSong,
    setPlaySong,
    isAccountType,
    isUpdate,
    setIsUpdate,
  } = useContext(UserContext);
  const [isAlbum, setIsAlbum] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Thêm hàm để lọc các chất lượng dựa trên file_paths của bài hát hiện tại
  const getAvailableQualities = () => {
    const currentSong = listsongs[currentSongIndex];
    if (!currentSong.file_paths) return []; // Không có tùy chọn nào nếu file_paths không tồn tại

    // Lọc các quality mà có giá trị trùng với file_paths của bài hát hiện tại
    return qualities.filter(
      (quality) =>
        currentSong.file_paths[quality.value] !== null && // Không phải null
        currentSong.file_paths[quality.value] !== undefined // Không phải undefined
    );
  };
  const qualities = [
    {
      name: "Thường (128kbps)",
      label: "128kbps",
      value: "basic",
      color: "bg-pink-500",
    },
    {
      name: "Cao (320kbps) ",
      label: "320kbps",
      value: "plus",
      labelColor: "bg-yellow-500",
    },
    {
      name: "Lossless",
      label: "Lossless",
      value: "premium",
      labelColor: "bg-gradient-to-r from-[#FF553E] to-[#FF0065] ",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("basic");
  const [selectedQualityLabel, setSelectedQualityLabel] = useState("128kbps");

  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerModalVisible, setIsTimerModalVisible] = useState(false);
  const [optionSongIndex, setOptionSongIndex] = useState(null);
  const Playlist = useRef(null);
  const Divlist = useRef(null);
  const [songPlayCount, setSongPlayCount] = useState(0);
  const [isPlayingAd, setIsPlayingAd] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const circumference = 2 * Math.PI * 17.5;
  const offset = circumference - Number(volume) * circumference;
  const [visibleCount, setVisibleCount] = useState(10);

  const fetchAd = async () => {
    if (isAccountType === "Plus" || isAccountType === "Premium") {
      handleNextSong(); // Nếu không có quảng cáo, chuyển bài
      return;
    }
    try {
      const response = await fetch(`${API_URL}/quang-cao`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }); // Gọi API để lấy quảng cáo
      const data = await response.json();
      if (data && data.file_path) {
        // Bật trạng thái phát quảng cáo
        audioRef.current.src = data.file_path; // Cập nhật src của audio
        audioRef.current.play(); // Phát quảng cáo
      }
    } catch (error) {
      console.error("Lỗi khi lấy quảng cáo:", error);
      // Nếu không có quảng cáo, tiếp tục phát nhạc
      handleNextSong();
    }
  };

  const fetchFavoriteSongs = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await fetch(`${API_URL}/${userId}/bai-hat-yeu-thich`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const favoriteSongs = data;
        setFavoriteSongs(favoriteSongs); // Giả sử API trả về danh sách id bài hát yêu thích
      } else {
        console.error("Không thể lấy danh sách yêu thích:", response.status);
      }
    } catch (error) {
      console.error("Không thể lấy danh sách yêu thích:", error);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (!isPlaying) {
          audioRef.current.play();
        }
      }
    }
    setIsPlaying(!isPlaying);
    setIsPlay(!isPlaying);
  };

  const onLoadedMetadata = () => {
    if (isPlayingAd) {
      setDuration(audioRef.current.duration);
    } else {
      setDuration(playSong.time);
    }
  };

  const handleNextSong = () => {
    let nextIndex;
    if (isShuffling) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * listsongs.length);
      } while (randomIndex === currentSongIndex);
      nextIndex = randomIndex;
      setCurrentSongIndex(randomIndex);
      setPlaySong(listsongs[randomIndex]);
    } else {
      nextIndex = (currentSongIndex + 1) % listsongs.length;
      setCurrentSongIndex((prev) => (prev + 1) % listsongs.length);
      setPlaySong(listsongs[(currentSongIndex + 1) % listsongs.length]);
    }
    const nextSong = listsongs[nextIndex];

    let newQuality = selectedQuality;
    if (!nextSong.file_paths[selectedQuality]) {
      if (selectedQuality === "premium" && nextSong.file_paths["plus"]) {
        newQuality = "plus";
      } else if (selectedQuality !== "basic") {
        newQuality = "basic";
      }
    }

    setSelectedQuality(newQuality);
    setSelectedQualityLabel(
      qualities.find((q) => q.value === newQuality)?.label
    );
    setIsPlaying(true);
    setIsPlay(true);
  };

  const handlePreviousSong = () => {
    if (isPlayingAd) return;
    let prevIndex =
      (currentSongIndex - 1 + listsongs.length) % listsongs.length;
    const prevSong = listsongs[prevIndex];

    let newQuality = selectedQuality;
    if (!prevSong.file_paths[selectedQuality]) {
      if (selectedQuality === "premium" && prevSong.file_paths["plus"]) {
        newQuality = "plus";
      } else if (selectedQuality !== "basic") {
        newQuality = "basic";
      }
    }

    setSelectedQuality(newQuality);
    setSelectedQualityLabel(
      qualities.find((q) => q.value === newQuality)?.label
    );
    setCurrentSongIndex(
      (prev) => (prev - 1 + listsongs.length) % listsongs.length
    );
    setPlaySong(
      listsongs[(currentSongIndex - 1 + listsongs.length) % listsongs.length]
    );
    setIsPlaying(true);
    setIsPlay(true);
  };

  const handleSongEnd = async () => {
    if (isLooping) {
      audioRef.current.play(); // Lặp lại bài hát hiện tại
    } else {
      saveSongToHistory({
        song_name: playSong.song_name,
        composer: playSong.composer,
        song_image: playSong.song_image,
        id: playSong.id, // Thời lượng bài hát
      });
      try {
        await fetch(`${API_URL}/luot-nghe/${playSong.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
      } catch (error) {
        console.error("Lỗi khi cập nhật lượt nghe:", error);
      }
      if (isPlayingAd) {
        setIsPlayingAd(false);
        setSongPlayCount(0);
        if (isShuffling) {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * listsongs.length);
          } while (randomIndex === currentSongIndex);
          setCurrentSongIndex(randomIndex);
        } else {
          setCurrentSongIndex((prev) => (prev + 1) % listsongs.length);
        }
        setIsPlaying(true);
        setIsPlay(true);
      } else {
        setSongPlayCount(songPlayCount + 1);

        if (isAccountType === "basic" && songPlayCount >= 3) {
          setIsPlayingAd(true);
          fetchAd();
        } else {
          handleNextSong();
        }
      }
    }
  };

  const saveSongToHistory = (song) => {
    // Lấy danh sách lịch sử hiện tại từ localStorage
    let songHistory = JSON.parse(localStorage.getItem("songHistory")) || [];

    // Kiểm tra nếu bài hát đã tồn tại trong lịch sử
    const isAlreadyInHistory = songHistory.some(
      (historySong) => historySong.song_name === song.song_name
    );

    if (!isAlreadyInHistory) {
      if (songHistory.length >= 20) {
        songHistory = []; // Xóa hết danh sách
      }
      // Thêm bài hát mới vào danh sách lịch sử
      songHistory.unshift(song);

      // Lưu danh sách cập nhật vào localStorage
      localStorage.setItem("songHistory", JSON.stringify(songHistory));
    }
  };

  const toggleFavorite = async (songId) => {
    try {
      if (favoriteSongs.includes(songId)) {
        // Nếu bài hát đã yêu thích, xóa khỏi danh sách yêu thích
        const response = await fetch(`${API_URL}/xoa-bai-hat-yeu-thich`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song_id: songId,
            user_id: JSON.parse(localStorage.getItem("user")).id,
          }),
        });

        if (response.ok) {
          setFavoriteSongs((prev) => prev.filter((id) => id !== songId)); // Loại bỏ id khỏi danh sách
        } else {
          console.error("Lỗi khi xóa yêu thích:", response.status);
        }
      } else {
        // Nếu bài hát chưa được yêu thích, thêm vào danh sách yêu thích
        const response = await fetch(`${API_URL}/bai-hat-yeu-thich`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song_id: songId,
            user_id: JSON.parse(localStorage.getItem("user")).id,
          }),
        });

        if (response.ok) {
          setFavoriteSongs((prev) => [...prev, songId]); // Thêm id vào danh sách
        } else {
          console.error("Lỗi khi thêm yêu thích:", response.status);
        }
      }
    } catch (error) {
      console.error("Lỗi khi thêm yêu thích:", error);
    }
  };

  const toggleTimerModal = () => {
    setIsTimerModalVisible(!isTimerModalVisible);
  };

  const setTimerWithMinutes = (minutes) => {
    const timeInMs = minutes * 60 * 1000;
    setTimer(
      setTimeout(() => {
        setIsPlaying(false);
        setIsPlay(false);
        audioRef.current.pause();
        setIsTimerActive(false);
        alert("Đã hết thời gian nghe nhạc!");
      }, timeInMs)
    );
    setIsTimerActive(true);
    setIsTimerModalVisible(false); // Ẩn modal sau khi đặt giờ
  };

  const handleCustomTime = () => {
    const userTime = prompt("Nhập thời gian hẹn giờ (phút):");
    if (userTime) {
      setTimerWithMinutes(Number(userTime));
    }
  };

  const handleCancelTimer = () => {
    clearTimeout(timer);
    setTimer(null);
    setIsTimerActive(false);
  };

  const handleSliderChange = (value) => {
    if (isPlayingAd) return;
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !isLooping;
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleVolume = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  useEffect(() => {
    setIsPlaying(false);
    // Hàm bất đồng bộ để gọi API và xử lý logic
    const fetchData = async () => {
      // Gọi API để lấy danh sách bài hát
      await handleFetchSongs("rank");
      setIsLoading(false);
      fetchFavoriteSongs();

      // Sau khi danh sách bài hát đã được tải, kiểm tra `currentSong`
      if (currentSong) {
        setPlaySong(currentSong);
      } else {
        setCurrentSongIndex(0); // Nếu không có `currentSong`, bắt đầu từ bài đầu tiên
      }
    };

    // Gọi hàm fetchData
    fetchData();

    const handleClickOutside = (event) => {
      if (
        Playlist.current &&
        !Playlist.current.contains(event.target) &&
        !Divlist.current.contains(event.target)
      ) {
        setIsAlbum(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (listsongs.length === 0) return;
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.currentTime = currentTime;

      audioRef.current.addEventListener("canplay", () => {
        if (isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      });
    }
  }, [listsongs]);

  useEffect(() => {
    console.log("playSong", playSong);
    if (!playSong || !listsongs.length) return;
    setCurrentSong(playSong);
    if (isUpdate) {
      setIsPlaying(true);
      setIsUpdate(false);
      if (audioRef.current) {
        audioRef.current.src =
          playSong.file_paths && playSong.file_paths[selectedQuality];
        audioRef.current.load();
        if (optionSongIndex == currentSongIndex) {
          audioRef.current.currentTime = currentTime;
        }
        if (!isPlaying) {
          audioRef.current.play();
        }
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.src =
        playSong.file_paths && playSong.file_paths[selectedQuality];
      audioRef.current.load();
      if (optionSongIndex == currentSongIndex) {
        audioRef.current.currentTime = currentTime;
      }

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, selectedQuality, playSong]);

  if (isLoading) {
    return null;
  }
  if (isSetting) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={(e) => !isSeeking && setCurrentTime(e.target.currentTime)}
        onEnded={handleSongEnd}
      />
      {!isModal ? (
        <div className="fixed bottom-0 right-0 left-0 flex justify-between items-center bg-sidebar z-50">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#FF553E] to-[#FF0065] p-3 text-white  w-[350px] rounded-r-lg">
            <div className="flex items-center ">
              <div className="relative">
                <img
                  className="inline-block size-20 max-xl:size-14 "
                  src={playSong ? playSong.song_image : null}
                />
                {isPlaying && (
                  <i
                    style={{
                      backgroundImage: `url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 size-5 "
                  >
                    {" "}
                  </i>
                )}
              </div>
              <div className="mx-3">
                <p className="text-base ">
                  {playSong ? playSong.song_name : null}
                </p>
                <p className="text-sm text-slate-300">
                  {playSong ? playSong.composer : null}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setIsModal(!isModal);
              }}
              className="size-6 max-xl:size-4 cursor-pointer border border-white  rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="relative p-4 rounded-lg w-full max-w-5xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4 mr-2">
                  <button
                    className="p-3 bg-gray-800 rounded-full "
                    onClick={handlePreviousSong}
                    disabled={isPlayingAd}
                  >
                    <SkipBack size={24} />
                  </button>
                  <button
                    className="p-4 bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full   "
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6h12v12H6z"
                        />
                      </svg>
                    ) : (
                      <Play size={24} />
                    )}
                  </button>
                  <button
                    className="p-3 bg-gray-800 rounded-full"
                    onClick={handleNextSong}
                    disabled={isPlayingAd}
                  >
                    <SkipForward size={24} />
                  </button>
                </div>

                <div className="flex-grow mx-4 w-[660px]">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) =>
                        handleSliderChange(Number(e.target.value))
                      }
                      className="hi w-full h-1 bg-slate-400 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    className="p-3  rounded-full relative"
                    onClick={toggleVolume}
                  >
                    <svg
                      className="w-12 h-12 transform -rotate-90 cursor-pointer" // Giảm từ w-16 h-16 xuống w-12 h-12
                    >
                      <circle
                        cx="24" // Giảm từ cx=32 xuống cx=24
                        cy="24"
                        r="17.5" // Giảm bán kính từ r=23.5 xuống r=17.5
                        stroke="#4B5563"
                        strokeWidth="4" // Giảm độ dày đường viền từ strokeWidth=5 xuống strokeWidth=4
                        fill="none"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="17.5"
                        stroke="#EF4444"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                      />
                      <foreignObject x="12" y="12" width="24" height="24">
                        <div className="flex items-center justify-center w-full h-full">
                          <Volume2 size={12} className="text-white rotate-90" />
                        </div>
                      </foreignObject>
                    </svg>
                    {isVolumeVisible && (
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-[100px] absolute -top-16 left-1/2 transform -translate-x-1/2 rotate-[-90deg] bg-gray-700"
                      />
                    )}
                  </button>

                  <button
                    className={`p-3 hover:bg-gray-800 rounded-full ${
                      isShuffling ? "text-blue-500" : ""
                    }`}
                    onClick={toggleShuffle}
                  >
                    <Shuffle size={20} />
                  </button>

                  <button
                    className={`p-3 hover:bg-gray-800 rounded-full ${
                      isLooping ? "text-green-500" : ""
                    }`}
                    onClick={toggleLoop}
                  >
                    <Repeat size={20} />
                  </button>

                  <button
                    className={`p-3 hover:bg-gray-800 rounded-full ${
                      isTimerActive ? "text-yellow-500" : ""
                    }`}
                    onClick={
                      isTimerActive ? handleCancelTimer : toggleTimerModal
                    }
                  >
                    <Clock size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Hẹn Giờ */}
              {isTimerModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-bold mb-4">
                      Chọn thời gian hẹn giờ
                    </h2>
                    <div className="space-y-2">
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={() => setTimerWithMinutes(5)}
                      >
                        5 phút
                      </button>
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={() => setTimerWithMinutes(15)}
                      >
                        15 phút
                      </button>
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={() => setTimerWithMinutes(30)}
                      >
                        30 phút
                      </button>
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={() => setTimerWithMinutes(60)}
                      >
                        1 giờ
                      </button>
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={handleCustomTime}
                      >
                        Tự chọn
                      </button>
                      <button
                        className="mt-4 bg-red-500 text-white w-full py-2 rounded"
                        onClick={toggleTimerModal}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              setIsAlbum(true);
            }}
            ref={Divlist}
            className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] text-white  h-[40px] px-2 py-2 rounded-full text-sm  flex items-center justify-center mr-5 relative cursor-pointer "
          >
            <div className="border border-white size-4 flex items-center justify-center rounded-full mr-2 rotate-90">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>

            <p>Bài Tiếp Theo</p>
            {isAlbum && (
              <div
                ref={Playlist}
                className="bg-[#1a1b26] text-white p-4 rounded-lg min-w-[350px] h-[584px] mx-auto absolute bottom-0 -translate-y-[15%] right-0 overflow-hidden"
              >
                <h2 className="text-lg ml-2 mb-4">Danh sách phát</h2>
                <div className="bg-[#f04b4b] p-2 rounded-md flex items-center mb-4">
                  <div className="w-12 h-12 mr-3 relative">
                    <img
                      src={playSong.song_image}
                      alt="Song thumbnail"
                      className="w-full h-full rounded  "
                    />
                    {isPlaying ? (
                      <i
                        style={{
                          backgroundImage: `url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif")`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                        className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 size-5 "
                      >
                        {" "}
                      </i>
                    ) : (
                      <PlayArrowIcon
                        className="w-7 h-7 mr-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        fontSize="large"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{playSong.song_name}</h3>
                    <p className="text-[11px] opacity-60 mt-1">
                      {playSong.composer}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center space-x-3">
                    <Heart
                      className={`size-5 cursor-pointer ${
                        favoriteSongs.includes(playSong.id)
                          ? "text-blue-500"
                          : ""
                      }`}
                      onClick={() => toggleFavorite(playSong.id)}
                    />
                    <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                  </div>
                </div>
                <h3 className=" ml-2text-sm font-medium mb-2">Tiếp theo</h3>
                <ul className="ml-2 space-y-2  h-[368px] overflow-y-auto no-scrollbar">
                  {listsongs.slice(0, visibleCount).map((song, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3"
                      onClick={() => {
                        setCurrentSongIndex(index);
                        setPlaySong(song);
                      }}
                    >
                      <img
                        src={song.song_image}
                        alt="Song thumbnail"
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{song.song_name}</h4>
                        <p className="text-xs text-gray-400 mt-2">
                          {song.composer}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                {visibleCount < listsongs.length && (
                  <div className="flex justify-center mt-2">
                    <button
                      className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-80 text-white px-4 py-1 rounded"
                      onClick={() => setVisibleCount(listsongs.length)}
                    >
                      Xem thêm
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 right-0 left-0 flex justify-between items-center bg-sidebar z-50 py-3">
          <div className="flex items-center justify-between  p-3 text-white  w-[350px] rounded-r-lg">
            <div className="flex items-center space-x-4 ml-14">
              <button
                className="p-3 bg-gray-800 rounded-full "
                onClick={handlePreviousSong}
              >
                <SkipBack size={24} />
              </button>
              <button
                className="p-4 bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full "
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h12v12H6z"
                    />
                  </svg>
                ) : (
                  <Play size={24} />
                )}
              </button>
              <button
                className="p-3 bg-gray-800 rounded-full"
                onClick={handleNextSong}
              >
                <SkipForward size={24} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="relative p-4 rounded-lg w-full max-w-5xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex-grow mx-4 w-[660px]">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) =>
                        handleSliderChange(Number(e.target.value))
                      }
                      className="w-full h-1 bg-slate-400 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Hẹn Giờ */}
              {isTimerModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-bold mb-4">
                      Chọn thời gian hẹn giờ
                    </h2>
                    <div className="space-y-2">
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={() => setTimerWithMinutes(5)}
                      >
                        5 phút
                      </button>
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={() => setTimerWithMinutes(15)}
                      >
                        15 phút
                      </button>
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={() => setTimerWithMinutes(30)}
                      >
                        30 phút
                      </button>
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={() => setTimerWithMinutes(60)}
                      >
                        1 giờ
                      </button>
                      <button
                        className="bg-gray-800 text-white w-full py-2 rounded"
                        onClick={handleCustomTime}
                      >
                        Tự chọn
                      </button>
                      <button
                        className="mt-4 bg-red-500 text-white w-full py-2 rounded"
                        onClick={toggleTimerModal}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="flex mr-5 items-center space-x-3">
              <button
                className="p-3  rounded-full relative"
                onClick={toggleVolume}
              >
                <svg
                  className="w-12 h-12 transform -rotate-90 cursor-pointer" // Giảm từ w-16 h-16 xuống w-12 h-12
                >
                  <circle
                    cx="24" // Giảm từ cx=32 xuống cx=24
                    cy="24"
                    r="17.5" // Giảm bán kính từ r=23.5 xuống r=17.5
                    stroke="#4B5563"
                    strokeWidth="4" // Giảm độ dày đường viền từ strokeWidth=5 xuống strokeWidth=4
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="17.5"
                    stroke="#EF4444"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                  <foreignObject x="12" y="12" width="24" height="24">
                    <div className="flex items-center justify-center w-full h-full">
                      <Volume2 size={12} className="text-white rotate-90" />
                    </div>
                  </foreignObject>
                </svg>
                {isVolumeVisible && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-[100px] absolute -top-16 left-1/2 transform -translate-x-1/2 rotate-[-90deg] bg-gray-700"
                  />
                )}
              </button>

              <button
                className={`p-3  hover:bg-gray-800 rounded-full ${
                  isShuffling ? "text-blue-500" : "text-white"
                }`}
                onClick={toggleShuffle}
              >
                <Shuffle size={20} />
              </button>

              <button
                className={`p-3  hover:bg-gray-800 rounded-full ${
                  isLooping ? "text-green-500" : "text-white"
                }`}
                onClick={toggleLoop}
              >
                <Repeat size={20} />
              </button>

              <button
                className={`p-3  hover:bg-gray-800 rounded-full ${
                  isTimerActive ? "text-yellow-500" : "text-white"
                }`}
                onClick={isTimerActive ? handleCancelTimer : toggleTimerModal}
              >
                <Clock size={20} />
              </button>
            </div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gradient-to-r cursor-pointer from-[#FF553E] to-[#FF0065] text-white w-[110px]  h-[40px] px-3 py-2 rounded-full text-sm  flex items-center justify-center mr-5 relative cursor-pointer "
            >
              <p>{selectedQualityLabel}</p>
              <div
                className={` ml-2 size-4 flex items-center justify-center rounded-full  ${
                  !isOpen ? "rotate-90" : " rotate-[270deg]"
                } `}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </div>
              {isOpen && (
                <div className="absolute bottom-0 right-0 -translate-y-[90px] mt-2 w-56 bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
                  {getAvailableQualities().map((quality) => {
                    // Kiểm tra xem nút có được phép chọn hay không
                    const isDisabled =
                      (isAccountType === "basic" &&
                        quality.value !== "basic") ||
                      (isAccountType === "plus" && quality.value === "premium");
                    return (
                      <button
                        key={quality.value}
                        onClick={() => {
                          if (!isDisabled) {
                            setSelectedQuality(quality.value);
                            setSelectedQualityLabel(quality.label);
                            setIsOpen(false);
                          }
                        }}
                        disabled={isDisabled}
                        className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between ${
                          isDisabled
                            ? "text-gray-500 cursor-not-allowed bg-gray-800"
                            : "text-white hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center space-x-2 py-0.5">
                          <span>{quality.name}</span>
                          {quality.value && (
                            <span
                              className={`text-[8px] px-1 rounded ${quality.labelColor} text-white`}
                            >
                              {quality.value}
                            </span>
                          )}
                        </div>

                        <span
                          className={`w-2 h-2 rounded-full ${
                            selectedQuality === quality.value
                              ? "bg-pink-500"
                              : ""
                          }`}
                        ></span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Footer;
