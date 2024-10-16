import { useState, useRef, useEffect } from "react";
import { Play, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Clock } from "lucide-react";

export default function MusicPlayer() {
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
  const [songs] = useState([
    "./nhac.mp3",
    "./nhac12.mp3",
    "./SayYes.mp3"
  ]);
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
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentSongIndex);
      setCurrentSongIndex(randomIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
    setIsPlaying(true);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
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
      audioRef.current.src = songs[currentSongIndex];
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
        src="./nhac.mp3"
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
  );
}
