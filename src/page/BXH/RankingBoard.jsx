import React, { useEffect, useState } from 'react';
import { Heart, Play, CirclePlus, Ellipsis } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../../services/apiService';
import 'react-toastify/dist/ReactToastify.css';
import ArtistRankingCard from './ArtistRankingCard';
import { Link } from 'react-router-dom';


const RankingBoard = () => {
    const [rankings, setRankings] = useState([]);
    const [songs, setSongs] = useState([]);
    const [favouriteSongIds, setFavouriteSongIds] = useState([]);
    const [error, setError] = useState(null);
    const user_id = localStorage.getItem('user.id');

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
        try {
            const response = await fetch(
                `${API_URL}/${user_id}/bai-hat-yeu-thich`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
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

    const toggleFavourite = async (song_id, isFavourite) => {
        // if (!user_id) {
        //     toast.error(
        //         'Bạn chưa đăng nhập, vui lòng đăng nhập để thêm vào yêu thích.'
        //     );
        //     return;
        // }
        try {
            const response = await fetch(`${API_URL}/bai-hat-yeu-thich`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(
                        'access_token'
                    )}`
                },
                body: JSON.stringify({
                    liked: !isFavourite,
                    song_id,
                    user_id
                })
            });

            if (response.ok) {
                setFavouriteSongIds(prev =>
                    isFavourite
                        ? prev.filter(id => id !== song_id)
                        : [...prev, song_id]
                );
                const data = await response.json();
                toast.success(data.message || 'Cập nhật thành công!');
            } else {
                toast.error('Không thể cập nhật trạng thái bài hát!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái yêu thích:', error);
            toast.error('Có lỗi xảy ra.');
        }
    };
    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60); // Lấy phần nguyên của phút
        const remainingSeconds = Math.floor(seconds % 60); // Lấy phần nguyên của giây

        // Đảm bảo có số 0 trước nếu phút hoặc giây < 10
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds =
            remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        fetchRankings();
        if (user_id) fetchFavouriteSongs();
    }, [user_id]);

    if (error) {
        return (
            <div className='bg-gray-900 min-h-screen flex items-center justify-center text-white'>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className='bg-gray-900 min-h-screen py-10 px-4'>
            <h2 className='text-white text-lg sm:text-2xl md:text-4xl font-bold mb-12 border-l-4 border-l-blue-400 pl-5'>
                Bảng Xếp Hạng Tuần
            </h2>

            {/* Top 3 Ranking Cards */}
            <div className='flex flex-col md:flex-row justify-center items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-12'>
                {rankings[1] && (
                    <div className='transform md:translate-y-4 w-full md:w-auto'>
                        <ArtistRankingCard
                            rank={2}
                            artist={{
                                id: rankings[1].singer_id,

                                name: rankings[1].singer_name,
                                imageUrl: rankings[1].song_image
                            }}
                            song={{
                                title: rankings[1].song_name,
                                artist: rankings[1].provider,
                                duration: formatTime(rankings[1].time),
                                coverImageUrl: rankings[1].song_image
                            }}
                        />
                    </div>
                )}

                {rankings[0] && (
                    <div className='transform md:translate-y-0 w-full md:w-auto'>
                        <ArtistRankingCard
                            rank={1}
                            artist={{
                                id: rankings[0].singer_id,
                                name: rankings[0].singer_name,
                                imageUrl: rankings[0].song_image
                            }}
                            song={{
                                title: rankings[0].song_name,
                                artist: rankings[0].provider,
                                duration: formatTime(rankings[0].time),
                                coverImageUrl: rankings[0].song_image
                            }}
                        />
                    </div>
                )}

                {rankings[2] && (
                    <div className='transform md:translate-y-4 w-full md:w-auto'>
                        <ArtistRankingCard
                            rank={3}
                            artist={{
                                id: rankings[2].singer_id,
                                name: rankings[2].singer_name,
                                imageUrl: rankings[2].song_image
                            }}
                            song={{
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
            <table className='min-w-full text-white text-sm sm:text-base'>
                <thead>
                    <tr className='text-left border-b border-gray-600 mb-2'>
                        <th className='py-1 w-2 text-center'>#</th>
                        <th className='py-2 px-4'>Bài hát</th>
                        <th className='py-2 px-4'>Tên Ca Sĩ</th>
                        <th className='py-2 px-4 text-center'>Lượt nghe</th>
                        <th className='py-2 px-4 text-right'>Thời lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr
                            key={song.id}
                            className='group border-b-[10px] border-transparent hover:bg-slate-800 duration-300'
                        >
                            <td className='py-2 px-4 text-center'>
                                <Play
                                    size={16}
                                    className='hidden  group-hover:block duration-300'
                                />
                                <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>
                                    {index + 4}
                                </p>
                            </td>
                            <td className='flex items-center space-x-4 px-4'>
                                <img
                                    src={song.song_image}
                                    alt={song.song_name}
                                    className='w-10 h-10 sm:w-12 sm:h-12 rounded-md'
                                />
                                <div className='w-full truncate'>
                                    <p className='font-semibold'>
                                        {song.song_name}
                                    </p>
                                    <p className='text-gray-400'>
                                        {song.provider}
                                    </p>
                                </div>
                            </td>
                              {/* Singer Column */}
                              <td className='px-4'>
                                <Link to={`/ProfileArtist/${song.singer_id}`}>
                                    {song.singer_name}
                                </Link>
                            </td>
                            <td className='px-4 text-center'>
                                {song.listen_count || 'N/A'}
                            </td>
                            <td className='flex items-center justify-end gap-4 px-4 '>
                                {/* Wrapper để kiểm soát hiển thị Heart và các icon */}
                                <div className='flex items-center gap-4 opacity-0 group-hover:opacity-100 duration-300'>
                                    {favouriteSongIds.includes(song.id) ? (
                                        <Heart
                                            size={22}
                                            fill='red'
                                            className='text-red-500 cursor-pointer hover:scale-110 hover:fill-pink-600 duration-300'
                                            onClick={() =>
                                                toggleFavourite(song.id, true)
                                            }
                                        />
                                    ) : (
                                        <Heart
                                            size={22}
                                            className='text-red-500 cursor-pointer hover:scale-110 hover:fill-pink-600 duration-300'
                                            onClick={() =>
                                                toggleFavourite(song.id, false)
                                            }
                                        />
                                    )}

                                    <CirclePlus
                                        size={22}
                                        className='text-slate-500'
                                    />
                                </div>

                                {/* Thời lượng bài hát (luôn hiển thị) */}
                                <span>{formatTime(song.time) || 'N/A'}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default RankingBoard;
