import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import  { useState, useEffect } from "react";
import axios from "axios";
import { Play } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { API_URL } from "../services/apiService";
import { Link } from "react-router-dom";

function Dashboard() {
  const {
    handleFetchSongs,
    handleAddSong,
  } = useContext(UserContext);
  const [trending, setTrending] = useState([]);
  const [topListen, setTopListen] = useState([]);
  const [topLike, setTopLike] = useState([]);
  const [countries, setCountries] = useState([]); // Dữ liệu quốc gia từ API /quoc-gia
  const [activeTab, setActiveTab] = useState(1); // Quốc gia đang được chọn
  const [songs, setSongs] = useState([]); // Danh sách bài hát của quốc gia đang chọn
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loadingGlobal, setLoadingGlobal] = useState(true);

  const fetchData = async () => {
    try {
      const trendingResponse = await fetch(
        `${API_URL}/trending`
      );
      const topListenResponse = await fetch(
        `${API_URL}/top-listen`
      );
      const topLikeResponse = await fetch(
        `${API_URL}/top-like`
      );
      const artistList = await fetch(`${API_URL}/ca-si`);
      const genresList = await fetch(
        `${API_URL}/the-loai`
      );

      const trendingData = await trendingResponse.json();
      const topListenData = await topListenResponse.json();
      const topLikeData = await topLikeResponse.json();
      const artistData = await artistList.json();
      const genresData = await genresList.json();

            setTrending(trendingData);
            setTopListen(topListenData);
            setTopLike(topLikeData);
            setLoadingGlobal(false);
            setArtists(artistData);
            setGenres(genresData);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

  const [songHistory, setSongHistory] = useState(
    JSON.parse(localStorage.getItem("songHistory")) || []
  );
    
  useEffect(() => {
      fetch(`${API_URL}/ca-si`)
          .then(response => response.json())
          .then(data => {
              // Mapping the fetched data to match the format needed for ArtistCard
              const formattedArtists = data.map(artist => ({
                  name: artist.singer_name || 'Unknown Artist',
                  profession: 'Nghệ Sĩ',
                  id: artist.id,
                  imageUrl:
                      artist.singer_image || 'https://via.placeholder.com/150'
              }));
              setArtists(formattedArtists);
          })
          .catch(error =>
              console.error('Lỗi khi lấy dữ liệu nghệ sĩ:', error)
          );
  }, []);

  // Lấy danh sách quốc gia khi component được render lần đầu
  useEffect(() => {
      const fetchCountries = async () => {
          try {
              const response = await axios.get(
                  `${API_URL}/quoc-gia`
              ); // Gọi API /quoc-gia
              setCountries(response.data); // Lưu danh sách quốc gia vào state
              if (response.data.length > 0) {
                  setActiveTab(response.data[0].id); // Đặt quốc gia đầu tiên làm mặc định
              }
          } catch (error) {
              console.error('Error fetching countries:', error);
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
                  console.error('Error fetching songs:', error);
              } finally {
                  setLoading(false);
              }
          };
          fetchSongs();
      }
  }, [activeTab]);

  useEffect(() => {
      const isSetting = localStorage.getItem('isSetting');
      if (isSetting === 'false') {
          localStorage.removeItem('isSetting'); // Remove it to prevent repeated reloads
          if (!sessionStorage.getItem('reloaded')) {
              sessionStorage.setItem('reloaded', true); // Flag that reload has occurred
              window.location.reload(); // Reload the page
          }
      }
      fetchData();
  }, []);

  // Hàm render danh sách quốc gia
  const renderCountries = () => {
      return countries.map(country => (
          <p
              key={country.id}
              className={`cursor-pointer duration-300 py-2 px-8 rounded-full mr-10 ${
                  activeTab === country.id
                      ? 'bg-gradient-to-r from-[#FF0065] to-[#FF553E]'
                      : 'bg-slate-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E]'
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
    const limitedSongs = songs.slice(0, 9);
    return limitedSongs.map((song, index) => (
      <div className="w-1/3 pr-10 mb-10" key={song.id}>
        <div className="w-full flex items-center border-b border-slate-700 pb-2 cursor-pointer" onDoubleClick={() => {handleAddSong("song",song.id)}} >
          <p className="text-xl text-slate-700 font-medium p-6">{index + 1}</p>
          <img
            className="size-16 rounded-md"
            src={song.song_image}
            alt={song.description}
          />
          <p className="text-base ml-3">
            {song.song_name}
            <br />
            <span className="text-xs text-slate-600">{song.composer}</span>
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
      <section className="bg-medium w-full h-[1000px] text-white ">
        <div className="relative  ">
          <img src="../imgs/Group 92.png" />
          <div className="absolute top-1/2 px-10 w-full">
            <h1 className="text-7xl font-medium  w-2/4 pr-10 italic tracking-wide">
              Các bản hit cuối tuần này là gì?
            </h1>
            <div className="flex items-center justify-start my-10  ">
              <div className="text-white py-2 px-7 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer" onClick={() => {handleFetchSongs("rank")}}>
                Phát Tất Cả
              </div>
            </div>
            <div className="flex items-center ">
              <div className="w-1/3 px-5 relative ">
                {trending.length > 0 && (
                  <>
                    <img className=" w-full" src="../imgs/image.png" />
                    <p className="absolute top-2 left-7 text-black bg-yellow-500 py-1 rounded-md font-bold text-sm  px-4">
                      Top Thịnh Hành{" "}
                    </p>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-stone-950/65 p-1 flex items-center justify-between w-4/5 rounded-md">
                      <div className=" flex  items-center">
                        <img
                          className=" size-16 rounded-lg"
                          src={trending[0].song_image}
                        />
                        <p className="mx-3 font-medium tracking-wide">
                          {trending[0].song_name} <br />{" "}
                          <span className="text-sm font-light">
                            {trending[0].composer}
                          </span>
                        </p>
                      </div>
                      <div className="p-2 rounded-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] mr-3 cursor-pointer" onClick={() => {handleFetchSongs("trending")}}>
                        <Play size={18} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="w-1/3 px-5 relative ">
                {topListen.length > 0 && (
                  <>
                    <img className="" src="../imgs/image (4).png" />
                    <p className="absolute top-2 left-7 text-black bg-white py-1 rounded-md font-bold text-sm  px-4">
                      Top Lượt Nghe{" "}
                    </p>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-stone-950/65 p-1 flex items-center justify-between w-4/5 rounded-md">
                      <div className=" flex  items-center">
                        <img
                          className=" size-16 rounded-lg"
                          src={topListen[0].song_image}
                        />
                        <p className="mx-3 font-medium tracking-wide">
                          {topListen[0].song_name} <br />{" "}
                          <span className="text-sm font-light">
                            {topListen[0].composer}
                          </span>
                        </p>
                      </div>
                      <div className="p-2 rounded-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] mr-3 cursor-pointer" onClick={() => {handleFetchSongs("toplisten")}}>
                        <Play size={18} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="w-1/3 px-5 relative ">
                {topLike.length > 0 && (
                  <>
                    <img className="" src="../imgs/image (1).png" />
                    <p className="absolute top-2 left-7 text-black bg-white py-1 rounded-md font-bold text-sm  px-4">
                      Top Yêu Thích{" "}
                    </p>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-stone-950/65 p-1 flex items-center justify-between w-4/5 rounded-md">
                      <div className=" flex  items-center">
                        <img
                          className=" size-16 rounded-lg"
                          src={topLike[0].song_image}
                        />
                        <p className="mx-3 font-medium tracking-wide">
                          {topLike[0].song_name} <br />{" "}
                          <span className="text-sm font-light">
                            {topLike[0].composer}
                          </span>
                        </p>
                      </div>
                      <div className="p-2 rounded-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] mr-3 cursor-pointer " onClick={() => {handleFetchSongs("yeuthich")}}>
                        <Play size={18} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" bg-medium pt-24 text-white px-10 h-auto">
        <h1 className="text-3xl font-medium ">Bảng Xếp Hạng Hàng Tuần </h1>
        <div className="flex items-center justify-between my-7">
          <div className="flex items-center text-sm tracking-wide ">
            {renderCountries()}
          </div>
          <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
            <Link to={"/BXH"}><p className="text-sm cursor-pointer">Xem Thêm </p></Link> 
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
        <div className="flex items-center mt-16 flex-wrap ">
          {renderSongs()}
        </div>
      </section>
      <section className="bg-medium pt-20 text-white px-10 h-auto tracking-wide">
        <h1 className="text-3xl font-medium mb-16">Nhạc Nghe Gần Đây</h1>
        {songHistory.length > 0 ? (
          <Swiper
            spaceBetween={30}
            slidesPerView="auto" // Số item hiện trong 1 lần
            className="mySwiper "
          >
            {songHistory.map((song, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <div className="text-center flex flex-col  items-center" onDoubleClick={()=> handleAddSong("song", song.id)}>
                  <img
                    src={song.song_image} // URL hình ảnh của bài hát
                    className="rounded-full mb-7  size-52 "
                  />
                  <p className="font-medium mb-2 text-base  text-center  w-[150px] truncate">
                    {song.song_name}
                  </p>
                  <p className="text-sm text-slate-700 truncate w-[120px]">{song.composer}</p>
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
      <section className="bg-medium pt-20 text-white px-10 h-auto tracking-wide w-full max-w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium mb-16">
            Top Nghệ Sĩ Được Yêu Thích
          </h1>
          <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
            <Link to={"/Artist"}><p className="text-sm  ">Xem Thêm </p></Link>
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
              <div className="text-center">
                <Link to = {`/ProfileArtist/${artist.id}`}>
                <img
                  src={artist.singer_image} // URL hình ảnh của nghệ sĩ
                  alt={artist.singer_name}
                  className="rounded-full mb-3  size-64"
                />
                </Link>
                <p className="font-medium mb-2 text-base">
                  {artist.singer_name}
                </p>
                <p className="text-sm text-slate-700">Ca Sĩ</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="bg-medium pt-20 text-white px-10 h-auto tracking-wide">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium mb-16">Album Hot</h1>
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
          {["Wean", "Tăng Duy Tân", "Wean", "Wean"].map((item, index) => (
            <div className="w-1/6 mr-36 flex flex-col" key={index}>
              <div className="w-full relative flex    ">
                <img src="../imgs/image 8.png" className="  z-10" />
                <img
                  src="../imgs/Red And Black Modern Live Music Podcast Instagram Post (2) 3.png"
                  className="absolute translate-x-1/2 w-full h-full"
                />
              </div>
              <p className="text-lg font-medium ml-24 mt-5 mt-3">{item}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-medium pt-20 text-white px-10 h-auto pb-48 tracking-wide">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium mb-16">Thể Loại</h1>
          <div className="flex items-center text-slate-500 hover:text-white  cursor-pointer duration-300">
            <Link to={"/Genre"}><p className="text-sm  ">Xem Thêm </p></Link>
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
        <div className="flex items-center  flex-wrap ">
          {genres.map((genre) => (
            <div key={genre.id} className="w-1/6 pr-3 pb-3" onDoubleClick={()=>handleFetchSongs("theloai",genre.id)}>
              <div
                className="w-full h-64 rounded-xl flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `url(${genre.background})`,
                }}
              >
                <p className="font-bold text-2xl  p-2 rounded-lg">
                  {genre.categorie_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
