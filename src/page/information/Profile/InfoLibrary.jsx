import React from 'react';
import { FaHeart, FaPlus } from 'react-icons/fa';

function InfoLibrary({ title, items }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button className="text-sm text-gray-400">Xem Tất Cả</button>
      </div>
      <div className="flex space-x-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-24 h-24 bg-pink-200 flex items-center justify-center rounded-lg"
          >
            {item.icon === 'heart' ? (
              <FaHeart className="text-3xl text-pink-500" />
            ) : (
              <FaPlus className="text-3xl text-pink-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const ArtistSection = ({ artists }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Nghệ Sĩ</h3>
        <button className="text-sm text-gray-400">Xem Tất Cả</button>
      </div>
      <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
        {artists.map((artist, index) => (
          <div key={index} className="w-[253.59] flex-shrink-0 text-center">
            <img
              src={artist.img}
              alt={artist.name}
              className="w-[253.59px] h-[253.59px] rounded-full object-cover"
            />
            <p className="text-sm text-white mt-9">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const LibraryPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      {/* Sections */}
      <InfoLibrary
        title="Nghe Gần Đây"
        items={[{ icon: 'heart' }, { icon: 'plus' }]}
      />
      <InfoLibrary
        title="Bài Hát Đã Thích"
        items={[{ icon: 'heart' }, { icon: 'plus' }]}
      />
      <InfoLibrary
        title="Danh Sách Phát"
        items={[{ icon: 'heart' }, { icon: 'plus' }]}
      />
      <InfoLibrary
        title="Albums"
        items={[{ icon: 'heart' }, { icon: 'plus' }]}
      />

      {/* Artist Section */}
      <ArtistSection
        artists={[
          { name: 'Nghệ Sĩ 1', img: 'https://i.pinimg.com/enabled/564x/12/fb/46/12fb46e27d649b3eab28bfa2777595f4.jpg' },
          { name: 'Nghệ Sĩ 2', img: 'https://i.pinimg.com/enabled/564x/12/fb/46/12fb46e27d649b3eab28bfa2777595f4.jpg' },
          { name: 'Nghệ Sĩ 3', img: 'https://i.pinimg.com/enabled/564x/12/fb/46/12fb46e27d649b3eab28bfa2777595f4.jpg' },
          { name: 'Nghệ Sĩ 4', img: 'https://i.pinimg.com/enabled/564x/12/fb/46/12fb46e27d649b3eab28bfa2777595f4.jpg' },
        ]}
      />
    </div>
  );
}

export default LibraryPage;
