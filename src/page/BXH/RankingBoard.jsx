import React, { useEffect, useState } from 'react';
import ArtistRankingCard from './ArtistRankingCard';
import { CiHeart } from 'react-icons/ci';

function RankingBoard() {
    const [rankings, setRankings] = useState([]);
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
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
                    setSongs(data.slice(3)); // Rest
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
            <h2 className='text-white text-lg sm:text-2xl md:text-4xl font-bold mb-12 border-l-4 border-l-blue-400 pl-5 hover:from-pink-700 hover:to-sky-400'>
                Bảng Xếp Hạng Tuần
            </h2>

            {/* Top 3 Ranking Cards */}
            <div className='flex flex-col md:flex-row justify-center items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-12'>
                {/* Top 2 */}
                {rankings[1] && (
                    <div className='transform md:translate-y-4 w-full md:w-auto'>
                        <ArtistRankingCard
                            rank={2}
                            artist={{
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

                {/* Top 1 */}
                {rankings[0] && (
                    <div className='transform md:translate-y-0 w-full md:w-auto'>
                        <ArtistRankingCard
                            rank={1}
                            artist={{
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

                {/* Top 3 */}
                {rankings[2] && (
                    <div className='transform md:translate-y-4 w-full md:w-auto'>
                        <ArtistRankingCard
                            rank={3}
                            artist={{
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

            {/* Songs Table */}
            <div className='overflow-x-auto mt-4'>
                <table className='min-w-full text-white text-sm sm:text-base'>
                    <thead>
                        <tr className='text-left border-b border-gray-600 mb-2'>
                            <th className='py-2'>#</th>
                            <th>Bài hát</th>
                            <th>Tên Ca Sĩ</th>
                            <th>Lượt nghe</th>
                            <th className='text-right'>Thời lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr
                                key={index + 3}
                                className='border-b-[10px] border-transparent'
                            >
                                <td className='py-2'>{index + 4}</td>
                                <td className='flex items-center space-x-4'>
                                    <img
                                        src={song.song_image}
                                        alt={song.song_name}
                                        className='w-10 h-10 sm:w-12 sm:h-12 rounded-md'
                                    />
                                    <div>
                                        <p className='font-semibold'>
                                            {song.song_name}
                                        </p>
                                    </div>
                                    <CiHeart className='cursor-pointer hover:text-pink-600' />
                                </td>
                                <td>{song.provider}</td>
                                <td>{song.listen_count || 'N/A'}</td>
                                <td className='text-right'>
                                    {formatTime(song.time) || 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RankingBoard;
