import { useState, useEffect } from "react";
import { API_URL } from "../../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Gener() {
    const [genres, setGenres] = useState([]);

    const fetchData = async () => {
        try {
            const genresList = await fetch(`${API_URL}/the-loai`);
            const genresData = await genresList.json();
            setGenres(genresData);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        
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
                                {/* <p className="font-bold text-2xl  p-2 rounded-lg">
                                    {genre.categorie_name}
                                </p> */}
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    );
}

export default Gener;