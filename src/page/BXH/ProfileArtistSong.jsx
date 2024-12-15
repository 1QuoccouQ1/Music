import { Play, Heart, CirclePlus, Ellipsis } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { API_URL } from "../../services/apiService";
import { toast } from "react-toastify";
import { UserContext } from "../../ContextAPI/UserContext";
import { useNavigate } from "react-router-dom";
import PlaylistDiv from '../Play-list/PlayList';

const ProfileArtistSong = ({ artistSong, user_id, length }) => {
    const [SongFavourite, setIsSongFavourite] = useState([]);
    const { handleAddSong, handleClick } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị Modal
    const [selectedSongId, setSelectedSongId] = useState(null); // Lưu songId được chọn

    const navigate = useNavigate();
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

    const openModal = (songId) => {

        setSelectedSongId(songId);
        setShowModal(true);
    };

    const closeModal = () => {

        setShowModal(false);
        setSelectedSongId(null);
    };


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

    // console.log(SongFavourite);
    // Hàm định dạng thời gian
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60); // Lấy phần nguyên của phút
        const remainingSeconds = Math.floor(seconds % 60); // Lấy phần nguyên của giây

        // Đảm bảo có số 0 trước nếu phút hoặc giây < 10
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds =
            remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return artistSong.slice(0, length).map((song, index) => (
        <div key={song.id}>
            <div
                
                className={`flex items-center justify-between text-sm hover:bg-slate-800 text-white py-1 px-1 lg:px-3 rounded-lg cursor-pointer group duration-300 `}
                onDoubleClick={() => handleAddSong("song", song.id)}
                onClick={() => handleClick(song.id)}

            >
                <div className="flex items-center gap-3 w-[190px] lg:w-2/4 justify-start"   >
                    <Play size={18} className="hidden  group-hover:block duration-300" />
                    <p className="text-xs w-[18px] h-[18px] group-hover:hidden duration-300">
                        {index + 1}
                    </p>
                    <img className="size-9 md:size-12 rounded-lg" src={song.song_image} />
                    <p className="w-full truncate"  >{song.song_name}</p>
                </div>
                <div className=" items-center hidden lg:flex justify-center">
                    <p>{song.listen_count}</p>
                </div>
                <div className="flex items-center gap-5 duration-300 w-1/3 justify-end">
                    {SongFavourite != [] ? (
                        SongFavourite.includes(song.id) ? (
                            <Heart
                                size={22}
                                fill="red"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSongFavourite(song.id, true)
                                }}
                                className="text-red-500 lg:opacity-0 group-hover:opacity-100 duration-300"
                            />
                        ) : (
                            <Heart
                                size={22}
                                onClick={(e) => { e.stopPropagation(); handleSongFavourite(song.id, false) }}
                                className="text-red-500 lg:opacity-0 group-hover:opacity-100 duration-300"
                            />
                        )
                    ) : (
                        ""
                    )}
                    <CirclePlus
                        size={22}
                        className="text-slate-500 lg:opacity-0 group-hover:opacity-100 duration-300"
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
                    <p className="hidden lg:block">{formatTime(song.time)}</p>
                    <Ellipsis
                        size={22}
                        className="lg:opacity-0 group-hover:opacity-100 duration-300"
                        onClick={(e) => { e.stopPropagation(); }}
                    />
                </div>

            </div>
            {showModal && (
                <PlaylistDiv
                    songId={selectedSongId} // Truyền songId vào PlaylistDiv
                    onClose={closeModal} // Truyền hàm đóng Modal
                />
            )}
        </div>
    ));
};

export default ProfileArtistSong;
