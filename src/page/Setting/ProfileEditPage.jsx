import React from 'react';

const ProfileEditPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center py-10">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Chỉnh Sửa Hồ Sơ</h1>

        {/* Form */}
        <form>
          {/* Tên người dùng */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Tên người dùng</label>
            <input
              type="text"
              className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
              value="Nguyễn Đỗ Thanh Nguyên"
              disabled
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
              value="nguyenndt68@gmail.com"
            />
          </div>

          {/* Giới tính */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Giới tính</label>
            <select className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full">
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-400 mb-2">Ngày sinh</label>
              <select className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full">
                <option value="25">25</option>
                {/* Các option khác */}
              </select>
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-400 mb-2">Tháng</label>
              <select className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full">
                <option value="7">Tháng 7</option>
                {/* Các option khác */}
              </select>
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-400 mb-2">Năm</label>
              <select className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full">
                <option value="2004">2004</option>
                {/* Các option khác */}
              </select>
            </div>
          </div>

          {/* Quốc gia và Khu Vực */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Quốc gia và Khu Vực</label>
            <select className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full">
              <option value="Vietnam">Việt Nam</option>
              {/* Các option khác */}
            </select>
          </div>

          {/* Checkbox */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-pink-600 rounded bg-gray-700 border-pink-600"
              />
              <span className="ml-2 text-gray-400 text-sm">
                Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung SoundWave cho mục đích tiếp thị.
              </span>
            </label>
          </div>

          {/* Nút lưu */}
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full">
              Hủy
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-full">
              Lưu hồ sơ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
