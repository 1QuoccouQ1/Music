import React, { useEffect, useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../../services/apiService';

const RankingBoardSong = ({ artistSong, user_id, length }) => {
    const [songFavourites, setSongFavourites] = useState([]);

    const fetchFavouriteSongs = async () => {
        try {
            const response = await fetch(
                `${API_URL}/${user_id}/bai-hat-yeu-thich`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                const songIds = data.map(song => song.id);
                setSongFavourites(songIds);
            } else {
                console.error('Failed to fetch favorite songs.');
            }
        } catch (err) {
            console.error('Error fetching favorite songs:', err);
        }
    };

    const handleSongFavourite = async (song_id, isFavourite) => {
        if (!user_id) {
            toast.error('Bạn chưa đăng nhập, vui lòng đăng nhập để thêm vào yêu thích.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/bai-hat-yeu-thich`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    liked: !isFavourite,
                    song_id,
                    user_id
                })
            });

            if (response.ok) {
                setSongFavourites(prev =>
                    isFavourite ? prev.filter(id => id !== song_id) : [...prev, song_id]
                );
                const data = await response.json();
                toast.success(data.message);
            } else {
                console.error('Failed to update song favorite status.');
            }
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60); // Lấy phần nguyên của phút
        const remainingSeconds = Math.floor(seconds % 60); // Lấy phần nguyên của giây

        // Đảm bảo có số 0 trước nếu phút hoặc giây < 10
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        if (user_id) fetchFavouriteSongs();
    }, [user_id]);

    return (
        <>
            {artistSong.slice(0, length).map((song, index) => (
                <tr
                    key={song.id}
                    className='group hover:bg-slate-800 py-3 px-4 rounded-lg cursor-pointer transition-all duration-300'
                >
                    <td className='flex items-center gap-3 w-1/3'>
                        <Play
                            size={18}
                            className='hidden group-hover:block duration-300'
                        />
                        <p className='text-xs group-hover:hidden'>{index + 1}</p>
                        <img
                            className='w-10 h-10 sm:w-12 sm:h-12 rounded-md'
                            src={song.song_image}
                            alt={song.song_name}
                        />
                        <p className='truncate'>{song.song_name}</p>
                    </td>
                    <td className='text-center'>{song.listen_count || 'N/A'}</td>
                    <td className='flex items-center justify-end gap-4'>
                        {songFavourites.includes(song.id) ? (
                            <Heart
                                size={22}
                                fill='red'
                                className='text-red-500 cursor-pointer'
                                onClick={() => handleSongFavourite(song.id, true)}
                            />
                        ) : (
                            <Heart
                                size={22}
                                className='text-red-500 cursor-pointer'
                                onClick={() => handleSongFavourite(song.id, false)}
                            />
                        )}
                        <p>{song.time ? formatTime(song.time) : 'N/A'}</p>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default RankingBoardSong;
