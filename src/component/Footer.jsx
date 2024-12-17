import { Heart, MoreHorizontal, Play, AlignLeft, Download } from "lucide-react";
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
  CloudDownload,
} from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { API_URL } from "../services/apiService";
import React from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Footer = React.memo(function FooterComponent() {
  const {
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
    const currentSong = playSong;
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
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(() => {
    const savedSong = localStorage.getItem("isQuality"); // Lấy giá trị từ localStorage
    return savedSong ? savedSong : "basic";
  });
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
  const DivQuality = useRef(null);
  const QualityList = useRef(null);
  const DivDownload = useRef(null);
  const DownloadList = useRef(null);
  const DivVolume = useRef(null);
  const Volume = useRef(null);
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
      console.log("Phát quảng cáo");
      // Bật trạng thái phát quảng cáo
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
      if (userId) {
        const response = await fetch(`${API_URL}/${userId}/bai-hat-yeu-thich`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const favoriteSongs = data.map((song) => song.id);
          setFavoriteSongs(favoriteSongs); // Giả sử API trả về danh sách id bài hát yêu thích
        } else {
          console.error("Không thể lấy danh sách yêu thích:", response.status);
        }
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
        id: playSong.id,
        listen_count: playSong.listen_count,
        time: playSong.time, // Thời lượng bài hát
        file_paths: playSong.file_paths,
      });
      // console.log(playSong);
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
          setPlaySong(listsongs[randomIndex]);
        } else {
          setCurrentSongIndex((prev) => (prev + 1) % listsongs.length);
          setPlaySong(listsongs[(currentSongIndex + 1) % listsongs.length]);
        }
        setIsPlaying(true);
        setIsPlay(true);
      } else {
        setSongPlayCount(songPlayCount + 1);

        if (isAccountType === "Basic" && songPlayCount >= 3) {
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

  const toggleFavorite = async (songId, check) => {
    try {
      if (JSON.parse(localStorage.getItem("user"))) {
        fetch(API_URL + "/bai-hat-yeu-thich", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            liked: !check,
            song_id: songId,
            user_id: JSON.parse(localStorage.getItem("user")).id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Xử lý dữ liệu trả về từ API (nếu cần)
            // console.log('Đã đánh dấu yêu thích:', data.message);
            if (check) {
              setFavoriteSongs((set) => {
                return set.filter((id) => id !== songId);
              });
            } else {
              setFavoriteSongs((set) => {
                return [...set, songId];
              });
            }
            toast.success(data.message);
          })
          .catch((error) => {
            console.error("Lỗi khi gửi yêu cầu:", error);
          });
      } else {
        toast.error(
          "Bạn chưa đăng nhập, vui lòng đăng nhập để thêm vào yêu thích."
        );
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

  const handleDownload = (qualityValue) => {
    if (isAccountType === "Basic" && qualityValue !== "basic") {
      toast.error(
        "Bạn cần nâng cấp tài khoản Plus hoặc Premium để tải chất lượng cao."
      );
      return;
    }

    if (isAccountType === "Plus" && qualityValue === "premium") {
      toast.error("Bạn cần tài khoản Premium để tải Lossless.");
      return;
    }

    const fileUrl = playSong.file_paths[qualityValue];
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.download = `${playSong.song_name}-${qualityValue}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsOpen(false);
    } else {
      toast.error("Không tìm thấy file tải về.");
    }
  };

  useEffect(() => {
    setIsPlaying(false);
    // Hàm bất đồng bộ để gọi API và xử lý logic
    const fetchData = async () => {
      // Gọi API để lấy danh sách bài hát
      await handleFetchSongs("rank");
      setIsLoading(false);
      // Sau khi danh sách bài hát đã được tải, kiểm tra `currentSong`
    };

    // Gọi hàm fetchData
    fetchData();
    if (JSON.parse(localStorage.getItem("user"))) {
      fetchFavoriteSongs();
    }

    const handleClickOutside = (event) => {
      if (
        Playlist.current &&
        Divlist.current &&
        !Playlist.current.contains(event.target) &&
        !Divlist.current.contains(event.target)
      ) {
        setIsAlbum(false);
      }
      if (
        QualityList.current &&
        DivQuality.current &&
        !QualityList.current.contains(event.target) &&
        !DivQuality.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
      if (
        DownloadList.current &&
        DivDownload.current &&
        !DownloadList.current.contains(event.target) &&
        !DivDownload.current.contains(event.target)
      ) {
        setIsOpenDownload(false);
      }
      if (
        DivVolume.current &&
        Volume.current &&
        !DivVolume.current.contains(event.target) &&
        !Volume.current.contains(event.target)
      ) {
        setIsVolumeVisible(false);
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
    // console.log("playSong", playSong);
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
        audioRef.current.addEventListener("canplay", () => {
          if (!isPlaying) {
            audioRef.current.play().catch((error) => {
              console.error("Error playing audio:", error);
            });
          }
        });
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

      audioRef.current.addEventListener("canplay", () => {
        if (isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      });
    }
  }, [currentSongIndex, selectedQuality, playSong]);

  useEffect(() => {
    switch (selectedQuality) {
      case "basic":
        setSelectedQualityLabel("128kbps");
        break;
      case "plus":
        setSelectedQualityLabel("320kbps");
        break;
      case "premium":
        setSelectedQualityLabel("Lossless");
        break;
      default:
        setSelectedQualityLabel("128kbps");
    }
  }, [selectedQuality]);

  if (isLoading) {
    return null;
  }
  if (isSetting) return null;

  return (
    <>
      <Helmet>
        <title>SoundWave | {playSong.song_name}</title>
        <meta name="description" content={playSong.description} />
        <meta
          name="keywords"
          content={`${playSong.song_name}, ${playSong.singer_name}, ${playSong.provider}, ${playSong.composer}`}
        />
        <meta name="author" content={playSong.provider} />
      </Helmet>
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={(e) => !isSeeking && setCurrentTime(e.target.currentTime)}
        onEnded={handleSongEnd}
      />
      {!isModal ? (
        <div className="fixed bottom-0 right-0 left-0 flex justify-between items-center bg-sidebar z-50 h-[80px] lg:h-[100px]">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#FF553E] to-[#FF0065] p-3 text-white w-[200px] md:w-[350px] rounded-r-lg h-full">
            <div
              className="flex items-center h-full justify-between w-full cursor-pointer"
              onClick={() => {
                setIsModal(!isModal);
              }}
            >
              <div className="relative h-full  flex-none ">
                <img
                  className="inline-block rounded size-14 xl:size-20 "
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
                  ></i>
                )}
              </div>
              <div className="mx-3 w-[40%]">
                <p className="text-base truncate w-[100%]">
                  {playSong ? playSong.song_name : null}
                </p>
                <p className="text-sm text-slate-300 truncate">
                  {playSong ? playSong.composer : null}
                </p>
              </div>
              <div
                onClick={() => {
                  setIsModal(!isModal);
                }}
                className="size-6 w-[24px] flex-none max-xl:size-4 cursor-pointer border border-white  rounded-full flex items-center justify-center "
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
          </div>
          <div className="flex items-center justify-center ">
            <div className="relative lg:p-4 py-4 sm:px-2 rounded-lg w-full max-w-5xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4 sm:mr-2">
                  <button
                    className="p-3 bg-gray-800 rounded-full lg:block hidden"
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
                    className="p-3 bg-gray-800 rounded-full lg:block hidden"
                    onClick={handleNextSong}
                    disabled={isPlayingAd}
                  >
                    <SkipForward size={24} />
                  </button>
                </div>
                <div className="mx-4 xl:w-[450px] hidden md:block w-full">
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
                    className="p-3 md:block hidden rounded-full relative"
                    onClick={(e) => {
                      if (
                        DivVolume.current &&
                        DivVolume.current.contains(e.target)
                      ) {
                        if (isVolumeVisible) {
                          setIsVolumeVisible(false);
                        } else {
                          setIsVolumeVisible(true);
                        }
                      }
                    }}
                    ref={DivVolume}
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
                        onClick={(e) => e.stopPropagation()}
                        ref={Volume}
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
                    className={`p-3 hover:bg-gray-800 rounded-full lg:block hidden ${isShuffling ? "text-blue-500" : ""
                      }`}
                    onClick={toggleShuffle}
                  >
                    <Shuffle size={20} />
                  </button>

                  <button
                    className={`p-3 hover:bg-gray-800 rounded-full xl:block hidden ${isLooping ? "text-green-500" : ""
                      }`}
                    onClick={toggleLoop}
                  >
                    <Repeat size={20} />
                  </button>

                  <button
                    className={`p-3 hover:bg-gray-800 rounded-full lg:block hidden ${isTimerActive ? "text-yellow-500" : ""
                      }`}
                    onClick={
                      isTimerActive ? handleCancelTimer : toggleTimerModal
                    }
                  >
                    <Clock size={20} />
                  </button>
                  {(isAccountType === "Premium" ||
                    isAccountType === "Plus") && (
                    <button
                      onClick={(e) => {
                        if (
                          DivDownload.current &&
                          DivDownload.current.contains(e.target)
                        ) {
                          if (isOpenDownload) {
                            setIsOpenDownload(false);
                          } else {
                            setIsOpenDownload(true);
                          }
                        }
                      }}
                      ref={DivDownload}
                      className={`p-3 relative hover:bg-gray-800 rounded-full lg:block hidden
                      text-white
                    `}
                    >
                      <CloudDownload size={20} />
                      {isOpenDownload && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          ref={DownloadList}
                          className="absolute bottom-0 right-0 -translate-y-[90px] mt-2 w-56 bg-white text-black rounded-xl shadow-2xl overflow-hidden"
                        >
                          {getAvailableQualities().map((quality) => (
                            <button
                              key={quality.value}
                              onClick={() => handleDownload(quality.value)}
                              className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between text-black hover:bg-slate-300`}
                            >
                              <div className="flex items-center space-x-2 py-0.5">
                                <span>{quality.name}</span>
                                {quality.value && (
                                  <span
                                    className={`text-[8px] px-1 rounded ${quality.labelColor} text-black`}
                                  >
                                    {quality.value}
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Hẹn Giờ */}
              {isTimerModalVisible && (
                <div
                  onClick={toggleTimerModal}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-lg p-6 w-80 text-center"
                  >
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
            onClick={(e) => {
              if (Divlist.current && Divlist.current.contains(e.target)) {
                if (isAlbum) {
                  setIsAlbum(false);
                } else {
                  setIsAlbum(true);
                }
              }
            }}
            ref={Divlist}
            className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] text-white  lg:h-[40px] md:px-2 py-2 rounded-full text-sm  flex items-center justify-center mr-1 sm:mr-5 relative cursor-pointer flex-none min-w-[36px] "
          >
            <div className="border border-white size-4 flex lg:block hidden items-center justify-center rounded-full mr-2 rotate-90">
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

            <p className="truncate lg:block hidden min-h-fit ">Danh Sách</p>
            <AlignLeft size={20} className=" lg:hidden block text-white" />
            {isAlbum && (
              <div
                ref={Playlist}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1a1b26] text-white md:p-4 rounded-lg w-[300px] lg:w-[380px] max-w-[450px] md:h-[584px] h-[450px] md:mx-auto absolute -bottom-3 -translate-y-[15%] right-0 overflow-hidden flex flex-col"
              >
                <h2 className="text-lg ml-2 mb-4">Danh sách phát</h2>

                <div className="bg-[#f04b4b] p-2 rounded-md flex items-center mb-4 md:mx-0 mx-3">
                  <div className="w-12 h-12 mr-3 relative flex-none">
                    <img
                      src={playSong.song_image}
                      alt="Song thumbnail"
                      className="w-full h-full rounded"
                    />
                    {isPlaying ? (
                      <i
                        style={{
                          backgroundImage: `url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif")`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                        className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 size-5"
                      />
                    ) : (
                      <PlayArrowIcon
                        className="w-7 h-7 mr-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        fontSize="large"
                      />
                    )}
                  </div>
                  <div className="w-[60%]">
                    <h3 className="font-medium truncate w-[80%]">
                      {playSong.song_name}
                    </h3>
                    <p className="text-[11px] opacity-60 mt-1 truncate w-[80%]">
                      {playSong.composer}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center space-x-3 flex-none">
                    {favoriteSongs.includes(playSong.id) ? (
                      <Heart
                        fill="white"
                        className="size-5 cursor-pointer"
                        onClick={() => toggleFavorite(playSong.id, true)}
                      />
                    ) : (
                      <Heart
                        className="size-5 cursor-pointer"
                        onClick={() => toggleFavorite(playSong.id, false)}
                      />
                    )}
                    <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                  </div>
                </div>

                <h3 className="ml-2 text-sm font-medium mb-2">Tiếp theo</h3>

                {/* Thẻ ul sẽ lấp đầy khoảng trống còn lại */}
                <div className="flex-1 overflow-hidden">
                  <ul className="ml-2 space-y-2 h-full overflow-y-auto no-scrollbar">
                    {listsongs.slice(0, visibleCount).map((song, index) => (
                      <li
                        key={index}
                        className={`flex items-center p-1 rounded space-x-3 ${
                          currentSongIndex === index ? "bg-slate-800" : ""
                        }`}
                        onClick={() => {
                          setCurrentSongIndex(index);
                          setPlaySong(song);
                          setIsPlaying(true);
                        }}
                      >
                        <img
                          src={song.song_image}
                          alt="Song thumbnail"
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <h4 className="font-medium truncate w-full">
                            {song.song_name}
                          </h4>
                          <p className="text-xs text-gray-400 mt-2">
                            {song.composer}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nút Xem thêm */}
                {visibleCount < listsongs.length && (
                  <div className="flex justify-center mt-4">
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
        <div className="fixed bottom-0 right-0 left-0 flex justify-between items-center bg-sidebar z-50 md:py-3 sm:py-1 py-3 flex-col sm:flex-row ">
          <div className="flex items-center justify-between  p-3 text-white  sm:max-w-[350px] sm:w-[350px] w-full w-fit  rounded-r-lg">
            <button
              className={`lg:p-3 p-2  hover:bg-gray-800 rounded-full block sm:hidden ${isShuffling ? "text-blue-500" : "text-white"}`}
              onClick={toggleShuffle}
            >
              <Shuffle size={20} />
            </button>
            <div className="flex items-center space-x-4 xl:ml-14">
              <button
                className="p-3 md:p-2 lg:p-3 bg-gray-800 rounded-full "
                onClick={handlePreviousSong}
              >
                <SkipBack className="md:size-[16px] xl:size-[28px] size-[17px]" />
              </button>
              <button
                className="p-4 md:p-3 lg:p-4 bg-gradient-to-r from-[#88716e] to-[#FF0065] rounded-full "
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:size-[20px] xl:size-[32px] size-[19px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h12v12H6z"
                    />
                  </svg>
                ) : (
                  <Play className="md:size-[20px] xl:size-[32px] size-[19px]" />
                )}
              </button>
              <button
                className="p-3 md:p-2 lg:p-3 bg-gray-800 rounded-full"
                onClick={handleNextSong}
              >
                <SkipForward className="md:size-[16px] xl:size-[28px] size-[17px]" />
              </button>
            </div>
            <button
                className={`lg:p-3 p-2  hover:bg-gray-800 rounded-full block sm:hidden ${isLooping ? "text-green-500" : "text-white"
                  }`}
                onClick={toggleLoop}
              >
                <Repeat size={20} />
              </button>
          </div>
          <div className="flex items-center justify-center pb-3 sm:pb-0 w-full ">
            <div className="relative lg:p-4 rounded-lg w-full max-w-5xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex-grow sm:mx-2 lg:mx-4 mx-10 xl:w-[490px] lg:w-[320px] md:w-[200px]  min-w-[140px] ">
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
                <div
                  onClick={toggleTimerModal}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-lg p-6 w-80 text-center"
                  >
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
          <div className="flex items-center justify-center h-min ">
            <div className="flex md:mr-3 lg:mr-5 mr-3 items-center space-x-3">
              <button
                className="lg:p-3 md:p-1  rounded-full relative"
                onClick={(e) => {
                  if (
                    DivVolume.current &&
                    DivVolume.current.contains(e.target)
                  ) {
                    if (isVolumeVisible) {
                      setIsVolumeVisible(false);
                    } else {
                      setIsVolumeVisible(true);
                    }
                  }
                }}
                ref={DivVolume}
              >
                <svg
                  className="w-10 h-10 transform -rotate-90 cursor-pointer block sm:hidden"
                >
                  <circle
                    cx="24"
                    cy="20"
                    r="14"
                    stroke="#4B5563"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="20"
                    r="14"
                    stroke="#EF4444"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                  <foreignObject x="12" y="9" width="24" height="24">
                    <div className="flex items-center justify-center w-full h-full">
                      <Volume2 size={12} className="text-white rotate-90" />
                    </div>
                  </foreignObject>
                </svg>
                <svg
                  className="w-12 h-12 transform -rotate-90 cursor-pointer hidden sm:block"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="17.5"
                    stroke="#4B5563"
                    strokeWidth="4"
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
                    onClick={(e) => e.stopPropagation()}
                    ref={Volume}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-[100px] absolute -top-16 sm:left-1/2 left-2/4 transform -translate-x-1/2 rotate-[-90deg] bg-gray-700"
                  />
                )}
              </button>

              <button
                className={`lg:p-3 p-2  hover:bg-gray-800 rounded-full hidden sm:block  ${isShuffling ? "text-blue-500" : "text-white"
                  }`}
                onClick={toggleShuffle}
              >
                <Shuffle size={20} />
              </button>

              <button
                className={`lg:p-3 p-2  hover:bg-gray-800 rounded-full hidden sm:block ${isLooping ? "text-green-500" : "text-white"
                  }`}
                onClick={toggleLoop}
              >
                <Repeat size={20} />
              </button>

              <button
                className={`lg:p-3 p-2  hover:bg-gray-800 rounded-full ${isTimerActive ? "text-yellow-500" : "text-white"
                  }`}
                onClick={isTimerActive ? handleCancelTimer : toggleTimerModal}
              >
                <Clock size={20} />
              </button>
              {(isAccountType === "Premium" || isAccountType === "Plus") && (
                <button
                  onClick={(e) => {
                    if (
                      DivDownload.current &&
                      DivDownload.current.contains(e.target)
                    ) {
                      if (isOpenDownload) {
                        setIsOpenDownload(false);
                      } else {
                        setIsOpenDownload(true);
                      }
                    }
                  }}
                  ref={DivDownload}
                  className={`p-3 relative hover:bg-gray-800 rounded-full md:block sm:hidden block
                 text-white
                `}
                >
                  <CloudDownload size={20} />
                  {isOpenDownload && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      ref={DownloadList}
                      className="absolute bottom-0 sm:right-0 -right-20 -translate-y-[90px] mt-2 w-48 md:w-56 bg-white text-black rounded-xl shadow-2xl overflow-hidden"
                    >
                      {getAvailableQualities().map((quality) => (
                        <button
                          key={quality.value}
                          onClick={() => handleDownload(quality.value)}
                          className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between text-black hover:bg-slate-300`}
                        >
                          <div className="flex items-center space-x-2 py-0.5">
                            <span>{quality.name}</span>
                            {quality.value && (
                              <span
                                className={`text-[8px] px-1 rounded ${quality.labelColor} text-black`}
                              >
                                {quality.value}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </button>
              )}
            </div>
            <div
              onClick={(e) => {
                if (
                  DivQuality.current &&
                  DivQuality.current.contains(e.target)
                ) {
                  if (isOpen) {
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }
              }}
              ref={DivQuality}
              className="bg-gradient-to-r cursor-pointer from-[#FF553E] to-[#FF0065] text-white lg:w-[110px] w-[90px] lg:h-[40px] h-[28px] px-3 py-2 rounded-full text-sm  flex items-center justify-center mr-5 relative cursor-pointer"
            >
              <p>{selectedQualityLabel}</p>
              <div
                className={` ml-2 size-4 flex items-center justify-center rounded-full  ${!isOpen ? "rotate-90" : " rotate-[270deg]"
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
                <div
                  ref={QualityList}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-0 right-0 -translate-y-[90px] mt-2 w-56 bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
                >
                  {getAvailableQualities().map((quality) => {
                    // Kiểm tra xem nút có được phép chọn hay không
                    const isDisabled =
                      (isAccountType === "Basic" &&
                        quality.value !== "basic") ||
                      (isAccountType === "Plus" && quality.value === "Premium");
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
                        className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between ${isDisabled
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
                          className={`w-2 h-2 rounded-full ${selectedQuality === quality.value
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
