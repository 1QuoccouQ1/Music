import React, { useState } from 'react';
import ArtistRankingCard from './ArtistRankingCard';

function RankingBoard() {
<<<<<<< HEAD
    const [rankings, setRankings] = useState([
        {
            rank: 1,
            artist: {
                name: 'Trung Tự',
                imageUrl: 'https://via.placeholder.com/150'
            },
            song: { title: 'Vừa Hận Vừa Yêu', duration: '06:01' }
        },
        {
            rank: 2,
            artist: {
                name: 'Châu Khải Phong',
                imageUrl: 'https://via.placeholder.com/150'
            },
            song: { title: 'Nép Vào Nghe Anh Hát', duration: '06:01' }
        },
        {
            rank: 3,
            artist: {
                name: 'Kiều Chi',
                imageUrl: 'https://via.placeholder.com/150'
            },
            song: { title: 'Anh Thôi Nhân Nhượng', duration: '06:01' }
        }
    ]);
    const songs = [
      { 
          title: "Gió Tầng Nào Gặp Mây Tầng Đó", 
          artist: "Thành Đạt", 
          album: "Gió Tầng Nào Gặp Mây Tầng Đó (Single)", 
          duration: "05:01", 
          plays: "1 Ngày Trước", 
          cover: "https://i.pinimg.com/236x/1d/f1/43/1df143603c7a9f51f3e8348f0ede6277.jpg"
      },
      { 
          title: "Bài Hát 2", 
          artist: "RPT MCK", 
          album: "99%", 
          duration: "04:12", 
          plays: "2 Ngày Trước", 
          cover: "https://i.pinimg.com/236x/1d/f1/43/1df143603c7a9f51f3e8348f0ede6277.jpg"
      },
      
     
  ];

    return (
        <div className='bg-gray-900 min-h-screen py-10'>
            <h2 className='text-white ml-28 text-xl md:text-4xl font-bold mb-8 border-l-4 border-l-blue-400 pl-5 hover:t-gradient-to-r from-pink-700 to-sky-400'>
                Bảng Xếp Hạng Tuần
            </h2>

            {/* Nút chọn quốc gia */}
            <div className='flex justify-center space-x-4 mb-8'>
                <button className='bg-gray-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E] text-white px-4 py-3 rounded-lg basis-1/6 hover:basis-1/5 duration-150'>
                    Việt Nam
                </button>
                <button className='bg-gray-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E] text-white px-4 py-2 rounded-lg basis-1/6 hover:basis-1/5 duration-150'>
                    Âu Mỹ
                </button>
                <button className='bg-gray-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E] text-white px-4 py-2 rounded-lg basis-1/6 hover:basis-1/5 duration-150'>
                    Hàn Quốc
                </button>
                <button className='bg-gray-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E] text-white px-4 py-2 rounded-lg basis-1/6 hover:basis-1/5 duration-150'>
                    Hoa Kỳ
                </button>
            </div>

            {/* Hiển thị bảng xếp hạng */}
            <div className='flex justify-center items-start space-x-8'>
                {/* Top 2 */}
                <div className='transform translate-y-4'>
                    <ArtistRankingCard
                        rank={2}
                        artist={rankings[1].artist}
                        song={rankings[1].song}
                    />
                </div>

                {/* Top 1 (ở giữa và cao hơn) */}
                <div className='transform translate-y-0'>
                    <ArtistRankingCard
                        rank={1}
                        artist={rankings[0].artist}
                        song={rankings[0].song}
                    />
                </div>

                {/* Top 3 */}
                <div className='transform translate-y-4'>
                    <ArtistRankingCard
                        rank={3}
                        artist={rankings[2].artist}
                        song={rankings[2].song}
                    />
                </div>
            </div>
            <div className="px-6 mt-10 mr-8">
              {/* Danh sách bài hát */}
            <table className='min-w-full text-white mt-4 ml-6'>
                <thead>
                    <tr className='text-left border-b border-gray-600 '>
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
                            key={index}
                            className='border-b-[10px] border-transparent  '
                        >
                            <td className='py-2'>{index + 1}</td>
                            <td className='flex items-center space-x-4'>
                                <img
                                    src={song.cover}
                                    alt={song.title}
                                    className='w-12 h-12 rounded-md'
                                />
                                <div>
                                    <p className='font-semibold'>
                                        {song.title}
                                    </p>
                                    <p className='text-gray-400 text-sm'>
                                        {song.artist}
                                    </p>
                                </div>
                            </td>
                            <td>{song.album}</td>
                            <td>{song.plays}</td>
                            <td className='text-right'>{song.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>
    );
=======
  const [rankings, setRankings] = useState([
    {
      rank: 1,
      artist: { name: 'Trung Tự', imageUrl: 'https://via.placeholder.com/150' },
      song: { title: 'Vừa Hận Vừa Yêu', duration: '06:01' }
    },
    {
      rank: 2,
      artist: { name: 'Châu Khải Phong', imageUrl: 'https://via.placeholder.com/150' },
      song: { title: 'Nép Vào Nghe Anh Hát', duration: '06:01' }
    },
    {
      rank: 3,
      artist: { name: 'Kiều Chi', imageUrl: 'https://via.placeholder.com/150' },
      song: { title: 'Anh Thôi Nhân Nhượng', duration: '06:01' }
    },
  ]);

  return (
    <div className="bg-gray-900 min-h-screen py-10">
        
      <h2 className="text-white ml-28 text-xl md:text-4xl font-bold mb-8 border-l-4 border-l-blue-400 pl-5 hover:t-gradient-to-r from-pink-700 to-sky-400">
        Bảng Xếp Hạng Tuần
      </h2>
      
      {/* Nút chọn quốc gia */}
      <div className="flex justify-center space-x-4 mb-8">
        <button className="bg-gray-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E] text-white px-4 py-3 rounded-lg basis-1/6 hover:basis-1/5 duration-150">Việt Nam</button>
        <button className="bg-gray-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E] text-white px-4 py-2 rounded-lg basis-1/6 hover:basis-1/5 duration-150" >Âu Mỹ</button>
        <button className="bg-gray-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E] text-white px-4 py-2 rounded-lg basis-1/6 hover:basis-1/5 duration-150">Hàn Quốc</button>
        <button className="bg-gray-800 hover:bg-gradient-to-r from-[#FF0065] to-[#FF553E] text-white px-4 py-2 rounded-lg basis-1/6 hover:basis-1/5 duration-150">Hoa Kỳ</button>
      </div>

      {/* Hiển thị bảng xếp hạng */}
       <div className="flex justify-center items-start space-x-8">
        
       
        {/* Top 2 */}
        <div className="transform translate-y-4">
          <ArtistRankingCard rank={2} artist={rankings[1].artist} song={rankings[1].song} />
        </div>

        {/* Top 1 (ở giữa và cao hơn) */}
        <div className="transform translate-y-0">
          <ArtistRankingCard rank={1} artist={rankings[0].artist} song={rankings[0].song} />
        </div>

        {/* Top 3 */}
        <div className="transform translate-y-4">
          <ArtistRankingCard rank={3} artist={rankings[2].artist} song={rankings[2].song} />
        </div>
      </div>
      </div>
   
  );
>>>>>>> b73330a52f746d2b2391d61de35fa5a4b493b872
}

export default RankingBoard;
