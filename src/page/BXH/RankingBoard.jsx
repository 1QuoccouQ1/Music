import React, { useEffect, useState, useContext } from 'react';
import { Play } from 'lucide-react';
import { API_URL } from '../../services/apiService';
import 'react-toastify/dist/ReactToastify.css';
import ArtistRankingCard from './ArtistRankingCard';
import { UserContext } from "../../ContextAPI/UserContext";
import PlaylistDiv from '../Play-list/PlayList';
import ListSongs from '../Genre/ListSongs';

const RankingBoard = () => {
    const [rankings, setRankings] = useState([]);
    const [songs, setSongs] = useState([]);
    const [favouriteSongIds, setFavouriteSongIds] = useState([]);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const { handleFetchSongs } = useContext(UserContext);
    // const navigate = useNavigate();

    const fetchRankings = async () => {
        try {
            const response = await fetch(`${API_URL}/bxh-100`);
            if (response.ok) {
                const data = await response.json();
                setRankings(data.slice(0, 3)); // Top 3
                setSongs(data.slice(3)); // Remaining songs
            } else {
                setError('Không thể tải bảng xếp hạng.');
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi tải bảng xếp hạng.');
            console.error(error);
        }
    };

    const fetchFavouriteSongs = async () => {
        if (!user) return;
        try {
            const response = await fetch(
                `${API_URL}/${user.id}/bai-hat-yeu-thich`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                setFavouriteSongIds(data.map(song => song.id));
            } else {
                console.error('Failed to fetch favorite songs.');
            }
        } catch (err) {
            console.error('Error fetching favorite songs:', err);
        }
    };

    // const toggleFavourite = async (song_id, isFavourite) => {
    //     if (!user) {
    //         toast.error('Vui lòng đăng nhập để thêm vào danh sách yêu thích!');
    //         return null;
    //     }
    //     try {
    //         const response = await fetch(`${API_URL}/bai-hat-yeu-thich`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem(
    //                     'access_token'
    //                 )}`
    //             },
    //             body: JSON.stringify({
    //                 liked: !isFavourite,
    //                 song_id: song_id,
    //                 user_id: user.id,
    //             })
    //         });

    //         if (response.ok) {
    //             setFavouriteSongIds(prev =>
    //                 isFavourite
    //                     ? prev.filter(id => id !== song_id)
    //                     : [...prev, song_id]
    //             );
    //             const data = await response.json();
    //             toast.success(data.message || 'Cập nhật thành công!');
    //         } else {
    //             const data = await response.json();
    //             toast.error(data.message || 'Không thể cập nhật trạng thái bài hát!');
    //         }
    //     } catch (error) {
    //         console.error('Lỗi khi cập nhật trạng thái yêu thích:', error);
    //         toast.error('Có lỗi xảy ra.');
    //     }
    // };

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds =
            remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };


   
    useEffect(() => {
        fetchRankings();
        if (user) fetchFavouriteSongs();
    }, []);


    if (error) {
        return (
            <div className='bg-gray-900 min-h-screen flex items-center justify-center text-white'>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className='bg-gray-900 min-h-screen py-10 px-1 md:px-4'>
            <div className='md:flex items-center justify-between mb-4'>
                <h2 className='w-1/2 text-white text-lg sm:text-2xl md:text-4xl font-bold mb-12 border-l-4 border-l-blue-400 pl-5'>
                    Bảng Xếp Hạng Tuần
                </h2>
                <div className="flex items-center text-white w-[180px] py-2 px-7 opacity-100 lg:opacity-80 hover:opacity-100 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer" onClick={() => { handleFetchSongs("bxh") }}>
                    <Play size={18} className="mr-2" />
                    Phát Tất Cả
                </div>

            </div>
            {/* Top 3 Ranking Cards sm */}
            <div className='flex flex-col lg:hidden  justify-center items-center w-full mb-12'>
                {rankings[0] && (
                    <div className='transform flex justify-center w-full'>
                        <ArtistRankingCard
                            rank={1}
                            artist={{
                                id: rankings[0].singer_id,
                                name: rankings[0].singer_name,
                                imageUrl: rankings[0].song_image
                            }}
                            song={{
                                id: rankings[0].id,
                                title: rankings[0].song_name,
                                artist: rankings[0].provider,
                                duration: formatTime(rankings[0].time),
                                coverImageUrl: rankings[0].song_image
                            }}
                        />
                    </div>
                )}

                {rankings[1] && (
                    <div className='transform flex justify-center w-full'>
                        <ArtistRankingCard
                            rank={2}
                            artist={{
                                id: rankings[1].singer_id,
                                name: rankings[1].singer_name,
                                imageUrl: rankings[1].song_image
                            }}
                            song={{
                                id: rankings[1].id,
                                title: rankings[1].song_name,
                                artist: rankings[1].provider,
                                duration: formatTime(rankings[1].time),
                                coverImageUrl: rankings[1].song_image
                            }}
                        />
                    </div>
                )}

                {rankings[2] && (
                    <div className='transform flex justify-center w-full'>
                        <ArtistRankingCard
                            rank={3}
                            artist={{
                                id: rankings[2].singer_id,
                                name: rankings[2].singer_name,
                                imageUrl: rankings[2].song_image
                            }}
                            song={{
                                id: rankings[2].id,
                                title: rankings[2].song_name,
                                artist: rankings[2].provider,
                                duration: formatTime(rankings[2].time),
                                coverImageUrl: rankings[2].song_image
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Top 3 Ranking Cards lg */}
            <div className='hidden lg:flex flex-col lg:flex-row  justify-center items-center md:items-start w-full space-y-6 md:space-y-0 md:space-x-8 mb-12'>
                {rankings[1] && (
                    <div className='transform flex justify-center lg:translate-y-4 w-full lg:w-1/3'>
                        <ArtistRankingCard
                            rank={2}
                            artist={{
                                id: rankings[1].singer_id,
                                name: rankings[1].singer_name,
                                imageUrl: rankings[1].song_image
                            }}
                            song={{
                                id: rankings[1].id,
                                title: rankings[1].song_name,
                                artist: rankings[1].provider,
                                duration: formatTime(rankings[1].time),
                                coverImageUrl: rankings[1].song_image
                            }}
                        />
                    </div>
                )}

                {rankings[0] && (
                    <div className='transform flex justify-center lg:translate-y-0 w-full lg:w-1/3'>
                        <ArtistRankingCard
                            rank={1}
                            artist={{
                                id: rankings[0].singer_id,
                                name: rankings[0].singer_name,
                                imageUrl: rankings[0].song_image
                            }}
                            song={{
                                id: rankings[0].id,
                                title: rankings[0].song_name,
                                artist: rankings[0].provider,
                                duration: formatTime(rankings[0].time),
                                coverImageUrl: rankings[0].song_image
                            }}
                        />
                    </div>
                )}

                {rankings[2] && (
                    <div className='transform flex justify-center lg:translate-y-4 w-full lg:w-1/3'>
                        <ArtistRankingCard
                            rank={3}
                            artist={{
                                id: rankings[2].singer_id,
                                name: rankings[2].singer_name,
                                imageUrl: rankings[2].song_image
                            }}
                            song={{
                                id: rankings[2].id,
                                title: rankings[2].song_name,
                                artist: rankings[2].provider,
                                duration: formatTime(rankings[2].time),
                                coverImageUrl: rankings[2].song_image
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Ranking Table */}
            <div className='overflow-x-auto'>
                {songs.length > 0 ? (
                    <ListSongs
                        songs={songs}
                    />
                ) : (
                    <p className='text-center text-gray-400 mt-10'>
                        Không có bài hát nào để hiển thị.
                    </p>
                )}
            </div>
        </div>
    );
};

export default RankingBoard;
