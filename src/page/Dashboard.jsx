import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { API_URL } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import SlideAlbum from "./Albums/SlideAlbum.jsx"
import Country from "./Country/Country.jsx"
import ArtistSlide from "./Artist/ArtistSlide.jsx"
import GenerSlide from "./Genre/GenreSlide.jsx";
import PlayListSlide from "./Play-list/PlayListSlide.jsx";

function Dashboard() {
  const { handleFetchSongs, handleAddSong, handleClick } = useContext(UserContext);
  const [trending, setTrending] = useState([]);
  const [topListen, setTopListen] = useState([]);
  const [topLike, setTopLike] = useState([]);
  const [banner, setBanner] = useState({
    banner_name: 'banner',
    banner_url: "../imgs/Group 92.webp",
  });

  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const trendingResponse = await fetch(`${API_URL}/top-1-trending`);
      const topListenResponse = await fetch(`${API_URL}/top-1-listen`);
      const topLikeResponse = await fetch(`${API_URL}/top-1-like`);
      const bannerResponse = await fetch(`${API_URL}/banner`);

      const trendingData = await trendingResponse.json();
      const topListenData = await topListenResponse.json();
      const topLikeData = await topLikeResponse.json();
      const bannerData = await bannerResponse.json();

      setTrending(trendingData);
      setTopListen(topListenData);
      setTopLike(topLikeData);
      if (bannerData && Object.keys(bannerData).length > 0) setBanner(bannerData);
      setLoadingGlobal(false);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  // const fetchbanner = async () => {
  //   try {
  //     const bannerResponse = await fetch(`${API_URL}/banner`);
  //     const bannerData = await bannerResponse.json();
  //     // console.log(bannerData);
  //     if(bannerData && Object.keys(bannerData).length > 0) setBanner(bannerData);
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API:", error);
  //   }
  //   setLoadingGlobal(false);
  // };

  const [songHistory, setSongHistory] = useState(
    JSON.parse(localStorage.getItem("songHistory")) || []
  );

  useEffect(() => {
    const isSetting = localStorage.getItem("isSetting");
    if (isSetting === "false") {
      localStorage.removeItem("isSetting");
      if (!sessionStorage.getItem("reloaded")) {
        sessionStorage.setItem("reloaded", true);
        window.location.reload();
      }
    }
    fetchData();
    // fetchbanner()
  }, []);



  if (loadingGlobal) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  return (
    <>
      <section className="bg-medium w-full h-auto text-white ">
        <div className="relative  ">
          <img src={banner.banner_url} className="w-full max-h-[700px]" loading="lazy" alt={banner.banner_name} />
          <div className="absolute top-1/2 lg:top-1/4 px-2 lg:px-10 w-full " >
            <h1 className=" md:text-5xl xl:text-7xl sm:text-3xl text-lg  font-medium w-full md:w-3/4 lg:w-2/4 lg:pr-10 italic tracking-wide">
              Các bản hit cuối tuần này là gì?
            </h1>
            <div className="flex items-center justify-start lg:my-10 my-3 lg:my-7  ">
              <div
                className="flex items-center text-white py-2 px-1 lg:px-7 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer  lg:text-base text-sm"
                onClick={() => {
                  handleFetchSongs("new");
                }}
              >
                <Play size={18} className="mr-2" />
                Phát Tất Cả
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section top */}
      <section className=" pt-2 lg:pt-16 text-white px-1 lg:px-10 h-auto trans lg:-mt-[150px]">
        <div className="flex items-center flex-col md:flex-row ">
          <div className="w-[80%] lg:w-1/3 px-1 lg:px-5 relative my-1 lg:my-5 ">
            {trending.length > 0 && (
              <div
                className="cursor-pointer w-full"
                onClick={(e) => navigate('/Top/trending')}
              >
                <img className="w-full h-full" src="../imgs/image.png" />
                <p className="absolute top-2 left-7 text-black bg-yellow-500 py-1 rounded-md font-bold text-sm  px-4">
                  Top Thịnh Hành
                </p>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-stone-950/65 p-1 flex items-center justify-between w-4/5 rounded-md">
                  <div className=" flex  items-center w-[70%] flex-1">
                    <img
                      className="lg:size-12  xl:size-16 size-16 rounded-lg"
                      src={trending[0].song_image}
                    />
                    <p className="mx-3 font-medium tracking-wide truncate  flex-initial w-1/2 ">
                      {trending[0].song_name} <br />
                      <span className="text-xs lg:text-sm font-light truncate">
                        {trending[0].composer}
                      </span>
                    </p>
                  </div>
                  <div
                    className="p-2 rounded-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] mr-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFetchSongs("trending");
                    }}
                  >
                    <Play size={18} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-[80%] lg:w-1/3 px-1 lg:px-5 relative  my-1 lg:my-5">
            {topListen.length > 0 && (
              <div
                className="cursor-pointer w-full"
                onClick={(e) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate('/Top/toplisten')
                }}
              >
                <img className=" w-full h-full" src="../imgs/image (4).png" />
                <p className="absolute top-2 left-7 text-black bg-white py-1 rounded-md font-bold text-sm  px-4">
                  Top Lượt Nghe
                </p>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-stone-950/65 p-1 flex items-center justify-between w-4/5 rounded-md">
                  <div className=" flex  items-center w-[70%] flex-1">
                    <img
                      className="lg:size-12  xl:size-16 size-16 rounded-lg"
                      src={topListen[0].song_image}
                    />
                    <p className="mx-3 font-medium tracking-wide truncate  flex-initial w-1/2 ">
                      {topListen[0].song_name} <br />
                      <span className="text-xs lg:text-sm font-light truncate">
                        {topListen[0].composer}
                      </span>
                    </p>
                  </div>
                  <div
                    className="p-2 rounded-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] mr-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      handleFetchSongs("toplisten");
                    }}
                  >
                    <Play size={18} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-[80%] lg:w-1/3 px-1 lg:px-5 relative  my-1 lg:my-5">
            {topLike.length > 0 && (
              <div
                className="cursor-pointer w-full"
                onClick={(e) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate('/Top/yeuthich')
                }}
              >
                <img className="w-full h-full" src="../imgs/image (1).png" />
                <p className="absolute top-2 left-7 text-black bg-white py-1 rounded-md font-bold text-sm  px-4">
                  Top Yêu Thích
                </p>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-stone-950/65 p-1 flex items-center justify-between w-4/5 rounded-md">
                  <div className=" flex  items-center w-[70%] flex-1">
                    <img
                      className="lg:size-12  xl:size-16 size-16 rounded-lg"
                      src={topLike[0].song_image}
                    />
                    <p className="mx-3 font-medium tracking-wide truncate  flex-initial w-1/2 ">
                      {topLike[0].song_name} <br />
                      <span className="text-xs lg:text-sm font-light truncate">
                        {topLike[0].composer}
                      </span>
                    </p>
                  </div>
                  <div
                    className="p-2 rounded-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] mr-3 cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFetchSongs("yeuthich");
                    }}
                  >
                    <Play size={18} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* section country */}
      <section className=" bg-medium pt-5 lg:pt-16 text-white px-1 md:px-5 lg:px-10 h-auto">
        <h1 className="lg:text-3xl md:text-xl text-xl font-medium ">Bài Hát Mới Nhất Hàng Tuần </h1>
        <Country />
      </section>
      <section className="bg-medium pt-10 lg:pt-20 text-white px-1 lg:px-10 h-auto tracking-wide">
        <h1 className="lg:text-3xl text-2xl font-medium mb-8 lg:mb-16">Nhạc Nghe Gần Đây</h1>
        {songHistory.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView="auto" // Số item hiện trong 1 lần
            className="mySwiper "
          >
            {songHistory.map((song, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }} className="mr-2 group cursor-pointer">
                <div
                  className="text-center flex flex-col items-center"
                  onDoubleClick={() => handleAddSong("song", song.id)}
                  onClick={() => handleClick(song.id)}
                >
                  <img
                    src={song.song_image} // URL hình ảnh của bài hát
                    className="rounded-full mb-2 lg:mb-7 size-36 sm:size-44 lg:size-52 "
                  />
                  <p className="font-medium mb-2 text-sm sm:text-base group-hover:underline text-center w-4/5 truncate max-w-[150px]">
                    {song.song_name}
                  </p>
                  <p className="text-sm text-slate-700 truncate w-3/4">
                    {song.composer}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-lg text-slate-400">
            Không có bài hát nào trong lịch sử nghe.
          </p>
        )}
      </section>
      {/* section artist */}
      <section className="bg-medium pt-10 lg:pt-20 text-white px-1 lg:px-10 h-auto tracking-wide w-full max-w-full">
        <div className="flex items-center flex-wrap justify-between">
          <h1 className="text-2xl lg:text-3xl font-medium mb-2 md:mb-16">
            Top Ca Sĩ Được Yêu Thích
          </h1>
          <div className="flex items-center text-slate-500 hover:text-white mb-2 cursor-pointer duration-300">
            <p className="text-sm  ">Xem Thêm </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
        <ArtistSlide />
      </section>
      {/* section album */}
      <section className="bg-medium pt-10 lg:pt-20 text-white px-1 lg:px-10 h-auto tracking-wide">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-medium mb-6 md:mb-16">Album Hot</h1>
          <Link
            to={"/Albums"}
            className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
            <p className="text-sm  " >Xem Thêm </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
        <div className="flex items-center ">
          <SlideAlbum />
        </div>
      </section>
      {/* section gerde */}
      <section className="bg-medium pt-10 lg:pt-20 text-white px-1 lg:px-10 h-auto  tracking-wide">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-medium mb-16">Thể Loại</h1>
          <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
            <Link to={"/Genre"} className="text-sm  ">
              Xem Thêm
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
        <GenerSlide />
      </section>
      {/* section playlist */}
      <section className="bg-medium pt-10 lg:pt-20 text-white px-1 lg:px-10 h-auto  tracking-wide">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-medium mb-16">Danh Sách Phát</h1>

        </div>
        <PlayListSlide />
      </section>


    </>
  );
}

export default Dashboard;
