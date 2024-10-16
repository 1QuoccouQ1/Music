import React from 'react';

function SettingsPage() {
  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">Cài đặt</h1>

      {/* Music Settings */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Chất lượng nhạc</h2>
        <div className="flex justify-between items-center mb-4">
          <span>Chất lượng nhạc</span>
          <select className="bg-gray-800 text-white p-2 rounded">
            <option>Thường (128kbps)</option>
            <option>Cao (320kbps)</option>
          </select>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span>Phát Nhạc</span>
          <div className="flex items-center space-x-2">
            <span>Luôn phát nhạc toàn màn hình</span>
            <input type="checkbox" className="form-checkbox text-pink-500" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span>Lựa chọn giao diện</span>
          <select className="bg-gray-800 text-white p-2 rounded">
            <option>Tối</option>
            <option>Sáng</option>
          </select>
        </div>
      </section>

      {/* Account Management */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quản lí tài khoản</h2>
        <p className="mb-4">
          Thêm một hoặc một số phương thức đăng nhập để đảm bảo bạn có thể truy cập vào tài khoản của mình bất cứ lúc nào.
        </p>

        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <span>Email và mật khẩu</span>
            <span className="text-green-500">Đang đăng nhập</span>
          </div>
          <div className="text-gray-400 mb-2">
            <p>Email: yourname@email.com</p>
            <p>Mật khẩu: Cập nhật</p>
            <p>Hôm nay, 20/09/2024 lúc 02:53:14</p>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span>Chrome</span>
            <span className="text-red-500">Đã đăng xuất</span>
          </div>
          <p className="text-gray-400">Hôm qua, 19/09/2024 lúc 06:12:04</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <div className="flex justify-between items-center mb-2">
            <span>Facebook</span>
            <span className="text-red-500">Đã đăng xuất</span>
          </div>
          <p className="text-gray-400">12/09/2024 lúc 12:11:04</p>
        </div>

        {/* Add other account methods */}
        <div className="flex items-center mt-4">
          <button className="bg-gray-700 text-white px-4 py-2 rounded">Thêm Apple</button>
        </div>
      </section>

      {/* Notification Settings */}
      <section>
        <h2 className="text-xl font-bold mb-4">Cài đặt thông báo</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Chương trình khuyến mãi</span>
            <select className="bg-gray-800 text-white p-2 rounded">
              <option>Mặc định</option>
              <option>Tắt</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span>Album và Single mới</span>
            <select className="bg-gray-800 text-white p-2 rounded">
              <option>Mặc định</option>
              <option>Tắt</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span>Cập nhật ứng dụng/Web</span>
            <select className="bg-gray-800 text-white p-2 rounded">
              <option>Mặc định</option>
              <option>Tắt</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span>SoundWave Wrapped</span>
            <select className="bg-gray-800 text-white p-2 rounded">
              <option>Mặc định</option>
              <option>Tắt</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
