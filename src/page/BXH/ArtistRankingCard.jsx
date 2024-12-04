import React from 'react';
import { FaMedal } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ArtistRankingCard({ rank, artist, song }) {
    const rankClasses = {
        1: 'border-yellow-500', // Top 1 với màu vàng
        2: 'border-gray-400', // Top 2 với màu bạc
        3: 'border-orange-500' // Top 3 với màu cam
    };

    const rankIcons = {
        1: <FaMedal className='text-yellow-500 text-5xl' />,
        2: <FaMedal className='text-gray-400 text-5xl' />,
        3: <FaMedal className='text-orange-500 text-5xl' />
    };

    return (
        <div
            className={`relative border-t-4 ${
                rankClasses[rank]
            } rounded-lg p-4 bg-gray-800 w-full sm:w-[27.1875rem] ${
                rank === 2 || rank === 3 ? 'mt-8' : '' // Đẩy Top 2 và Top 3 xuống
            }`}
        >
            {/* Huy chương nằm ở góc phải bên dưới border */}
            <div className='absolute top-0 right-3'>{rankIcons[rank]}</div>

            <div className='relative flex flex-col items-center mb-3'>
                <div className='relative group'>
                    <img
                        className='w-14 h-14 sm:w-16 sm:h-16 rounded-full duration-150 transform group-hover:scale-125'
                        src={artist.imageUrl}
                        alt={artist.name}
                    />

                    {/* Nút Play chỉ hiện khi hover */}
                    <button className='absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-125'>
                        <svg
                            className='w-6 h-6 sm:w-8 sm:h-8'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M14.752 11.168l-3.197-2.132a1 1 0 00-1.555.832v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <Link to={`/ProfileArtist/${artist.id}`}>
                <h3 className='text-white mt-1 mb-3 text-center font-bold text-base sm:text-lg'>
                    {artist.name}
                </h3>
            </Link>

            <div className='flex items-center bg-gray-700 p-3 sm:p-4 rounded-lg border border-blue-500'>
                {/* Ảnh bài hát */}
                <img
                    src={song.coverImageUrl}
                    alt={song.title}
                    className='w-10 h-10 sm:w-12 sm:h-12 rounded-lg'
                />

                {/* Thông tin bài hát */}
                <div className='ml-3 sm:ml-4 flex-grow'>
                    <h3 className='text-white text-sm sm:text-base font-semibold'>
                        {song.title}
                    </h3>
                    <Link to={`/ProfileArtist/${artist.id}`} >
                        <p className='text-gray-400 text-xs sm:text-sm'>
                            {song.artist}
                        </p>
                    </Link>
                </div>

                {/* Thời lượng bài hát */}
                <span className='text-gray-400 text-xs sm:text-sm'>
                    {song.duration}
                </span>
            </div>
        </div>
    );
}

export default ArtistRankingCard;
