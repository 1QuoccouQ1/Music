import React, { useEffect, useState } from 'react';
import ArtistRankingCard from './ArtistRankingCard';

function RankingBoard() {
    const [rankings, setRankings] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await fetch('https://admin.soundwave.io.vn/api/bxh-100');
                const data = await response.json();

                // Get top 3 for ranking and rest for songs
                setRankings(data.slice(0, 3));
                const remainingSongs = data.slice(3);
                setSongs(remainingSongs);

                // Fetch listen counts for each song
                const listenCounts = await Promise.all(
                    remainingSongs.map(async (song) => {
                        const listenResponse = await fetch(`https://admin.soundwave.io.vn/api/luot-nghe/${song.id}`);
                        const listenData = await listenResponse.json();
                        return { id: song.id, listenCount: listenData.listen_count };
                    })
                );

                // Update each song’s listen count in state
                const songsWithListenCount = remainingSongs.map(song => ({
                    ...song,
                    listen_count: listenCounts.find(item => item.id === song.id)?.listenCount || 0,
                }));
                setSongs(songsWithListenCount);
            } catch (error) {
                console.error('Error fetching rankings or listen counts:', error);
            }
        };

        fetchRankings();
    }, []);

    return (
        <div className='bg-gray-900 min-h-screen py-10 px-4'>
            <h2 className='text-white text-xl md:text-4xl font-bold mb-20 border-l-4 border-l-blue-400 pl-5 hover:t-gradient-to-r from-pink-700 to-sky-400'>
                Bảng Xếp Hạng Tuần
            </h2>
            

            {/* Top 3 Ranking Cards */}
            <div className='flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-8 mb-12'>
                {/* Top 2 */}
                <div className='transform md:translate-y-4'>
                    <ArtistRankingCard
                        rank={2}
                        artist={{
                            name: rankings[1]?.singer_name,
                            imageUrl: rankings[1]?.song_image
                        }}
                        song={{
                            title: rankings[1]?.song_name,
                            artist: rankings[1]?.provider,
                            duration: '03:30',
                            coverImageUrl: rankings[1]?.song_image
                        }}
                    />
                </div>

                {/* Top 1 in the middle */}
                <div className='transform md:translate-y-0'>
                    <ArtistRankingCard
                        rank={1}
                        artist={{
                            name: rankings[0]?.singer_name,
                            imageUrl: rankings[0]?.song_image
                        }}
                        song={{
                            title: rankings[0]?.song_name,
                            artist: rankings[0]?.provider,
                            duration: '03:30',
                            coverImageUrl: rankings[0]?.song_image
                        }}
                    />
                </div>

                {/* Top 3 */}
                <div className='transform md:translate-y-4'>
                    <ArtistRankingCard
                        rank={3}
                        artist={{
                            name: rankings[2]?.singer_name,
                            imageUrl: rankings[2]?.song_image
                        }}
                        song={{
                            title: rankings[2]?.song_name,
                            artist: rankings[2]?.provider,
                            duration: '03:30',
                            coverImageUrl: rankings[2]?.song_image
                        }}
                    />
                </div>
            </div>

            {/* Songs Table */}
            <div className='overflow-x-auto mt-4 ml-4'>
                <table className='min-w-full text-white'>
                    <thead>
                        <tr className='text-left border-b border-gray-600 mb-2'>
                            <th className='py-2 font-normal'>#</th>
                            <th>Bài hát</th>
                            <th>Album</th>
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
                                <td className='flex items-center space-x-4 pt-2'>
                                    <img
                                        src={song.song_image}
                                        alt={song.song_name}
                                        className='w-12 h-12 rounded-md'
                                    />
                                    <div>
                                        <p className='font-semibold'>{song.song_name}</p>
                                        <p className='text-gray-400 text-sm'>{song.provider}</p>
                                    </div>
                                </td>
                                <td>{song.album || 'N/A'}</td>
                                <td>{song.listen_count}</td>
                                <td className='text-right'>{song.duration || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RankingBoard;
