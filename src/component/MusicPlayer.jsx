import { useState, useRef, useEffect } from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
} from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Lấy từ file audio
  const [volume, setVolume] = useState(1); // Âm lượng mặc định là 1 (100%)
  const [isLooping, setIsLooping] = useState(false); // Kiểm tra chế độ lặp
  const audioRef = useRef(null);
  const [isSeeking, setIsSeeking] = useState(false); // Kiểm tra nếu người dùng đang kéo thanh trượt
  const [isVolumeVisible, setIsVolumeVisible] = useState(false); // Hiển thị thanh trượt âm lượng


  // Định dạng thời gian (phút:giây)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Play/Pause nhạc
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Lấy thời lượng bài hát khi tải audio
  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Cập nhật currentTime khi kéo thanh trượt
  const handleSliderChange = (value) => {
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  // Khi người dùng bắt đầu kéo thanh trượt
  const handleSliderMouseDown = () => {
    setIsSeeking(true);
  };

  // Khi người dùng thả chuột sau khi kéo thanh trượt
  const handleSliderMouseUp = (value) => {
    setIsSeeking(false);
    audioRef.current.currentTime = value;
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
   // Điều chỉnh âm lượng
   const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Bật/tắt chế độ lặp
  const toggleLoop = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !isLooping;
  };

    // Hiển thị/ẩn thanh trượt âm lượng
    const toggleVolume = () => {
      setIsVolumeVisible(!isVolumeVisible);
    };
  


  return (
    <div className=" p-4 rounded-lg w-full max-w-5xl">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center space-x-4 mr-2">
          <button className="p-3 bg-gray-800 rounded-full ">
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
          <button className="p-3 bg-gray-800 rounded-full">
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
              onMouseDown={handleSliderMouseDown}
              onMouseUp={(e) => handleSliderMouseUp(Number(e.target.value))}
              className="w-full h-1 bg-slate-400 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
            
            <button
            className="p-3 hover:bg-gray-800 rounded-full relative"
            onClick={toggleVolume}
          >
            <Volume2 size={20} className="text-red-500" />
            {/* Hiển thị thanh trượt âm lượng khi isVolumeVisible là true */}
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
          
          <button className="p-3 hover:bg-gray-800 rounded-full">
            <Shuffle size={20} />
          </button>
          <button
            className={`p-3 hover:bg-gray-800 rounded-full ${isLooping ? "text-green-500" : ""}`}
            onClick={toggleLoop}
          >
            <Repeat size={20} />
          </button>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="./nhac.mp3"
        onLoadedMetadata={onLoadedMetadata} // Lấy thời lượng của bài hát
        onTimeUpdate={(e) => !isSeeking && setCurrentTime(e.target.currentTime)} // Chỉ cập nhật thời gian khi không kéo
      />
    </div>
  );
}
