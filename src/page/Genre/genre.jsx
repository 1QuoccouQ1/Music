import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../services/apiService";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { UserContext } from "../../ContextAPI/UserContext";

function Genre() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [songs, setSongs] = useState({});
  const { handleAddSong, handleClick } = useContext(UserContext);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_URL}/quoc-gia`);
        if (!response.ok) throw new Error("Không thể tải dữ liệu quốc gia");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Lỗi khi tải quốc gia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Gọi API để lấy danh sách thể loại
    fetch(`${API_URL}/the-loai`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        // Gọi API để lấy bài hát của từng thể loại
        data.forEach((category) => {
          fetch(`${API_URL}/the-loai/${category.id}/bai-hat`)
            .then((response) => response.json())
            .then((songData) => {
              setSongs((prevSongs) => ({
                ...prevSongs,
                [category.id]: songData,
              }));
              setLoading(false);
            });
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="bg-medium h-auto">
      {/* Quốc gia */}
      <section className="bg-medium w-full h-auto pt-8 sm:pt-16 text-white px-1 md:px-10">
        <h1 className="text-2xl lg:text-3xl font-medium mb-10">
          Thể Loại Được Nghe Nhiều Nhất
        </h1>
        <Swiper
          spaceBetween={20}
          slidesPerView="auto" // Số item hiện trong 1 lần
          className="mySwiper px-2"
        >
            {countries.map((country, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <Link
                  key={country.id}
                  to={`/SongGlobal/${country.id}`}
                  className="relative group"
                >
                  {/* Ảnh nền */}
                  <div
                    className={`w-[150px] h-[100px] sm:w-56 sm:h-48 lg:w-80 lg:h-64 rounded-lg cursor-pointer opacity-80 group-hover:opacity-100 duration-300`}
                    style={{
                      backgroundImage: `url(${country.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* Thể loại */}
      {categories
        .filter(
          (category) =>
            Array.isArray(songs[category.id]) && songs[category.id].length > 0
        )
        .map((category) => (
          <section
            key={category.id}
            className="bg-medium w-full h-auto pt-8 md:pt-16 text-white px-1 md:px-10"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl lg:text-3xl font-medium mb-8 md:mb-16">
                {category.categorie_name}
              </h1>
              <div className="flex items-center text-slate-500 hover:text-white cursor-pointer duration-300">
                <Link className="text-sm" to={`/GenreSongs/${category.id}`}>
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
            <Swiper
          spaceBetween={20}
          slidesPerView="auto" // Số item hiện trong 1 lần
          className="mySwiper "
        >
              {songs[category.id].slice(0, 5).map((song,index) => (
                 <SwiperSlide key={index} style={{ width: "auto" }}>
                <div key={song.id} className="lg:w-[300px] md:w-[200px] h-auto w-40  px-3 rounded-md" 
                  onDoubleClick={() => handleAddSong("song", song.id)}
                  onClick={() => {
                    handleClick(song.id)
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${song.song_image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className=" cursor-pointer rounded-md lg:w-[300px] md:w-[200px] w-40 lg:h-[300px] md:h-[200px] h-40"
                  />
                  <div className="text-center text-sm lg:text-lg md:text-md text-white pt-2">{song.song_name}</div>
                </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        ))}
    </div>
  );
}

export default Genre;
