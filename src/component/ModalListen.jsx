import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { API_URL } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";

function ModalListen() {
  const { currentSong, isPlay } = useContext(UserContext);
  const { isModal, setIsModal } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const songs = currentSong?.lyrics || "";
  const formattedLyrics = songs.replace(/\n/g, "<br>");
  const hasSongs = songs.length > 0;
  const [singers, setSingers] = useState([]);
  const listRef = useRef(null); 
  const [isDragging, setIsDragging] = useState(false); 
  const [startY, setStartY] = useState(0); 
  const [startScrollTop, setStartScrollTop] = useState(0); 
  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); // Bật trạng thái đang kéo
    setStartY(e.clientY || e.touches?.[0]?.clientY); // Ghi lại vị trí Y ban đầu
    setStartScrollTop(listRef.current.scrollTop); // Ghi lại scrollTop tại thời điểm bắt đầu
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // Nếu không trong trạng thái kéo thì bỏ qua
    const currentY = e.clientY || e.touches?.[0]?.clientY; // Lấy vị trí Y hiện tại
    const deltaY = startY - currentY; // Tính khoảng cách kéo
    listRef.current.scrollTop = startScrollTop + deltaY; // Điều chỉnh scrollTop
  };

  const handleMouseUp = () => {
    setIsDragging(false); 
  };

  const scrollUp = () => {
    listRef.current.scrollBy({ top: -300, behavior: "smooth" }); 
  };

  const scrollDown = () => {
    listRef.current.scrollBy({ top: 300, behavior: "smooth" }); 
  };

  useEffect(() => {
    if (isModal) {
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    } else {
      setIsVisible(false);
    }
  }, [isModal]);

  useEffect(() => {
    const fetchSingers = async () => {
      try {
        const response = await fetch(`${API_URL}/ca-si`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON từ response
        setSingers(data); // Gán dữ liệu từ API vào state
      } catch (err) {
        console.error(err);
      }
    };

    fetchSingers(); // Gọi API khi component được mount
  }, []);

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
        <div className="flex items-start justify-between  absolute top-0 w-full left-0 p-5 z-20">
          <div className="w-1/2">
            <p className="text-2xl sm:text-4xl font-semibold tracking-wide capitalize truncate">
              {currentSong.song_name}
            </p>
            <p className="text-sm sm:text-lg font-medium mt-2 truncate  ">
              {" "}
              {currentSong.composer}
            </p>
          </div>
          <div
            onClick={() => {
              setIsModal(!isModal);
            }}
            className="bg-black size-7 rounded-full cursor-pointer flex items-center justify-center mr-5 w-[28px]"
          >
            <X size={18} />
          </div>
        </div>
        <div className="flex items-center h-full ">
          <div className="md:w-1/4 md:block  hidden h-[80%]">
            {!hasSongs && (
              <div className="text-slate-300 text-2xl   text-center mb-4">
                Bài hát chưa có Lyric
              </div>
            )}
            <div className="bg-medium p-6 rounded-lg max-w-lg relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-medium to-transparent z-10"></div>
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-medium to-transparent z-10"></div>
              <div
                className="space-y-6 max-h-[500px] overflow-y-auto py-16 relative z-0 no-scrollbar text-lg text-gray-400"
                dangerouslySetInnerHTML={{ __html: formattedLyrics }}
              ></div>
            </div>
          </div>
          <div className="w-full md:w-3/4 xl:w-2/4  flex items-center justify-center h-[70%] ">
            <div
              style={{
                backgroundImage: `url("../imgs/Red And Black Modern Live Music Podcast Instagram Post (2) 3 (1).png")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="relative size-[270px] sm:size-[500px] 2xl:size-[560px] -translate-y-1/3 sm:translate-y-0"
            >
              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                <img
                  style={{
                    animationPlayState: isPlay ? "running" : "paused",
                  }}
                  className={`size-24 sm:size-44 md:size-48 xl:size-48 2xl:size-56  rounded-full animate-[spin_8s_linear_infinite]`}
                  src={currentSong.song_image}
                />
              </div>
              <img
                className={`absolute w-[120px] h-[180px] sm:w-[230px] sm:h-[330px] 2xl:w-[260px] 2xl:h-[350px]  top-0 right-0  -translate-y-1/2  ${
                  isPlay ? "" : "rotate-90"
                } duration-700  `}
                src="../imgs/Turntable (4) 1.png"
              />
            </div>
          </div>
          <div
            className="xl:w-1/4 flex flex-col items-end mr-10 gap-10 hidden xl:block h-[80%]"
            onMouseMove={handleMouseMove} // Lắng nghe khi di chuyển chuột
            onMouseUp={handleMouseUp} // Dừng kéo khi thả chuột
            onMouseLeave={handleMouseUp} // Dừng kéo khi rời khỏi vùng danh sách
            onTouchMove={handleMouseMove} // Hỗ trợ kéo trên thiết bị cảm ứng
            onTouchEnd={handleMouseUp} // Dừng kéo trên cảm ứng
          >
            <div className="flex flex-col items-center gap-5 h-[90%]">
              <div
                className="bg-black size-7 rounded-full cursor-pointer flex items-center justify-center py-1"
                onClick={scrollUp}
              >
                <ChevronUp size={18}  className="cursor-pointer"/>
              </div>
              <ul
                className="flex flex-col gap-10 h-full overflow-y-auto no-scrollbar"
                ref={listRef}
                onMouseDown={handleMouseDown} // Bắt đầu kéo khi nhấn chuột
                onTouchStart={handleMouseDown} // Bắt đầu kéo khi chạm trên thiết bị cảm ứng
              >
                {singers.map((singer) => (
                  <li key={singer.id}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        window.scrollTo(0, 0);
                        setIsModal((prev) => !prev);
                      }}
                    >
                      <img
                        className="size-60 rounded-full shadow-medium"
                        src={singer.singer_image}
                        alt={singer.singer_name}
                        onClick={() => navigate(`/ProfileArtist/${singer.id}`)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div
                className="bg-black size-7 rounded-full cursor-pointer flex items-center justify-center py-1"
                onClick={scrollDown}
              >
                <ChevronDown size={18} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ModalListen;
