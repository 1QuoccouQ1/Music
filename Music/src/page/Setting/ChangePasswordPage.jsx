import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validatePassword = () => {
        const hasLetter = /[a-zA-Z]/.test(newPassword);
        const hasNumberOrSpecialChar = /[0-9!@#$%^&*]/.test(newPassword);
        const isLengthValid = newPassword.length >= 10;

        if (!hasLetter || !hasNumberOrSpecialChar || !isLengthValid) {
            let message = 'Mật khẩu của bạn phải có ít nhất:\n';
            if (!hasLetter) message += '• 1 chữ cái (Không đáp ứng)\n';
            if (!hasNumberOrSpecialChar)
                message += '• 1 chữ số hoặc ký tự đặc biệt (vd: # ? ! &)\n';
            if (!isLengthValid) message += '• 10 ký tự (Không đáp ứng)\n';

            setValidationMessage(message);
            setIsValid(false);
        } else {
            setValidationMessage('Mật khẩu đáp ứng các yêu cầu.');
            setIsValid(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== repeatPassword) {
            toast.error('Mật khẩu mới và mật khẩu lặp lại không trùng khớp.');
            return;
        }

        if (!isValid) {
            toast.warning('Vui lòng đảm bảo mật khẩu của bạn đáp ứng các điều kiện.');
            return;
        }

        setIsSubmitting(true);

        const user = JSON.parse(localStorage.getItem('user'));
        const id = user ? user.id : null;

        try {
            const response = await fetch(
                `https://admin.soundwave.io.vn/api/${id}/newpass-member`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    body: JSON.stringify({
                        password: currentPassword,
                        new_password: newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success('Mật khẩu đã được cập nhật thành công!');
                // Reset form on success
                setCurrentPassword('');
                setNewPassword('');
                setRepeatPassword('');
                setValidationMessage('');
                setIsValid(false);
            } else {
                toast.error(data.message || 'Đã xảy ra lỗi khi cập nhật mật khẩu.');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-gray-900 min-h-screen flex justify-center px-4 sm:px-6 py-5'>
            {/* Toast Notification Container */}
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />

            <div className='bg-gray-900 p-6 sm:p-8 rounded-lg w-full max-w-[777px]'>
                <h1 className='text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-9'>
                    Đổi mật khẩu của bạn
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-100 mb-2'>
                            Nhập mật khẩu hiện tại
                        </label>
                        <input
                            type='password'
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            placeholder='Nhập mật khẩu hiện tại'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>

                    {/* New Password */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-100 mb-2'>
                            Nhập mật khẩu mới
                        </label>
                        <input
                            type='password'
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            placeholder='Nhập mật khẩu mới'
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                validatePassword();
                            }}
                        />
                    </div>

                    {/* Password Requirements */}
                    <div className='mb-5'>
                        <p className='text-gray-400 text-sm mb-2'>
                            Mật khẩu của bạn phải có ít nhất:
                        </p>
                        <ul className='text-gray-400 text-sm list-disc ml-6 space-y-1'>
                            <li>{/[a-zA-Z]/.test(newPassword) ? '✔' : '✘'} 1 chữ cái</li>
                            <li>
                                {/[0-9!@#$%^&*]/.test(newPassword) ? '✔' : '✘'} 1 chữ số hoặc ký tự đặc biệt (vd: # ? ! &)
                            </li>
                            <li>{newPassword.length >= 10 ? '✔' : '✘'} 10 ký tự</li>
                        </ul>
                        <p className='text-pink-600 mt-2'>{validationMessage}</p>
                    </div>

                    {/* Repeat New Password */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-100 mb-2'>
                            Lặp lại mật khẩu mới
                        </label>
                        <input
                            type='password'
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            placeholder='Lặp lại mật khẩu mới'
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4'>
                        <button
                            type='button'
                            className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full sm:w-auto'
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
                            type='submit'
                            className='bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-700 text-white py-2 px-4 rounded-full w-full sm:w-auto'
                            disabled={isSubmitting || !isValid}
                        >
                            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật mật khẩu mới'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPage;
