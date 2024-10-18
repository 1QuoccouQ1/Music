import React, { useState } from 'react';

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validatePassword = () => {
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumberOrSpecialChar = /[0-9!@#$%^&*]/.test(newPassword);
    const isLengthValid = newPassword.length >= 10;

    if (!hasLetter || !hasNumberOrSpecialChar || !isLengthValid) {
      let message = 'Mật khẩu của bạn phải có ít nhất:\n';
      if (!hasLetter) message += '• 1 chữ cái (Không đáp ứng)\n';
      if (!hasNumberOrSpecialChar) message += '• 1 chữ số hoặc ký tự đặc biệt (vd: # ? ! &)\n';
      if (!isLengthValid) message += '• 10 ký tự (Không đáp ứng)\n';

      setValidationMessage(message);
      setIsValid(false);
    } else {
      setValidationMessage('Mật khẩu đáp ứng các yêu cầu.');
      setIsValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && newPassword === repeatPassword) {
      alert('Mật khẩu đã được cập nhật thành công!');
    } else if (newPassword !== repeatPassword) {
      alert('Mật khẩu mới và mật khẩu lặp lại không trùng khớp.');
    } else {
      alert('Vui lòng đảm bảo mật khẩu của bạn đáp ứng các điều kiện.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-full flex justify-center items-center py-5">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-[777px] pb-80">
        <h1 className="text-3xl font-semibold text-white mb-9 ">Đổi mật khẩu của bạn</h1>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Mật khẩu hiện tại */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-100 mb-2">Nhập mật khẩu hiện tại</label>
            <input
              type="password"
              className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
              placeholder="Nhập mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          {/* Mật khẩu mới */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100 mb-2">Nhập mật khẩu mới</label>
            <input
              type="password"
              className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePassword();
              }}
            />
          </div>

          {/* Điều kiện mật khẩu */}
          <div className="mb-5">
            <p className="text-gray-400 text-sm mb-2">Mật khẩu của bạn phải có ít nhất:</p>
            <ul className="text-gray-400 text-sm list-disc ml-6">
              <li>{/[a-zA-Z]/.test(newPassword) ? '✔' : '✘'} 1 chữ cái</li>
              <li>{/[0-9!@#$%^&*]/.test(newPassword) ? '✔' : '✘'} 1 chữ số hoặc ký tự đặc biệt (vd: # ? ! &)</li>
              <li>{newPassword.length >= 10 ? '✔' : '✘'} 10 ký tự</li>
            </ul>
            <p className="text-pink-600">{validationMessage}</p>
          </div>

          {/* Lặp lại mật khẩu mới */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100 mb-2">Lặp lại mật khẩu mới</label>
            <input
              type="password"
              className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
              placeholder="Lặp lại mật khẩu mới"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          {/* Nút */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full"
              onClick={() => {
                setCurrentPassword('');
                setNewPassword('');
                setRepeatPassword('');
                setValidationMessage('');
                setIsValid(false);
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-700 text-white py-2 px-4 rounded-full"
              disabled={!isValid}
            >
              Cập nhật mật khẩu mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
