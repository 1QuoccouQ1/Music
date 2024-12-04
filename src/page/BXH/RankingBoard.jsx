import React, { useEffect, useState } from 'react';
import ArtistRankingCard from './ArtistRankingCard';
import { Heart, CirclePlus, Ellipsis, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

function RankingBoard({ artist }) {
    const [rankings, setRankings] = useState([]);
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);

    // Helper function to format time in MM:SS format
    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await fetch(
                    'https://admin.soundwave.io.vn/api/bxh-100'
                );
                const data = await response.json();

                if (data && Array.isArray(data)) {
                    setRankings(data.slice(0, 3)); // Top 3
                    setSongs(data.slice(3)); // Rest of the songs
                } else {
                    setError('Invalid data format from API.');
                }
            } catch (error) {
                setError('Failed to fetch rankings.');
                console.error('Error fetching rankings:', error);
            }
        };

        fetchRankings();
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

            {/* Song Rankings Table */}
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
                            key={index + 3}
                            className='group border-b-[10px] border-transparent hover:bg-slate-800 duration-300 '
                        >
                            {/* Song Index Column */}
                            <td className='py-2 px-4'>
                                
                                <Play
                                    size={16}
                                    className='hidden  group-hover:block duration-300'
                                />
                               <p className='text-xs w-[18px] h-[18px] group-hover:hidden duration-300'>{index + 1}</p>
                            </td>

                            {/* Song Info Column */}
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

                            {/* Listen Count Column */}
                            <td className='px-4 text-center'>
                                {song.listen_count || 'N/A'}
                            </td>

                            {/* Icon Column */}
                            <td className='px-4'>
                                <div className='flex items-center justify-end gap-5'>
                                    <Heart
                                        size={16}
                                        className='text-red-500 opacity-0 group-hover:opacity-100 duration-300'
                                    />
                                    <CirclePlus
                                        size={16}
                                        className='text-slate-500 opacity-0 group-hover:opacity-100 duration-300'
                                    />
                                    {formatTime(song.time) || 'N/A'}
                                    <Ellipsis
                                        size={16}
                                        className='opacity-0 group-hover:opacity-100 duration-300'
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RankingBoard;
