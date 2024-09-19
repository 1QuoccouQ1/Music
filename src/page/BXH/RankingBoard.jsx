import React, { useState } from 'react';
import ArtistRankingCard from './ArtistRankingCard';

function RankingBoard() {
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
}

export default RankingBoard;
