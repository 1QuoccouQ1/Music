import MusicPlayer from "./MusicPlayer";
import { Heart, MoreHorizontal, Play } from "lucide-react"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from "react";
import { useRef, useEffect } from "react";
import {  SkipBack, SkipForward, Volume2, Shuffle, Repeat, Clock } from "lucide-react";
import { useContext } from 'react';
import { UserContext } from '../ContextAPI/UserContext';


function Footer() {
  const { currentSong, setCurrentSong ,volume, setVolume, currentTime, setCurrentTime ,isPlay, setIsPlay } = useContext(UserContext);
  const {isModal ,setIsModal} = useContext(UserContext);
  const [isAlbum, setIsAlbum] = useState(false);
  const listsongs = [
    { song_name: "CỨ MỖI SÁNG ANH LẠI", composer: "Quân A.P", url: "./nhac.mp3" ,song_image : "https://i.ytimg.com/vi/jtqbXCnRTm0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA7BAeTwhls-2IWu5JOQWL2VKSPng" , file_paths: {
      Basic: "https://soundwave2.s3.amazonaws.com/music/tinh_dau_qua_chen/tinh_dau_qua_chen_128kbps.mp3",
      plus: "https://soundwave2.s3.amazonaws.com/music/di_ve_nha/di_ve_nha_128kbps.mp3",
      premium: "https://soundwave2.s3.amazonaws.com/music/tan_cung_noi_nho/1729622759_tan_cung_noi_nho_128kbps.mp3"
  } },
    { song_name: "Say Yes", composer: "Loco", url: "./SayYes.mp3" , song_image : "https://i.scdn.co/image/ab67616d00001e02a15d1870edcfb08a5d1c7b21" , file_paths: {
      Basic: "https://soundwave2.s3.amazonaws.com/music/tinh_dau_qua_chen/tinh_dau_qua_chen_128kbps.mp3",
      plus: "https://soundwave2.s3.amazonaws.com/music/tinh_dau_qua_chen/tinh_dau_qua_chen_128kbps.mp3",
      premium: "https://soundwave2.s3.amazonaws.com/music/tinh_dau_qua_chen/tinh_dau_qua_chen_128kbps.mp3"
  }},
    { song_name: "FORGET ABOUT HER", composer: "composer 12", url: "./nhac12.mp3" , song_image : "https://yt3.googleusercontent.com/56QdwtSWY66Qglk-iPbd2mkrFCcyHpuYrfdGCP7PO1nHvznemTOTTn5_wh9Ixg1MYo8R3ekcPwQ=s160-c-k-c0x00ffffff-no-rj" ,
      file_paths: {
            Basic: "https://soundwave2.s3.amazonaws.com/music/tinh_dau_qua_chen/tinh_dau_qua_chen_128kbps.mp3",
            plus: "https://soundwave2.s3.amazonaws.com/music/tinh_dau_qua_chen/tinh_dau_qua_chen_128kbps.mp3",
            premium: "https://soundwave2.s3.amazonaws.com/music/tinh_dau_qua_chen/tinh_dau_qua_chen_128kbps.mp3"
        }
     },
  ];

  // Thêm hàm để lọc các chất lượng dựa trên file_paths của bài hát hiện tại
const getAvailableQualities = () => {
  const currentSong = listsongs[currentSongIndex];
  if (!currentSong.file_paths) return []; // Không có tùy chọn nào nếu file_paths không tồn tại
  
  // Lọc các quality mà có giá trị trùng với file_paths của bài hát hiện tại
  return qualities.filter(quality => currentSong.file_paths[quality.value]);
};

  const qualities = [
    { name: 'Thường (128kbps)', label: '128kbps',value:"Basic", color: 'bg-pink-500' },
    { name: 'Cao (320kbps) ', label: '320kbps', value: 'plus', labelColor: 'bg-yellow-500' },
    { name: 'Lossless', label: 'Lossless', value: 'premium', labelColor: 'bg-gradient-to-r from-[#FF553E] to-[#FF0065] ' },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState('plus')
  const [selectedQualityLabel, setSelectedQualityLabel] = useState('128kbps')
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
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
    setIsPlay(!isPlay);
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
    // Kiểm tra nếu currentSong có dữ liệu
    if (currentSong) {
      // Tìm chỉ số bài hát trong listsongs
      const index = listsongs.findIndex(song => song.song_name === currentSong.song_name);
      if (index !== -1) {
        setCurrentSongIndex(index);
      }
    } else {
      // Nếu không có currentSong, đặt currentSongIndex về 0
      setCurrentSongIndex(0);
    }

    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.currentTime = currentTime;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, []);

  useEffect(() => {
    setVolume(volume); // Cập nhật giá trị volume
  }, [volume]); // Chạy khi volume thay đổi

  // Sử dụng useEffect để cập nhật currentTime vào Context
  useEffect(() => {
    setCurrentTime(currentTime); // Cập nhật giá trị currentTime
  }, [currentTime])

  useEffect(() => {

     // Khi currentSongIndex thay đổi, cập nhật thông tin bài hát vào UserContext
     const song = listsongs[currentSongIndex];
     setCurrentSong({
      song_name: song.song_name,
      composer: song.composer,
      song_image: song.song_image,
    });

    if (audioRef.current) {
      audioRef.current.src =  song.file_paths && song.file_paths[selectedQuality] 
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex ,selectedQuality]);


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



  const circumference = 2 * Math.PI * 17.5
  const offset = circumference - (Number(volume)) * circumference
  return (
    <>
      {!isModal ? ( <div className="fixed bottom-0 right-0 left-0 flex justify-between items-center bg-sidebar z-50">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#FF553E] to-[#FF0065] p-3 text-white  w-[350px] rounded-r-lg">
          <div className="flex items-center ">
          <div className="relative">
            <img className="inline-block size-20" src={listsongs[currentSongIndex].song_image} />
            {isPlaying && (
              <i style={{
                backgroundImage: `url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }} className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 size-5 "> </i>
        )}
            
          </div>
            <div className="mx-3">
              <p className="text-base ">{listsongs[currentSongIndex].song_name}</p>
              <p className="text-sm text-slate-300">{listsongs[currentSongIndex].composer} </p>
            </div>
          </div>
          <div onClick={()=> {setIsModal(!isModal)}} className="size-6 cursor-pointer border border-white  rounded-full flex items-center justify-center">
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
          <button className="p-3  rounded-full relative" onClick={toggleVolume}>
          <svg
            className="w-12 h-12 transform -rotate-90 cursor-pointer"  // Giảm từ w-16 h-16 xuống w-12 h-12
          >
            <circle
              cx="24"  // Giảm từ cx=32 xuống cx=24
              cy="24"
              r="17.5"  // Giảm bán kính từ r=23.5 xuống r=17.5
              stroke="#4B5563"
              strokeWidth="4"  // Giảm độ dày đường viền từ strokeWidth=5 xuống strokeWidth=4
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
                <img src={listsongs[currentSongIndex].song_image} alt="Song thumbnail" className="w-full h-full rounded  " />
                <PlayArrowIcon className="w-7 h-7 mr-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"  fontSize="large"/>
              </div>
              <div>
                <h3 className="font-medium">{listsongs[currentSongIndex].song_name}</h3>
                <p className="text-[11px] opacity-60 mt-1">{listsongs[currentSongIndex].composer}</p>
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
                    src={song.song_image}
                    alt="Song thumbnail"
                    className="w-10 h-10 rounded object-cover "
                  />
                  <div>
                    <h4 className="font-medium">{song.song_name}</h4>
                    <p className="text-xs text-gray-400 mt-2">{song.composer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>)}
          
        </div>
      </div>) : ( <div className="fixed bottom-0 right-0 left-0 flex justify-between items-center bg-sidebar z-50 py-3">
        <div className="flex items-center justify-between  p-3 text-white  w-[350px] rounded-r-lg">
        <div className="flex items-center space-x-4 ml-14">
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
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-1 bg-slate-400 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
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
        <div className="flex items-center justify-center ">
          <div className="flex mr-5 items-center space-x-3">
            <button className="p-3  rounded-full relative" onClick={toggleVolume}>
            <svg
              className="w-12 h-12 transform -rotate-90 cursor-pointer"  // Giảm từ w-16 h-16 xuống w-12 h-12
            >
              <circle
                cx="24"  // Giảm từ cx=32 xuống cx=24
                cy="24"
                r="17.5"  // Giảm bán kính từ r=23.5 xuống r=17.5
                stroke="#4B5563"
                strokeWidth="4"  // Giảm độ dày đường viền từ strokeWidth=5 xuống strokeWidth=4
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
            
          


    

            <button className={`p-3  hover:bg-gray-800 rounded-full ${isShuffling ? "text-blue-500" : "text-white"}`} onClick={toggleShuffle}>
              <Shuffle size={20} />
            </button>

            <button className={`p-3  hover:bg-gray-800 rounded-full ${isLooping ? "text-green-500" : "text-white"}`} onClick={toggleLoop}>
              <Repeat size={20} />
            </button>

            <button
              className={`p-3  hover:bg-gray-800 rounded-full ${isTimerActive ? "text-yellow-500" : "text-white"}`}
              onClick={isTimerActive ? handleCancelTimer : toggleTimerModal}
            >
              <Clock size={20} />
            </button>
          </div>
          <div onClick={() => setIsOpen(!isOpen)}  className="bg-gradient-to-r cursor-pointer from-[#FF553E] to-[#FF0065] text-white w-[110px]  h-[40px] px-3 py-2 rounded-full text-sm  flex items-center justify-center mr-5 relative cursor-pointer ">
            <p>{selectedQualityLabel}</p>
            <div className={` ml-2 size-4 flex items-center justify-center rounded-full  ${!isOpen ? 'rotate-90' : ' rotate-[270deg]'} `}>
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
          {getAvailableQualities().map((quality) => (
            <button
              key={quality.value}
              onClick={() => {
                setSelectedQuality(quality.value)
                setSelectedQualityLabel(quality.label)
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-800 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2 py-0.5">
                <span className="">{quality.name}</span>
                {quality.value && (
                <span className={`text-[8px] px-1   rounded ${quality.labelColor} text-white`}>
                  {quality.value}
                </span>
              )}
              </div>
             
              <span className={`w-2 h-2 rounded-full ${selectedQuality === quality.value ? "bg-pink-500" : ""}`}></span>

            </button>
          ))}
        </div>
      )}
          </div>
        </div>
        
      </div>) }
      
    </>
  );
}

export default Footer;
