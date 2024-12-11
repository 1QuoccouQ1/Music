import React, { useEffect, useState } from "react";
import { API_URL } from "../../services/apiService";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

function Genre() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [songs, setSongs] = useState({});

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
      <section className="bg-medium w-full h-auto pt-16 text-white px-10">
        <h1 className="text-3xl font-medium mb-10">
          Thể Loại Được Nghe Nhiều Nhất
        </h1>
        <Swiper
          spaceBetween={20}
          slidesPerView="auto" // Số item hiện trong 1 lần
          className="mySwiper "
        >
          <div className="grid grid-cols-4 gap-4">
            {countries.map((country, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <Link
                  key={country.id}
                  to={`/SongGlobal/${country.id}`}
                  className="relative group"
                >
                  {/* Ảnh nền */}
                  <div
                    className={`min-w-[300px] w-1/4 h-[300px] rounded-lg cursor-pointer opacity-60 group-hover:opacity-100 duration-300`}
                    style={{
                      backgroundImage: `url(${country.background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>

                  {/* Tên quốc gia */}
                  <p className="text-2xl sm:text-3xl font-bold tracking-wide text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {country.name_country}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </div>
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
            className="bg-medium w-full h-auto pt-16 text-white px-10"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-medium mb-16">
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
            <div className="flex items-center">
              {songs[category.id].slice(0, 5).map((song,index) => (
                 <SwiperSlide key={index} style={{ width: "auto" }}>
                <div key={song.id} className="w-[300px] h-[300px] px-3 rounded-md">
                  <div
                    style={{
                      backgroundImage: `url(${song.song_image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="w-full h-full cursor-pointer rounded-md"
                  />
                </div>
                </SwiperSlide>
              ))}
            </div>
            </Swiper>
          </section>
        ))}
    </div>
  );
}

export default Genre;
