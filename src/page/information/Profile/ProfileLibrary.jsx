import React from 'react';
function ProfileLibrary() {
  return (
    <div>
         <div className="flex flex-col space-y-11 mb-8">
        <div className="flex justify-start  items-center">
          <FavoriteCard type="Nghệ sĩ yêu thích" icon="heart" />
          <FavoriteCard type="Bài hát yêu thích" icon="plus" />
        </div>

        <div className="flex justify-start space-x-4 items-center">
          <FavoriteCard type="Danh sách phát" icon="heart" />
          <FavoriteCard type="Album" icon="plus" />
        </div>

        {/* Phần nghệ sĩ theo dõi */}
        <div className="mb-8">
          <h3 className="text-xl text-white mb-4">Nghệ sĩ theo dõi</h3>
          <div className="flex space-x-4 items-center">
            <ArtistCircle name="Justin Bieber" />
            <ArtistCircle name="Billie Eilish" />
            <ArtistCircle name="Drake" />
            <ArtistCircle name="Taylor Swift" />
            <ArtistCircle name="Lana Del Rey" />
          </div>
        </div>
      </div>

      {/* Nút thêm theo dõi */}
      <div className="mt-8">
        <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full">Theo dõi thêm</button>
      </div>
    </div>
  );
}
export default ProfileLibrary;