import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Play, Heart, CirclePlus } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function SongGlobal() {
    const [countries, setCountries] = useState([]); // Danh sách quốc gia
    const [songs, setSongs] = useState([]); // Danh sách bài hát
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Trạng thái lỗi
    const { id } = useParams(); // Lấy ID từ URL

    // Fetch API quốc gia
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    'https://admin.soundwave.io.vn/api/quoc-gia'
                );
                if (response.status === 200) {
                    setCountries(response.data); // Lưu dữ liệu quốc gia
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

    // Fetch API bài hát khi ID quốc gia thay đổi
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (!id) return; // Không làm gì nếu không có ID
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
        const minutes = Math.floor(seconds / 60); // Lấy phần nguyên của phút
        const remainingSeconds = Math.floor(seconds % 60); // Lấy phần nguyên của giây
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
                <div className='relative w-full h-[600px] z-10'>
                    <img
                        src={currentCountry.background || ''}
                        className='rounded-t-xl h-full w-full object-cover'
                        alt={currentCountry.name_country || 'Quốc gia'}
                    />
                    <div className='flex flex-wrap items-center justify-center absolute bottom-7 px-3 md:left-16 gap-8'>
                        <div>
                            <p>Thể Loại Theo Vùng Đất Nước</p>
                            <div className='flex items-center my-5'>
                                <p className='text-3xl lg:text-7xl font-semibold text-white '>
                                    {currentCountry.name_country || 'Quốc Gia'}
                                </p>
                                <img
                                    className='size-10 ml-5'
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
                <table className='min-w-full text-white text-sm sm:text-base mt-8'>
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
                                        {index + 1}
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
                                <td className='px-4'>
                                    <Link
                                        to={`/ProfileArtist/${song.singer_id}`}
                                    >
                                        {song.singer_name}
                                    </Link>
                                </td>
                                <td className='px-4 text-center'>
                                    {song.listen_count || '0'}
                                </td>
                                <td className='flex items-center justify-end gap-4 px-4'>
                                    <div className='flex items-center gap-4 opacity-0 group-hover:opacity-100 duration-300'>
                                        <Heart
                                            size={22}
                                            className='text-red-500 cursor-pointer hover:scale-110 hover:fill-pink-600 duration-300'
                                        />
                                        <CirclePlus
                                            size={22}
                                            className='text-slate-500'
                                        />
                                    </div>
                                    <span>
                                        {formatTime(song.time) || 'N/A'}
                                    </span>
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
