import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Play } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { API_URL } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import SlideAlbum from "./Albums/SlideAlbum.jsx"

function Dashboard() {
  const { handleFetchSongs, handleAddSong, handleClick } = useContext(UserContext);
  const [trending, setTrending] = useState([]);
  const [topListen, setTopListen] = useState([]);
  const [topLike, setTopLike] = useState([]);
  const [countries, setCountries] = useState([]); // Dữ liệu quốc gia từ API /quoc-gia
  const [activeTab, setActiveTab] = useState(1); // Quốc gia đang được chọn
  const [songs, setSongs] = useState([]); // Danh sách bài hát của quốc gia đang chọn
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const trendingResponse = await fetch(`${API_URL}/trending`);
      const topListenResponse = await fetch(`${API_URL}/top-listen`);
      const topLikeResponse = await fetch(`${API_URL}/top-like`);
      const artistList = await fetch(`${API_URL}/ca-si`);
      const genresList = await fetch(`${API_URL}/the-loai`);
      const playlistsList = await fetch(`${API_URL}/playlist-public`);

      const trendingData = await trendingResponse.json();
      const topListenData = await topListenResponse.json();
      const topLikeData = await topLikeResponse.json();
      const artistData = await artistList.json();
      const genresData = await genresList.json();
      const playlistsData = await playlistsList.json();

      setTrending(trendingData);
      setTopListen(topListenData);
      setTopLike(topLikeData);
      setLoadingGlobal(false);
      setArtists(artistData);
      setGenres(genresData);
      setPlaylists(playlistsData);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const [songHistory, setSongHistory] = useState(
    JSON.parse(localStorage.getItem("songHistory")) || []
  );

  useEffect(() => {
    fetch(`${API_URL}/ca-si`)
      .then((response) => response.json())
      .then((data) => {
        // Mapping the fetched data to match the format needed for ArtistCard
        const formattedArtists = data.map((artist) => ({
          name: artist.singer_name || "Unknown Artist",
          profession: "Nghệ Sĩ",
          id: artist.id,
          imageUrl: artist.singer_image || "https://via.placeholder.com/150",
        }));
        setArtists(formattedArtists);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu nghệ sĩ:", error));
  }, []);

  // Lấy danh sách quốc gia khi component được render lần đầu
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_URL}/quoc-gia`); // Gọi API /quoc-gia
        setCountries(response.data); // Lưu danh sách quốc gia vào state
        if (response.data.length > 0) {
          setActiveTab(response.data[0].id); // Đặt quốc gia đầu tiên làm mặc định
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Lấy danh sách bài hát khi activeTab thay đổi
  useEffect(() => {
    if (activeTab) {
      const fetchSongs = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${API_URL}/quoc-gia/${activeTab}/bai-hat`
          ); // Gọi API /bai-hat với ID quốc gia
          if (response.status === 200) {
            setSongs(response.data); // Lưu danh sách bài hát vào state
          } else {
            setSongs([]); // Nếu không có bài hát nào thì set state rỗng
          }
        } catch (error) {
          setSongs([]);
          console.error("Error fetching songs:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSongs();
    }
  }, [activeTab]);

  useEffect(() => {
    const isSetting = localStorage.getItem("isSetting");
    if (isSetting === "false") {
      localStorage.removeItem("isSetting"); // Remove it to prevent repeated reloads
      if (!sessionStorage.getItem("reloaded")) {
        sessionStorage.setItem("reloaded", true); // Flag that reload has occurred
        window.location.reload(); // Reload the page
      }
    }
    fetchData();
  }, []);

  // Hàm render danh sách quốc gia
  const renderCountries = () => {
    return countries.map((country) => (
      <p
        key={country.id}
        className={`cursor-pointer duration-300 truncate py-2 my-2 px-2 lg:px-4 lg:px-8 rounded-full mr-2 lg:mr-6 lg:mr-10 ${activeTab === country.id
            ? "bg-gradient-to-r from-[#FF0065] to-[#FF553E]"
            : "bg-slate-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E]"
          }`}
        onClick={() => setActiveTab(country.id)} // Đổi quốc gia khi nhấn vào tab
      >
        {country.name_country}
      </p>
    ));
  };

  // Hàm render danh sách bài hát
  const renderSongs = () => {
    if (loading) {
      return <p>Đang tải dữ liệu...</p>;
    }
    if (songs.length === 0) {
      return <p>Không có bài hát nào được tìm thấy.</p>;
    }
    const limitedSongs = songs.slice(0, 12);
    return limitedSongs.map((song, index) => (
      <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 2xl:w-1/4 pr-1 sm:pr-5 lg:pr-10 mb-1 sm:mb-5 md:mb-10 " key={song.id}>
        <div
          className="w-full flex items-center border-b border-slate-700 sm:pb-2 cursor-pointer hover:bg-gray-800"
          onDoubleClick={() => {handleAddSong("song", song.id)}}
          onClick={() => handleClick(song.id)}
        >
          <p className="text-lg sm:text-xl text-slate-700 font-medium p-3 sm:p-6">{index + 1}</p>
          <img
            className="size-10 sm:size-16 rounded-md"
            src={song.song_image}
            alt={song.song_name}
          />
          <p className="text-base ml-3 truncate">
            {song.song_name}
            <br />
            <span className="text-xs text-slate-600 truncate hover:underline">{song.singer_name}</span>
          </p>
        </div>
      </div>
    ));
  };

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
          <img src="../imgs/Group 92.png" />
          <div className="absolute top-1/2 px-2 lg:px-10 w-full " >
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
      <section className=" bg-medium pt-2 lg:pt-16 text-white px-1 lg:px-10 h-auto ">
        <div className="flex items-center flex-col md:flex-row ">
          <div className="w-[80%] lg:w-1/3 px-1 lg:px-5 relative my-1 lg:my-5 ">
            {trending.length > 0 && (
              <div 
              className="cursor-pointer"
              onClick={(e)=> navigate('/Top/trending')}
              >
                <img className=" w-full" src="../imgs/image.png" />
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
              className="cursor-pointer"
              onClick={(e)=> navigate('/Top/listen')}
              >
                <img className=" w-full" src="../imgs/image (4).png" />
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
              className="cursor-pointer"
              onClick={(e)=> navigate('/Top/like')}
              >
                <img className=" w-full" src="../imgs/image (1).png" />
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
      <section className=" bg-medium pt-5 lg:pt-24 text-white px-1 md:px-5 lg:px-10 h-auto">
        <h1 className="lg:text-3xl md:text-xl text-xl font-medium ">Bài Hát Mới Nhất Hàng Tuần </h1>
        <div className="flex items-center justify-between my-2 lg:my-7">
          <div className="flex items-center flex-wrap text-sm tracking-wide ">
            {renderCountries()}
          </div>
          <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
            <Link to={"/Genre"}><p className="text-sm cursor-pointer truncate">Xem Thêm </p></Link>
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
        <div className="flex items-center mt-2 lg:mt-16 flex-wrap ">
          {renderSongs()}
        </div>
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
                  <p className="font-medium mb-2 text-sm sm:text-base group-hover:underline text-center w-4/5 truncate">
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

        <Swiper
          spaceBetween={20}
          slidesPerView="auto" // Số item hiện trong 1 lần
          className="mySwiper "
        >
          {artists.map((artist) => (
            <SwiperSlide key={artist.id} style={{ width: "auto" }}>
              <Link to={`/ProfileArtist/${artist.id}`} className="text-center group">
                <div>
                  <img
                    src={artist.singer_image} // URL hình ảnh của nghệ sĩ
                    alt={artist.singer_name}
                    className="rounded-full mb-3  size-36 sm:size-44 lg:size-52"
                  />
                </div>
                <p className="font-medium mb-2 text-base text-center group-hover:underline w-full truncate">
                  {artist.singer_name}
                </p>
                <p className="text-sm text-slate-700 w-fulltext-center">Ca Sĩ</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="bg-medium pt-10 lg:pt-20 text-white px-1 lg:px-10 h-auto tracking-wide">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-medium mb-6 md:mb-16">Album Hot</h1>
          <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
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
        <div className="flex items-center ">
          <SlideAlbum />
        </div>
      </section>
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
        <Swiper
          spaceBetween={20}
          slidesPerView="auto" // Số item hiện trong 1 lần
          className="mySwiper "
        >
          {genres.map((genre) => (
            <SwiperSlide key={genre.id} style={{ width: "auto" }}>
              <div
                key={genre.id}
                className="pr-3 pb-3 group"
                onDoubleClick={() => handleFetchSongs("theloai", genre.id)}
              >
                <Link
                  to={`/GenreSongs/${genre.id}`}
                  className="md:w-64 w-32 h-32 md:h-64 rounded-xl flex items-center justify-center bg-cover bg-center brightness-100 transition-all duration-300 group-hover:brightness-125"
                  style={{
                    backgroundImage: `url(${genre.background})`,
                  }}
                >
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {playlists.length > 0 && <section className="bg-medium pt-10 lg:pt-20 text-white px-1 lg:px-10 h-auto  tracking-wide">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-medium mb-16">Danh Sách Phát</h1>
        </div>
        <Swiper
          spaceBetween={20}
          slidesPerView="auto" // Số item hiện trong 1 lần
          className="mySwiper "s
        >
          {playlists.map((genre) => (
            <SwiperSlide key={genre.id} style={{ width: "auto" }}>
              <div
                key={genre.id}
                className="pr-3 pb-3 group"
                onDoubleClick={() => handleFetchSongs("theloai", genre.id)}
              >
                <Link
                  to={`/Playlists/${genre.id}`}
                  className="md:w-64 w-32 h-32 md:h-64 rounded-xl flex items-center justify-center bg-cover bg-center brightness-100 transition-all duration-300 group-hover:brightness-125"
                  style={{
                    backgroundImage: `url(${genre.background})`,
                  }}
                >
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section> }
      
    </>
  );
}

export default Dashboard;
