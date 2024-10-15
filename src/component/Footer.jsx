import MusicPlayer from "./MusicPlayer";
import { Heart, MoreHorizontal, Play } from "lucide-react"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from "react";
import { useRef, useEffect } from "react";
import {  SkipBack, SkipForward, Volume2, Shuffle, Repeat, Clock } from "lucide-react";

function Footer() {
  const [isAlbum, setIsAlbum] = useState(false);
  const listsongs = [
    { title: "CỨ MỖI SÁNG ANH LẠI", artist: "Quân A.P", url: "./nhac.mp3" ,imageUrl : "https://i.ytimg.com/vi/jtqbXCnRTm0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA7BAeTwhls-2IWu5JOQWL2VKSPng" },
    { title: "Say Yes", artist: "Loco", url: "./SayYes.mp3" , imageUrl : "https://i.scdn.co/image/ab67616d00001e02a15d1870edcfb08a5d1c7b21"},
    { title: "FORGET ABOUT HER", artist: "Artist 12", url: "./nhac12.mp3" , imageUrl : "https://yt3.googleusercontent.com/56QdwtSWY66Qglk-iPbd2mkrFCcyHpuYrfdGCP7PO1nHvznemTOTTn5_wh9Ixg1MYo8R3ekcPwQ=s160-c-k-c0x00ffffff-no-rj" },
  ];


  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerModalVisible, setIsTimerModalVisible] = useState(false); // Trạng thái hiển thị modal hẹn giờ
 
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleNextSong = () => {
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
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + listsongs.length) % listsongs.length);
    setIsPlaying(true);
  };

  const handleSongEnd = () => {
    if (isLooping) {
      audioRef.current.play(); // Lặp lại bài hát hiện tại
    } else {
      handleNextSong(); // Chuyển sang bài hát tiếp theo nếu không lặp
    }
  };

  // Hiển thị modal hẹn giờ
  const toggleTimerModal = () => {
    setIsTimerModalVisible(!isTimerModalVisible);
  };

  // Đặt hẹn giờ
  const setTimerWithMinutes = (minutes) => {
    const timeInMs = minutes * 60 * 1000;
    setTimer(
      setTimeout(() => {
        setIsPlaying(false);
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
    if (audioRef.current) {
      audioRef.current.src = listsongs[currentSongIndex].url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex]);


   // Thêm sự kiện lắng nghe phím Space
   useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Ngăn hành động mặc định của phím Space
        togglePlayPause(); // Phát hoặc dừng nhạc
      }
    };  
    // Thêm sự kiện khi nhấn phím
    window.addEventListener("keydown", handleKeyDown);

    // Gỡ sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);
  return (
    <>
      <div className="fixed bottom-0 right-0 left-0 flex justify-between items-center bg-sidebar z-50">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#FF553E] to-[#FF0065] p-3 text-white  w-[350px] rounded-r-lg">
          <div className="flex items-center ">
            <img className="inline-block size-20" src={listsongs[currentSongIndex].imageUrl} />
            <div className="mx-3">
              <p className="text-base ">{listsongs[currentSongIndex].title}</p>
              <p className="text-sm text-slate-300">{listsongs[currentSongIndex].artist} </p>
            </div>
          </div>
          <div className="size-5 border border-white  rounded-full flex items-center justify-center">
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
          <button className="p-3 bg-gray-800 rounded-full " onClick={handlePreviousSong}>
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
          <button className="p-3 bg-gray-800 rounded-full" onClick={handleNextSong}>
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
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-1 bg-slate-400 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-3 hover:bg-gray-800 rounded-full relative" onClick={toggleVolume}>
            <Volume2 size={20} className="text-red-500" />
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

          <button className={`p-3 hover:bg-gray-800 rounded-full ${isShuffling ? "text-blue-500" : ""}`} onClick={toggleShuffle}>
            <Shuffle size={20} />
          </button>

          <button className={`p-3 hover:bg-gray-800 rounded-full ${isLooping ? "text-green-500" : ""}`} onClick={toggleLoop}>
            <Repeat size={20} />
          </button>

          <button
            className={`p-3 hover:bg-gray-800 rounded-full ${isTimerActive ? "text-yellow-500" : ""}`}
            onClick={isTimerActive ? handleCancelTimer : toggleTimerModal}
          >
            <Clock size={20} />
          </button>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={(e) => !isSeeking && setCurrentTime(e.target.currentTime)}
        onEnded={handleSongEnd} 
      />

      {/* Modal Hẹn Giờ */}
      {isTimerModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Chọn thời gian hẹn giờ</h2>
            <div className="space-y-2">
              <button className="bg-gray-800 text-white w-full py-2 rounded" onClick={() => setTimerWithMinutes(5)}>5 phút</button>
              <button className="bg-gray-800 text-white w-full py-2 rounded" onClick={() => setTimerWithMinutes(15)}>15 phút</button>
              <button className="bg-gray-800 text-white w-full py-2 rounded" onClick={() => setTimerWithMinutes(30)}>30 phút</button>
              <button className="bg-gray-800 text-white w-full py-2 rounded" onClick={() => setTimerWithMinutes(60)}>1 giờ</button>
              <button className="bg-gray-800 text-white w-full py-2 rounded" onClick={handleCustomTime}>Tự chọn</button>
              <button className="mt-4 bg-red-500 text-white w-full py-2 rounded" onClick={toggleTimerModal}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
        <div onClick={() => {
          setIsAlbum(!isAlbum);
        }} className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] text-white  h-[40px] px-2 py-2 rounded-full text-sm  flex items-center justify-center mr-5 relative cursor-pointer ">
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
          {isAlbum && (<div className="bg-[#1a1b26] text-white p-4 rounded-lg min-w-[350px] h-[584px] mx-auto absolute bottom-0 -translate-y-[15%] right-0 overflow-hidden" >
            <h2 className="text-lg ml-2 mb-4">Danh sách phát</h2>
            <div className="bg-[#f04b4b] p-2 rounded-md flex items-center mb-4">
              <div className="w-12 h-12 mr-3 relative" >
                <img src={listsongs[currentSongIndex].imageUrl} alt="Song thumbnail" className="w-full h-full rounded  " />
                <PlayArrowIcon className="w-7 h-7 mr-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"  fontSize="large"/>
              </div>
              <div>
                <h3 className="font-medium">{listsongs[currentSongIndex].title}</h3>
                <p className="text-[11px] opacity-60 mt-1">{listsongs[currentSongIndex].artist}</p>
              </div>
              <div className="ml-auto flex items-center space-x-3">
                <Heart className="w-4 h-4 cursor-pointer" />
                <MoreHorizontal className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
            <h3 className= " ml-2text-sm font-medium mb-2">Tiếp theo</h3>
            <ul className="ml-2 space-y-2  h-[400px] overflow-y-auto no-scrollbar">
              {listsongs.map((song, index) => (
                <li key={index} className="flex items-center space-x-3" onClick={() => setCurrentSongIndex(index)}>
                  <img
                    src={song.imageUrl}
                    alt="Song thumbnail"
                    className="w-10 h-10 rounded object-cover "
                  />
                  <div>
                    <h4 className="font-medium">{song.title}</h4>
                    <p className="text-xs text-gray-400 mt-2">{song.artist}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>)}
          
        </div>
      </div>
    </>
  );
}

export default Footer;
