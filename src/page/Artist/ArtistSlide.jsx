import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import { API_URL } from "../../services/apiService";
import { Link, useNavigate } from "react-router-dom";

function ArtistSlide() {
    const [artists, setArtists] = useState([]);
    const fetchData = async () => {
        try {
            const artistList = await fetch(`${API_URL}/ca-si`);
            const artistData = await artistList.json();
            setArtists(artistData);
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
                            <p className="font-medium mb-2 text-base text-center group-hover:underline w-full truncate ">
                                {artist.singer_name}
                            </p>
                            <p className="text-sm text-slate-700 w-fulltext-center">Ca Sĩ</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
    );

}
export default ArtistSlide;