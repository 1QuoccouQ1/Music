import { ChevronDown, ChevronUp } from "lucide-react";
import Footer from "./Footer";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../ContextAPI/UserContext";

function ModalListen() {
  const { currentSong, isPlay } = useContext(UserContext);
  const { isModal, setIsModal } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const songListRef = useRef(null);
  const songs = [
    "Mùa Thu Mang Giấc Mơ Quay Về",
    "Vẫn Nguyên Vẹn Như Hôm Nào",
    "Lá Bay Theo Gió Xôn Xao",
    "Chốn Xưa Em Chờ (Chốn Xưa Em Chờ)",
    "Đoạn Đường Ngày Nào Nơi Ta Từng Đón Đưa",
    "Còn Vấn Vương Không Phai Mờ",
    "Giấu Yêu Thương Trong Vần Thơ",
    "Vân Nguyên Vẹn Như Hôm Nào",
    "Lá Bay Theo Gió Xôn Xao",
    "Chốn Xưa Em Chờ (Reprise)",
    "Mùa Thu Mang Giấc Mơ Quay Về",
    "Vẫn Nguyên Vẹn Như Hôm Nào",
    "Lá Bay Theo Gió Xôn Xao",
    "Chốn Xưa Em Chờ (Chốn Xưa Em Chờ)",
    "Đoạn Đường Ngày Nào Nơi Ta Từng Đón Đưa",
    "Còn Vấn Vương Không Phai Mờ",
    "Giấu Yêu Thương Trong Vần Thơ",
    "Vân Nguyên Vẹn Như Hôm Nào",
    "Lá Bay Theo Gió Xôn Xao",
    "Chốn Xưa Em Chờ (Reprise)",
  ];

  const hasSongs = songs.length > 0;

  useEffect(() => {
    if (isModal) {
      setTimeout(() => {
        setIsVisible(true); // Hiện modal sau một khoảng thời gian nhỏ
      }, 50);
    } else {
      setIsVisible(false); // Ẩn modal ngay khi isModal = false
    }
  }, [isModal]);

  // Tự động thay đổi bài hát sau mỗi 3 giây
  useEffect(() => {
    let interval;
    if (isPlay) {
      interval = setInterval(() => {
        setCurrentSongIndex((prevIndex) =>
          prevIndex < songs.length - 1 ? prevIndex + 1 : 0
        );
      }, 3000);
    } else if (!isPlay && interval) {
      clearInterval(interval); // Tạm dừng khi isPlaying là false
    }
    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [isPlay, songs.length]);

  // useEffect để cuộn đến bài hát hiện tại
  useEffect(() => {
    // Cuộn tự động đến bài hát hiện tại
    if (songListRef.current) {
      const currentItem = songListRef.current.children[currentSongIndex];
      if (currentItem) {
        currentItem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } 
  }, [currentSongIndex]);

  if (!isModal) return null;

  return (
    <>
      <section
        style={{
          backgroundImage: `url("../imgs/background.png")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className={` w-full h-screen pt-5 text-white px-5 fixed z-50 transition-all duration-700 ease-in-out 
          ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-4xl font-semibold tracking-wide">
              {currentSong.song_name}
            </p>
            <p className="text-lg font-medium mt-2  "> {currentSong.composer}</p>
          </div>
          <div
            onClick={() => {
              setIsModal(!isModal);
            }}
            className="bg-black size-7 rounded-full cursor-pointer flex items-center justify-center mr-5"
          >
            <ChevronDown size={18} />
          </div>
        </div>
        <div className="flex items-center h-[600px] ">
          <div className="w-1/4 ">
            {!hasSongs && (
              <div className="text-slate-300 text-2xl   text-center mb-4">
                Bài hát chưa có Lyric
              </div>
            )}
            <div className="bg-medium p-6 rounded-lg max-w-lg relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-medium to-transparent z-10"></div>
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-medium to-transparent z-10"></div>

              <ul
                ref={songListRef}
                className="space-y-10 max-h-[500px] overflow-y-auto py-16 relative z-0 no-scrollbar"
              >
                {songs.map((song, index) => (
                  <li
                    key={index}
                    className={`text-lg ${
                      index === currentSongIndex
                        ? "text-pink-500"
                        : "text-gray-400"
                    } hover:text-gray-200 transition-colors duration-200`}
                  >
                    {song}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-2/4  flex items-center justify-center ">
            <div
              style={{
                backgroundImage: `url("../imgs/Red And Black Modern Live Music Podcast Instagram Post (2) 3 (1).png")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="relative size-[550px]  "
            >
              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                <img
                  style={{
                    animationPlayState: isPlay ? "running" : "paused",
                  }}
                  className={` size-44  rounded-full animate-[spin_8s_linear_infinite]`}
                  src={currentSong.song_image}
                />
              </div>
              <img
                className={`absolute w-60 h-90 top-0 right-0  -translate-y-1/2  ${
                  isPlay ? "" : "rotate-90"
                } duration-700  `}
                src="../imgs/Turntable (4) 1.png"
              />
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-end mr-10  gap-10">
            <div className="flex flex-col items-center gap-5">
              <div className="bg-black size-7 rounded-full cursor-pointer flex items-center justify-center">
                {" "}
                <ChevronUp size={18} />
              </div>
              <ul className="flex flex-col gap-10 h-[550px] overflow-y-auto no-scrollbar">
                <li>
                  <img
                    className="size-60  rounded-full shadow-medium"
                    src="../imgs/image (13).png"
                  />
                </li>
                <li>
                  <img
                    className="size-60  rounded-full shadow-medium"
                    src="../imgs/image (14).png"
                  />
                </li>
                <li>
                  <img
                    className="size-60  rounded-full shadow-medium"
                    src="../imgs/image (14).png"
                  />
                </li>
                <li>
                  <img
                    className="size-60  rounded-full shadow-medium"
                    src="../imgs/image (14).png"
                  />
                </li>
                <li>
                  <img
                    className="size-60  rounded-full shadow-medium"
                    src="../imgs/image (14).png"
                  />
                </li>
              </ul>
              <div className="bg-black size-7 rounded-full cursor-pointer flex items-center justify-center">
                {" "}
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </section>
    </>
  );
}

export default ModalListen;
