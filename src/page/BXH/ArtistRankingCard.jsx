import React from 'react';

function ArtistRankingCard({ rank, artist, song }) {
    const rankClasses = {
        1: 'border-yellow-500', // Top 1 với màu nổi bật
        2: 'border-silver-500',
        3: 'border-bronze-500'
    };

    return (
        <div
            className={`border-t-4 ${rankClasses[rank]} rounded-lg p-5 bg-gray-800 w-[27.1875rem] ${
                rank === 2 || rank === 3 ? 'mt-8' : ''  // Đẩy Top 2 và Top 3 xuống
            }`}
        >
            <div className='relative flex flex-col items-center mb-1'>
              
                 <div className="relative group">
                 <img
                    className='w-16 h-16 rounded-full duration-150 hover:scale-125'
                    src={artist.imageUrl}
                    alt={artist.name}
                />
                    {/* Nút Play chỉ hiện khi hover */}
                    <button className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-125">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.752 11.168l-3.197-2.132a1 1 0 00-1.555.832v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                        </svg>
                    </button>
                </div>
                
                {/* Thứ hạng nằm bên dưới hình ảnh */}
                <span
                    className={`absolute bottom-0 right-0 text-3xl font-bold items-center ${
                        rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-300' : 'text-orange-500'
                    }`}
                >
                    {rank}
                </span>
            </div>

            <h3 className='text-white mt-2 mb-4 text-center font-bold'>{artist.name}</h3>

            <div className='flex items-center bg-gray-700 p-4 rounded-lg border border-blue-500'>
                {/* Ảnh bài hát */}
                <img
                    src='https://i.pinimg.com/236x/b0/42/c9/b042c99331547fe95d4bf08b9217a28b.jpg'
                    alt={song.title}
                    className='w-12 h-12 rounded-lg'
                />

                {/* Thông tin bài hát */}
                <div className='ml-4 flex-grow'>
                    <h3 className='text-white text-sm font-semibold'>
                        {song.title}
                    </h3>
                    <p className='text-gray-400 text-xs'>{song.artist}</p>
                </div>

                {/* Thời lượng bài hát */}
                <span className='text-gray-400 text-sm'>{song.duration}</span>
            </div>
        </div>
    );
}

export default ArtistRankingCard;
