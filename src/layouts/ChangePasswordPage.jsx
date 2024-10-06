import React from 'react';

function ChangePasswordPage() {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center py-10">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Đổi mật khẩu của bạn</h1>

        {/* Form */}
        <form>
          {/* Mật khẩu hiện tại */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Nhập mật khẩu hiện tại</label>
            <input
              type="password"
              className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>

          {/* Mật khẩu mới */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Nhập mật khẩu mới</label>
            <input
              type="password"
              className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          {/* Điều kiện mật khẩu */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2">Mật khẩu của bạn phải có ít nhất:</p>
            <ul className="text-gray-400 text-sm list-disc ml-6">
              <li>1 chữ cái (Không đáp ứng)</li>
              <li>1 chữ số hoặc ký tự đặc biệt (vd: # ? ! &)</li>
              <li>10 ký tự</li>
            </ul>
          </div>

          {/* Lặp lại mật khẩu mới */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Lặp lại mật khẩu mới</label>
            <input
              type="password"
              className="bg-gray-700 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
              placeholder="Lặp lại mật khẩu mới"
            />
          </div>

          {/* Nút */}
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full">
              Hủy
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-full">
              Cập nhật mật khẩu mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
