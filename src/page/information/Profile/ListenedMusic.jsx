import { useState, useEffect, useContext } from "react";
import { Play, Heart, CirclePlus, Ellipsis } from "lucide-react";
import { toast } from "react-toastify";
import { API_URL } from '../../../services/apiService';
import { useOutletContext } from 'react-router-dom';
import { UserContext } from '../../../ContextAPI/UserContext';
import ProfileArtistSong from "../../BXH/ProfileArtistSong";


function ListenedMusic() {
    // const [SongIdFavourite, setIsSongIdFavourite] = useState([]);
    const [SongsFavourite, setIsSongsFavourite] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const { settext } = useOutletContext();
    const { handleFetchSongs } = useContext(UserContext);
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
                <div className="w-1/3 hidden lg:flex items-center justify-center">
                    <p>Lượt nghe</p>
                </div>
                <div className="flex items-center gap-5 duration-300 w-1/3 justify-end">
                    Hành động
                </div>
            </div>

            {SongsFavourite != [] ? (
                <ProfileArtistSong
                    artistSong={SongsFavourite}
                    user_id={1}
                    length={'100'}
                />
            ) : (
                <div className="flex items-center gap-5 duration-300 w-1/3 justify-end">
                    Hành động
                </div>
            )}

        </>
    );
}

export default ListenedMusic;