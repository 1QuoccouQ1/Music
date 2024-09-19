import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-24">
   

      {/* Phần Thông tin người dùng */}
      <div className="flex items-center mb-12">
        <img className="w-80 h-80 bg-gray-700 rounded-full ml-11" src='https://i.pinimg.com/236x/e0/7f/11/e07f11615a10c95817bdda8e0d7c1e9e.jpg'></img>
        <div className="ml-6">
          <h2 className="text-5xl text-white font-semibold pb-4">Nguyễn Đỗ Thanh Nguyên</h2>
          <p className="text-gray-400">123 bài hát yêu thích</p>
        </div>
      </div>

      {/* Thanh điều hướng */}
      <div className="flex space-x-8 text-gray-400 border-b border-gray-700 pb-4 mb-8">
        <a href="#" className="text-white">Thư Viện</a>
        <a href="#">Bài hát tải lên</a>
        <a href="#">Bài hát tải lên</a>
        <a href="#">Danh sách phát</a>
        <a href="#">Album</a>
        <a href="#">Nghệ sĩ theo dõi</a>
      </div>

</div>

);
};

export default ProfilePage;
