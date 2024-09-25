import React from 'react';


const ProfilePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
     
      {/* Phần Thông tin người dùng */}
      <div className="flex items-center mb-8">
        <div className="w-32 h-32 bg-gray-700 rounded-full"></div>
        <div className="ml-6">
          <h2 className="text-3xl text-white font-semibold">Nguyễn Đỗ Thanh Nguyên</h2>
          <p className="text-gray-400">123 bài hát yêu thích</p>
        </div>
      </div>

      {/* Thanh điều hướng */}
      <div className="flex space-x-8 text-gray-400 border-b border-gray-700 pb-2 mb-8">
        <a href="/ProfileLibrary" className="text-white">thư viện</a>
        <a href="#">Bài hát tải lên</a>
        <a href="#">Danh sách phát</a>
        <a href="#">Album</a>
        <a href="#">Nghệ sĩ theo dõi</a>
      </div>

      


   
    </div>
  );
};

export default ProfilePage;
