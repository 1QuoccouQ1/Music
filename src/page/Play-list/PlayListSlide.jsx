import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../services/apiService";


function PlayListSlide() {
    const [playlists, setPlaylists] = useState([]);
    const fetchData = async () => {
        try {
            const playlistsList = await fetch(`${API_URL}/playlist-public`);
            const playlistsData = await playlistsList.json();
            setPlaylists(playlistsData);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        playlists.length > 0 && (
            <Swiper
                spaceBetween={20}
                slidesPerView="auto" // Số item hiện trong 1 lần
                className="mySwiper "
            >
                {playlists.map((genre) => (
                    <SwiperSlide key={genre.id} style={{ width: "auto" }}>
                        <div
                            key={genre.id}
                            className="pr-3 pb-3 group"
                        >
                            <Link
                                to={`/Playlists/${genre.id}/public`}
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
        )
    );
}

export default PlayListSlide;