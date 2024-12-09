import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Play, Heart, CirclePlus } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function SongGlobal() {
    const [countries, setCountries] = useState([]);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    'https://admin.soundwave.io.vn/api/quoc-gia'
                );
                if (response.status === 200) {
                    setCountries(response.data);
                } else {
                    throw new Error('Không thể lấy dữ liệu quốc gia');
                }
            } catch (err) {
                setError(err.message);
                console.error('Lỗi khi gọi API:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (!id) return;
                setLoading(true);
                const response = await axios.get(
                    `https://admin.soundwave.io.vn/api/quoc-gia/${id}/bai-hat`
                );
                if (response.status === 200) {
                    setSongs(response.data);
                } else {
                    setSongs([]);
                }
            } catch (err) {
                setError(err.message);
                console.error('Lỗi khi gọi API bài hát:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [id]);

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds =
            remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    if (loading) {
        return <p className='text-center mt-10'>Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p className='text-center mt-10 text-red-500'>{error}</p>;
    }

    const currentCountry = countries.find(
        country => country.id === parseInt(id)
    );

    return (
        <div className='bg-medium w-full h-auto pb-40'>
            {/* Quốc gia */}
            {currentCountry && (
                <div className='relative w-full h-[400px] sm:h-[600px]'>
                    <img
                        src={currentCountry.background || ''}
                        className='rounded-t-xl h-full w-full object-cover'
                        alt={currentCountry.name_country || 'Quốc gia'}
                    />
                    <div className='flex flex-col items-center justify-center absolute bottom-7 px-4 md:left-16 gap-4 md:gap-8'>
                        <div>
                            <p className='text-sm md:text-base'>
                                Thể Loại Theo Vùng Đất Nước
                            </p>
                            <div className='flex items-center my-5'>
                                <p className='text-3xl lg:text-5xl font-semibold text-white'>
                                    {currentCountry.name_country || 'Quốc Gia'}
                                </p>
                                <img
                                    className='w-6 h-6 ml-2'
                                    src='../imgs/pepicons-pop_checkmark-filled.png'
                                    alt='Checkmark'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bảng bài hát */}
            {songs.length > 0 ? (
                <table className='min-w-full text-white text-xs sm:text-sm md:text-base mt-8'>
                    <thead>
                        <tr className='text-left border-b border-gray-600'>
                            <th className='py-2 w-2 text-center'>#</th>
                            <th className='py-2 px-2 sm:px-4'>Bài hát</th>
                            <th className='py-2 px-2 sm:px-4'>Tên Ca Sĩ</th>
                            <th className='py-2 px-2 sm:px-4 text-center'>Lượt nghe</th>
                            <th className='py-2 px-2 sm:px-4 text-right'>Thời lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr
                                key={song.id}
                                className='group border-b-[10px] border-transparent hover:bg-slate-800 duration-300'
                            >
                                <td className='py-2 px-2 sm:px-4 text-center'>
                                    <Play
                                        size={16}
                                        className='hidden group-hover:block duration-300'
                                    />
                                    <p className='text-xs w-[18px] h-[18px] group-hover:hidden'>
                                        {index + 1}
                                    </p>
                                </td>
                                <td className='flex items-center space-x-2 px-2 sm:px-4'>
                                    <img
                                        src={song.song_image}
                                        alt={song.song_name}
                                        className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md'
                                    />
                                    <div className='w-full truncate'>
                                        <p className='font-semibold'>{song.song_name}</p>
                                        <p className='text-gray-400 text-xs sm:text-sm'>
                                            {song.provider}
                                        </p>
                                    </div>
                                </td>
                                <td className='px-2 sm:px-4'>
                                    <Link
                                        to={`/ProfileArtist/${song.singer_id}`}
                                        className='text-sm sm:text-base'
                                    >
                                        {song.singer_name}
                                    </Link>
                                </td>
                                <td className='px-2 sm:px-4 text-center'>
                                    {song.listen_count || '0'}
                                </td>
                                <td className='flex items-center justify-end gap-2 sm:gap-4 px-2 sm:px-4'>
                                    <div className='flex items-center gap-2 sm:gap-4 opacity-0 group-hover:opacity-100 duration-300'>
                                        <Heart
                                            size={18}
                                            className='text-red-500 cursor-pointer hover:scale-110 hover:fill-pink-600 duration-300'
                                        />
                                        <CirclePlus
                                            size={18}
                                            className='text-slate-500'
                                        />
                                    </div>
                                    <span>{formatTime(song.time) || 'N/A'}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='text-center text-gray-400 mt-10'>
                    Không có bài hát nào để hiển thị.
                </p>
            )}

            <ToastContainer />
        </div>
    );
}

export default SongGlobal;
