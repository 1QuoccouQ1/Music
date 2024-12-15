import React, { useEffect, useState, useContext } from 'react';
import { Heart, Play, CirclePlus, Ellipsis } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../../services/apiService';
import 'react-toastify/dist/ReactToastify.css';
import ArtistRankingCard from './ArtistRankingCard';
import { Link } from 'react-router-dom';
import { UserContext } from "../../ContextAPI/UserContext";
import { useNavigate } from "react-router-dom";
import PlaylistDiv from '../Play-list/PlayList';

const RankingBoard = () => {
    const [rankings, setRankings] = useState([]);
    const [songs, setSongs] = useState([]);
    const [favouriteSongIds, setFavouriteSongIds] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị Modal
    const [selectedSongId, setSelectedSongId] = useState(null); // Lưu songId được chọn
    const user = JSON.parse(localStorage.getItem('user'));
    const { handleAddSong, handleFetchSongs } = useContext(UserContext);
    const navigate = useNavigate();

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

    const toggleFavourite = async (song_id, isFavourite) => {
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
                    song_id: song_id,
                    user_id: user.id,
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
                const data = await response.json();
                toast.error(data.message || 'Không thể cập nhật trạng thái bài hát!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái yêu thích:', error);
            toast.error('Có lỗi xảy ra.');
        }
    };

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds =
            remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };


    const openModal = (songId) => {
        setSelectedSongId(songId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedSongId(null);
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
        <div className='bg-gray-900 min-h-screen py-10 px-4'>
            <div className='md:flex items-center justify-between '>
                <h2 className='w-1/2 text-white text-lg sm:text-2xl md:text-4xl font-bold mb-12 border-l-4 border-l-blue-400 pl-5'>
                    Bảng Xếp Hạng Tuần
                </h2>
                <div className="flex items-center text-white w-[180px] py-2 px-7 opacity-100 lg:opacity-80 hover:opacity-100 rounded-md bg-gradient-to-r from-[#FF0065] to-[#FF553E] cursor-pointer" onClick={() => { handleFetchSongs("bxh") }}>
                <Play size={18} className="mr-2" />
                Phát Tất Cả
              </div>

            </div>
            

            {/* Top 3 Ranking Cards */}
            <div className='flex flex-col lg:flex-row  justify-center items-center md:items-start w-full space-y-6 md:space-y-0 md:space-x-8 mb-12'>
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
                                        className='hidden group-hover:block duration-300'
                                    />
                                    <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>
                                        {index + 4}
                                    </p>
                                </td>
                                <td className='flex items-center space-x-4 px-4 cursor-pointer' onDoubleClick={() => handleAddSong("song", song.id)}>
                                    <img
                                        src={song.song_image}
                                        alt={song.song_name}
                                        className='w-10 h-10 sm:w-12 sm:h-12 rounded-md'
                                    />
                                    <div className='w-full truncate'>
                                        <p className='font-semibold cursor-pointer' onClick={() => navigate(`/SongDetail/${song.id}`)}>
                                            {song.song_name}
                                        </p>
                                        <p className='text-gray-400'>
                                            {song.provider}
                                        </p>
                                    </div>
                                </td>
                                <td className='px-4'>
                                    <Link to={`/ProfileArtist/${song.singer_id}`}>
                                        {song.singer_name}
                                    </Link>
                                </td>
                                <td className='px-4 text-center'>
                                    {song.listen_count || 'N/A'}
                                </td>
                                <td className='flex items-center justify-end gap-4 px-4 '>
                                    <div className='flex items-center gap-4 opacity-0 h-full group-hover:opacity-100 duration-300'>
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
                                             className='text-slate-500 cursor-pointer hover:scale-110 duration-300'
                                            onClick={() => openModal(song.id)} 
                                        />
                                    </div>

                                    <span>{formatTime(song.time) || 'N/A'}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {/* Modal */}
             {showModal && (
                    <PlaylistDiv
                    songId={selectedSongId} // Truyền songId vào PlaylistDiv
                    onClose={closeModal} // Truyền hàm đóng Modal
                    />
                )}
            <ToastContainer />
        </div>
    );
};

export default RankingBoard;
