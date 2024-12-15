import { Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';

function InfoAlbums() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [albumFavorite, setAlbumFavorite] = useState([]);
    const { settext } = useOutletContext();

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
                setAlbumFavorite(data); // Cập nhật state `artist`
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
    useEffect(() => {
        settext(`${albumFavorite.length} Album yêu thích`);
    });
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
                        return set.filter((id) => id.id !== albumId);
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
        <>
            <section className='bg-medium w-full h-auto pb-16 pt-10 text-white px-1 lg:px-6'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                    {albumFavorite != [] ?
                        albumFavorite.map((album, index) => (
                            <div key={index} className='cursor-pointer relative group w-full'>
                                <img
                                    src={album.image}
                                    className='rounded-lg mb-2 w-full object-cover'
                                    alt='Album cover'
                                />
                                <div
                                    className="absolute cursor-pointer top-2 z-20 left-2 bg-white text-red-500 p-2 rounded-full shadow-lg transform lg:scale-0 group-hover:scale-100 transition duration-300 ease-in-out"
                                >
                                    <Heart
                                        size={22}
                                        fill="red"
                                        onClick={() => handleAlbumFavourite(album.id, true)}
                                        className="text-red-500 opacity-100 lg:opacity-0 group-hover:opacity-100 duration-300"
                                    />
                                </div>
                                <div className='flex items-start justify-between w-full'>
                                    <div className='w-5/6'>
                                        <p className='text-lg font-bold truncate group-hover:underline'>
                                            {album.album_name}
                                        </p>
                                        <p className='text-sm text-slate-500 hover:underline truncate'>
                                            {album.singer_name}
                                        </p>
                                        <p className='text-xs text-slate-500 truncate'>
                                            {extractYearFromDate(album.creation_date)}
                                        </p>
                                    </div>
                                    <img
                                        className='w-5 h-5 ml-2'
                                        src='../imgs/Img - Explicit → SVG.png'
                                        alt='Explicit'
                                    />
                                </div>
                            </div>
                        )) : (
                            <div className='cursor-pointer'>
                                Không có album nào
                            </div>
                        )}
                </div>
            </section>
        </>
    );
}

export default InfoAlbums;