import { Heart, Play, Ellipsis } from "lucide-react";
import ProfileArtistSong from "../BXH/ProfileArtistSong";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../services/apiService";
import { UserContext } from "../../ContextAPI/UserContext";
import { toast } from "react-toastify";

function AlbumDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [albumdetail, setAlbumdetail] = useState([]);
    const [albumSong, setAlbumSong] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [albumFavorite, setAlbumFavorite] = useState([]);
    const { handleFetchSongs } = useContext(UserContext);

    const fetchAlbum = async () => {
        try {
            const response = await fetch(API_URL + `/album/${id}`);
            const data = await response.json();

            if (response.status == false) {
                console.error('Error fetching artist data:', data.message);

            } else {
                setAlbumdetail(data); // Cập nhật state `artist`
            }
        } catch (error) {
            console.error('Error fetching artist data:', error.message);
        } finally {
            setLoading(false); // Đặt loading = false
        }
    }
    const fetchAlbumSong = async () => {
        try {
            const response = await fetch(API_URL + `/album/${id}/bai-hat`);
            const data = await response.json();

            if (response.status == false) {
                console.error('Error fetching artist data:', data.message);

            } else {
                
                setAlbumSong(data); // Cập nhật state `artist`
            }
        } catch (error) {
            console.error('Error fetching artist data:', error.message);
        } finally {
            setLoading(false); // Đặt loading = false
        }
    }
    const fetchAlbumFAvorite = async (user_id) => {
        try {
            const response = await fetch(API_URL + `/${user_id}/album-yeu-thich`,{
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
                setAlbumFavorite(ids); // Cập nhật state 
            }
        } catch (error) {
            console.error('Error fetching artist data:', error.message);
        } finally {
            setLoading(false); // Đặt loading = false
        }
    }
    if(user){
        useEffect(() => {
            fetchAlbumFAvorite(user.id);
        }, [user.id]);
    }
    useEffect(() => {
        fetchAlbum();
    }, [id]);

    useEffect(() => {
        fetchAlbumSong();
    }, [id]);

    const updatedSongs = albumSong.map(song => ({
        ...song, // Sao chép các thuộc tính hiện có của object
        song_image: albumdetail.image?? null // Ghi đè thuộc tính song_image
    }));

    const handleAlbumFavourite = (albumId, like) => {
        if(!user){
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
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }
    // console.log(albumSong);
    return (
        <>
            <section className="bg-medium w-full h-auto  pt-16  text-white px-10 ">
                <div className="lg:flex items-start w-full">
                    <div className="flex flex-col lg:w-1/3 items-center justify-center ">
                        {albumdetail && (
                            <>
                                <img
                                    src={albumdetail.image}
                                    alt={albumdetail.album_name}
                                    className="lg:w-3/4 sm:w-1/2 w-full h-auto rounded-lg"
                                />
                                <p className="text-xl text-rose-800 mt-6 text-center">
                                    Album hot
                                </p>
                                <h1 className="text-3xl font-bold text-center">
                                    {albumdetail.album_name}
                                </h1>
                                <p className="text-xl mt-2">{albumdetail.singer_name}</p>
                                
                                <p className="text-sm mt-2 text-slate-400">
                                    {albumdetail.listen_count ?? 0} người nghe
                                </p>
                                <div
                                    className="flex items-center mt-4 py-2 px-6 bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full cursor-pointer hover:opacity-85 duration-300"
                                    onClick={() => handleFetchSongs("album", albumdetail.id)}
                                >
                                    <Play />
                                    <p className="ml-2">Phát Album</p>
                                </div>
                                <div className="flex items-center justify-center my-6 space-x-4">
                                    {albumFavorite.includes(albumdetail.id) ? (
                                        <div className="p-2 bg-slate-800 rounded-full cursor-pointer">
                                            <Heart
                                                size={18}
                                                fill="red"
                                                onClick={() => handleAlbumFavourite(albumdetail.id, true)}
                                                className="text-red-500 duration-300"
                                            />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-slate-800 rounded-full cursor-pointer">
                                            <Heart
                                                size={18}
                                                onClick={() => handleAlbumFavourite(albumdetail.id, false)}
                                                className="text-red-500 duration-300"
                                            />
                                        </div>
                                    )}

                                    <div className="p-2 bg-slate-800 rounded-full cursor-pointer">
                                        <Ellipsis size={18} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="lg:w-2/3 flex items-start">
                        <div className="flex w-full  flex-col gap-2 ">
                            <div className="flex items-center justify-between">
                                <p className="text-left font-medium text-sm  cursor-pointer mr-5">
                                    Bài hát thuộc album
                                </p>
                                {/* <p className="text-right font-medium text-sm text-red-500 cursor-pointer mr-5">
                                    Xem thêm
                                </p> */}
                            </div>

                            {albumSong && albumSong.length > 0 ? (
                                <ProfileArtistSong
                                    artistSong={updatedSongs}
                                    user_id={null}
                                    length={50}
                                />
                            ) : (
                                <div className="flex items-center justify-between text-sm hover:bg-slate-800 py-1 px-3 rounded-lg cursor-pointer group duration-300">
                                    Không có bài hát nào.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}
export default AlbumDetail;