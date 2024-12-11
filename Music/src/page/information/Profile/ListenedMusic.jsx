import { useState, useEffect, useContext } from "react";
import { Play, Heart, CirclePlus, Ellipsis } from "lucide-react";
import { toast } from "react-toastify";
import { API_URL } from '../../../services/apiService';
import { useOutletContext } from 'react-router-dom';
import { UserContext } from '../../../ContextAPI/UserContext';
import { Link, useNavigate } from "react-router-dom";

function ListenedMusic() {
    // const [SongIdFavourite, setIsSongIdFavourite] = useState([]);
    const [SongsFavourite, setIsSongsFavourite] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const { settext } = useOutletContext();
    const { handleAddSong, handleFetchSongs } = useContext(UserContext);
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
                    // const songId = data.map((song) => song.id);
                    // console.log(data);
                    // setIsSongIdFavourite(songId);
                    setIsSongsFavourite(data);

                } else {
                    console.log("Lỗi khi lấy danh sách bài hát yêu thích");
                }
            } catch (err) {
                console.log(err);
            }
        };
        if (user.id) {
            FavouriteSong();

        }
    }, [user.id]);

    useEffect(() => {
        settext(`${SongsFavourite.length} Bài hát yêu thích`);
    });
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
                        setIsSongsFavourite((set) => {
                            return set.filter((id) => id.id !== song_id);
                        });
                    } else {
                        setIsSongsFavourite((set) => {
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
    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };
    // console.log(SongsFavourite);
    return (
        <>
            <div className="flex items-center text-white justify-end text-sm py-1 px-3 rounded-lg cursor-pointer  duration-300">
                <button className='text-white py-2 px-7 rounded-md bg-gradient-to-r group w-[160px] from-[#FF0065] to-[#FF553E] lg:opacity-80 cursor-pointer hover:opacity-100 flex'
                    onClick={() => handleFetchSongs("favorite", user.id)}
                >
                    <Play size={18} className="duration-300 md:hidden group-hover:inline inline mr-2" />
                    Nghe tất cả</button>
            </div>
            <div className="flex items-center text-white justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300">
                <div className="flex items-center gap-3 w-1/3 justify-start"  >
                    <p className="text-xs w-[18px] h-[18px] duration-300">
                        #
                    </p>
                    <p className="w-full truncate " >Tên bài hát</p>
                </div>
                <div className="w-1/3 flex items-center justify-center">
                    <p>Lượt nghe</p>
                </div>
                <div className="flex items-center gap-5 duration-300 w-1/3 justify-end">
                    Hành động
                </div>
            </div>

            {SongsFavourite.map((song, index) => (
                <div
                    key={song.id}
                    className="flex items-center justify-between text-white text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300"
                >
                    <div className="flex items-center gap-3 w-1/3 justify-start" onDoubleClick={() => handleAddSong("song", song.id)}  >
                        <Play size={18} className="hidden  group-hover:block duration-300" />
                        <p className="text-xs w-[18px] h-[18px] group-hover:hidden duration-300">
                            {index + 1}
                        </p>
                        <img className="size-10 rounded-lg" src={song.song_image} onClick={() => navigate(`/SongDetail/${song.id}`)} />
                        <p className="w-full truncate " >{song.song_name}</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center">
                        <p>{song.listen_count}</p>
                    </div>
                    <div className="flex items-center gap-5 duration-300 w-1/3 justify-end">

                        <Heart
                            size={22}
                            fill="red"
                            onClick={() => handleSongFavourite(song.id, true)}
                            className="text-red-700 lg:opacity-0 group-hover:opacity-100 duration-300"
                        />

                        <CirclePlus
                            size={22}
                            className="text-slate-500 lg:opacity-0 group-hover:opacity-100 duration-300"
                        />
                        <p>{formatTime(song.time)}</p>
                        <Ellipsis
                            size={22}
                            className="lg:opacity-0 group-hover:opacity-100 duration-300"
                        />
                    </div>
                </div>
            ))}

        </>
    );
}

export default ListenedMusic;