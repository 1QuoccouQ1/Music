import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Play, Heart, CirclePlus } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../ContextAPI/UserContext";
import { API_URL } from "../../services/apiService";
import { toast } from "react-toastify";
import PlaylistDiv from '../Play-list/PlayList';

function ListSongs({ songs }) {

    const { handleAddSong, handleClick } = useContext(UserContext);
    const [SongFavourite, setIsSongFavourite] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị Modal
    const [selectedSongId, setSelectedSongId] = useState(null); // Lưu songId được chọn

    useEffect(() => {
        const FavouriteSong = async () => {
            try {
                const response = await fetch(
                    API_URL + `/${user.id}/bai-hat-yeu-thich`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    }
                );
                const data = await response.json();
                // console.log(response);
                if (response.status === 200) {
                    const songId = data.map((song) => song.id);
                    // console.log(data);
                    setIsSongFavourite(songId);
                } else {
                    console.log("Lỗi khi lấy danh sách bài hát yêu thích");
                }
            } catch (err) {
                console.log(err);
            }
        };
        if (user) {
            FavouriteSong();
        }
    }, []);
    const handleSongFavourite = (song_id, check) => {
        if (!user) {
            // Kiểm tra đã đăng nhập chưa
            toast.error(
                "Bạn chưa đăng nhập, vui lòng đăng nhập để thêm vào yêu thích."
            );
        } else {
            // Gửi request API khi người dùng nhấn "Theo giỏi"
            fetch(API_URL + "/bai-hat-yeu-thich", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({
                    liked: !check,
                    song_id: song_id,
                    user_id: user.id,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Xử lý dữ liệu trả về từ API (nếu cần)
                    // console.log('Đã đánh dấu yêu thích:', data.message);
                    if (check) {
                        setIsSongFavourite((set) => {
                            return set.filter((id) => id !== song_id);
                        });
                    } else {
                        setIsSongFavourite((set) => {
                            return [...set, song_id];
                        });
                    }
                    toast.success(data.message);
                })
                .catch((error) => {
                    console.error("Lỗi khi gửi yêu cầu:", error);
                });
        }
    };

    const openModal = (songId) => {
        setSelectedSongId(songId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedSongId(null);
    };

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds =
            remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };


    return (
        <>
        <table className='min-w-full text-white text-xs sm:text-sm md:text-base mt-8'>
            <thead>
                <tr className='text-left border-b border-gray-600'>
                    <th className='py-2 w-2 text-center'>#</th>
                    <th className='py-2 px-2 sm:px-4'>Bài hát</th>
                    <th className='py-2 px-4 hidden md:table-cell'>Tên Ca Sĩ</th>
                    <th className='py-2 px-4 text-center hidden md:table-cell'>Lượt nghe</th>
                    <th className='py-2 px-4 text-right hidden md:table-cell'>Thời lượng</th>
                </tr>
            </thead>
            <tbody>
                {songs.map((song, index) => (
                    <tr
                        onClick={() => handleClick(song.id)}
                        onDoubleClick={() => handleAddSong("song", song.id)}
                        key={song.id}
                        className='group border-b-[10px] border-transparent hover:bg-slate-800 cursor-pointer duration-300'
                    >
                        <td className='py-2 md:px-4 text-center'>
                            <Play
                                size={16}
                                className='hidden group-hover:block duration-300'
                            />
                            <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>
                                {index + 4}
                            </p>
                        </td>
                        <td className='flex items-center space-x-4 px-1 md:px-4 ' >
                            <img
                                src={song.song_image}
                                alt={song.song_name}
                                className='w-10 h-10 sm:w-12 sm:h-12 rounded-md'
                            />
                            <div className='w-[200px] md:w-[200px] xl:w-full truncate'>
                                <p className='font-semibold cursor-pointer truncate' >
                                    {song.song_name}
                                </p>
                                <p className='text-gray-400 truncate'>
                                    {song.provider}
                                </p>
                            </div>
                        </td>
                        <td className='px-1 md:px-4 hidden md:table-cell md:w-[150px] lg:w-[200px] '>
                            <Link to={`/ProfileArtist/${song.singer_id}`}
                                onClick={(e) => e.stopPropagation()}>
                                {song.singer_name}
                            </Link>
                        </td>
                        <td className='hidden md:table-cell px-4 text-center'>
                            {song.listen_count || '0'}
                        </td>
                        <td className='px-1 md:px-4 h-full md:w-[100px]'>
                            <div className='flex items-center justify-end gap-4'>
                                <div className='flex items-center gap-4 lg:opacity-0 h-full group-hover:opacity-100  duration-300'>
                                    {SongFavourite.includes(song.id) ? (
                                        <Heart
                                            size={22}
                                            fill='red'
                                            className='text-red-500 cursor-pointer hover:scale-110 hover:fill-pink-600 duration-300'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSongFavourite(song.id, true);
                                            }
                                            }
                                        />
                                    ) : (
                                        <Heart
                                            size={22}
                                            className='text-red-500 cursor-pointer hover:scale-110 hover:fill-pink-600 duration-300'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSongFavourite(song.id, false)
                                            }
                                            }
                                        />
                                    )}

                                    <CirclePlus
                                        size={22}
                                        className='text-slate-500 cursor-pointer hover:scale-110 duration-300'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (JSON.parse(localStorage.getItem("user"))) {
                                                openModal(song.id)
                                            } else {
                                                toast.error(
                                                    "Bạn chưa đăng nhập, vui lòng đăng nhập để thêm vào playlist."
                                                );
                                            }
                                        }}
                                    />
                                    {/* <PlaylistDiv  songId = {33}/> */}

                                </div>
                                <span className='hidden md:table-cell'>{formatTime(song.time) || 'N/A'}</span>
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {showModal && (
            <PlaylistDiv
            songId={selectedSongId} // Truyền songId vào PlaylistDiv
            onClose={closeModal} // Truyền hàm đóng Modal
            />
        )}
        </>
    );
}

export default ListSongs;