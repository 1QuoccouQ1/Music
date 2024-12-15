import { Heart} from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
function SlideAlbum() {
    const [listAlbum, setListAlbum] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [albumFavorite, setAlbumFavorite] = useState([]);

    const fetchAlbum = async () => {
        try {
            const response = await fetch(API_URL + `/album`);
            const data = await response.json();

            if (response.status == false) {
                console.error('Error fetching artist data:', data.message);

            } else {
                setListAlbum(data); // Cập nhật state `artist`
            }
        } catch (error) {
            console.error('Error fetching artist data:', error.message);
        }
    }
    useEffect(() => {
        fetchAlbum();
    }, []);

    const fetchAlbumFAvorite = async (user_id) => {
        try {
            const response = await fetch(API_URL + `/${user_id}/album-yeu-thich`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const data = await response.json();

            if (response.status == false) {
                console.error('Error fetching artist data:', data.message);

            } else {
                const ids = data.map((album) => album.id)
                setAlbumFavorite(ids); // Cập nhật state `artist`
            }
        } catch (error) {
            console.error('Error fetching artist data:', error.message);
        }
    }
    if (user) {
        useEffect(() => {
            fetchAlbumFAvorite(user.id);
        }, [user.id]);
    }
    const handleAlbumFavourite = (albumId, like) => {
        if (!user) {
            toast.error('Vui lòng đăng nhập để thêm yêu thích');
            return false;
        }
        // Gửi request API khi người dùng nhấn "Theo giỏi"
        fetch(API_URL + "/album-yeu-thich", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                liked: !like,
                album_id: albumId,
                user_id: user.id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý dữ liệu trả về từ API (nếu cần)
                // console.log('Đã đánh dấu yêu thích:', data.message);
                if (like) {
                    setAlbumFavorite((set) => {
                        return set.filter((id) => id !== albumId);
                    });
                } else {
                    setAlbumFavorite((set) => {
                        return [...set, albumId];
                    });
                }
                toast.success(data.message);
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    }
    // Hàm chuyển đổi datetime thành năm
    const extractYearFromDate = (dateString) => {
        if (!dateString) return 'Invalid date';
        const date = new Date(dateString); // Tạo đối tượng Date từ chuỗi
        if (isNaN(date.getTime())) return 'Invalid date'; // Kiểm tra nếu ngày không hợp lệ
        return date.getFullYear(); // Lấy năm
    };
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView="auto" // Số item hiện trong 1 lần
            className="mySwiper "
        >
            {listAlbum ? listAlbum.map((item, index) => (
                <SwiperSlide key={index + 1} style={{ width: "auto" }}>
                    <div className="w-[260px] flex flex-col">
                        <div className="w-[180px] group relative flex    ">
                            <img
                                src={item.image}
                                className="cursor-pointer z-10"
                                style={{
                                    width: '190px',
                                    height: '190px',
                                    borderRadius: '15px',
                                }}
                                onClick={() => navigate(`/AlbumDetail/${item.id}`)}
                            />
                            <img
                                src="../imgs/Red And Black Modern Live Music Podcast Instagram Post (2) 3.png"
                                className="absolute translate-x-1/2 w-full h-full"
                            />
                            <div
                                className="absolute cursor-pointer top-2 z-20 left-2 bg-white text-red-500 p-2 rounded-full shadow-lg transform lg:scale-0 group-hover:scale-100 transition duration-300 ease-in-out"
                            >

                                {albumFavorite != [] ? (
                                    albumFavorite.includes(item.id) ? (
                                        <Heart
                                            size={22}
                                            fill="red"
                                            onClick={() => handleAlbumFavourite(item.id, true)}
                                            className="text-red-500 opacity-100 lg:opacity-0 group-hover:opacity-100 duration-300"
                                        />
                                    ) : (
                                        <Heart
                                            size={22}
                                            onClick={() => handleAlbumFavourite(item.id, false)}
                                            className="text-red-500 opacity-100 lg:opacity-0 group-hover:opacity-100 duration-300"
                                        />
                                    )
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <p className="text-lg w-full  font-medium mt-5 mt-3 truncate">{item.album_name}</p>
                        <p className="text-sm font-medium ml-2 text-slate-500">{extractYearFromDate(item.creation_date)}</p>
                    </div>
                </SwiperSlide>
            )) : (
                <div>
                    Không có Album nào
                </div>
            )}
        </Swiper>
    );
}

export default SlideAlbum;