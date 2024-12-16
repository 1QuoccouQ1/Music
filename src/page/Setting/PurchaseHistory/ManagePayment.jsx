import React, { useEffect, useState } from 'react';

function ManagePayment() {
    const [user, setUser] = useState(null);

    // Lấy thông tin người dùng từ localStorage
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user')); // Giả sử dữ liệu được lưu dưới dạng JSON
        setUser(userData);
    }, []);

    if (!user) {
        return <div>Loading...</div>; // Nếu chưa lấy được dữ liệu người dùng, hiển thị loading
    }

    const { users_type, expiry_date } = user;

    const getExpiryMessage = () => {
        if (expiry_date) {
            return `Gói ${
                users_type === 'Plus' ? 'SoundWave Plus' : 'SoundWave Premium'
            } của bạn sẽ hết hạn vào ngày ${new Date(
                expiry_date
            ).toLocaleDateString()}. Để tiếp tục sử dụng gói mà không bị gián đoạn vui lòng đăng ký trước hạn.`;
        } else {
            return 'Bạn chưa đăng ký gói nào. Hãy chọn một gói để bắt đầu!';
        }
    };

    return (
        <div className='bg-gray-900 min-h-screen flex justify-center  py-5 px-4'>
            <div className='overflow-x-auto max-w-full'>
                <div className='flex flex-col items-center gap-6 max-w-screen-lg'>
                    {/* Basic Subscription */}
                    {users_type === 'Basic' && (
                        <div className='rounded-xl overflow-hidden shadow-lg w-full max-w-[600px] lg:max-w-[720px] text-white border-gray-400'>
                            <div className='bg-gradient-to-r from-gray-400 to-gray-200 p-4 md:p-6 min-h-[160px] md:min-h-[180px] flex items-center'>
                                <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>
                                    SoundWave Basic
                                </h2>
                            </div>
                            <div className='bg-zinc-800 p-4 md:p-6 flex flex-col lg:flex-row justify-between gap-4 h-auto'>
                                <ul className='space-y-2 w-full lg:w-1/2'>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>Nghe nhạc có quảng cáo</span>
                                    </li>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>
                                            Không tải xuống để nghe offline
                                        </span>
                                    </li>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>Chất lượng âm thanh cơ bản</span>
                                    </li>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>Phát nhạc theo ngẫu nhiên</span>
                                    </li>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>
                                            Không sắp xếp danh sách phát
                                        </span>
                                    </li>
                                </ul>
                                <div className='flex flex-col justify-between w-full lg:w-1/2'>
                                    <div className='text-lg font-bold'>
                                        Miễn Phí
                                    </div>
                                    <button className='w-full md:w-[128px] px-2 py-2 text-sm font-semibold rounded-full bg-zinc-800 hover:bg-pink-600 transition-colors border border-[#FF0065]'>
                                        Đang sử dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Plus and Premium subscriptions */}
                    {(users_type === 'Plus' || users_type === 'Premium') && (
                        <div
                            className={`rounded-xl overflow-hidden shadow-lg w-full max-w-[600px] lg:max-w-[720px] text-white ${
                                users_type === 'Plus'
                                    ? 'border-yellow-400'
                                    : 'border-red-500'
                            }`}
                        >
                            <div
                                className={`bg-gradient-to-r ${
                                    users_type === 'Plus'
                                        ? 'from-[#FFA53B] to-[#F4C829]'
                                        : 'from-pink-500 to-red-500'
                                } p-4 md:p-6 min-h-[160px] md:min-h-[180px] flex items-center`}
                            >
                                <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>
                                    {users_type === 'Plus'
                                        ? 'SoundWave Plus'
                                        : 'SoundWave Premium'}
                                </h2>
                            </div>
                            <div className='bg-zinc-800 p-4 md:p-6 flex flex-col lg:flex-row justify-between gap-4 h-auto'>
                                <ul className='space-y-2 w-full lg:w-1/2'>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>Nghe nhạc không quảng cáo</span>
                                    </li>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>Tải xuống để nghe offline</span>
                                    </li>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>Chất lượng âm thanh cao</span>
                                    </li>
                                    <li className='flex items-start space-x-2'>
                                        <svg
                                            className='w-4 h-4 text-green-500 mt-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                        </svg>
                                        <span>Sắp xếp danh sách phát</span>
                                    </li>
                                </ul>
                                <div className='flex flex-col justify-between w-full lg:w-1/2'>
                                    <div className='bg-gray-700 text-gray-300 p-4 rounded-lg mb-4 text-sm'>
                                        {getExpiryMessage()}
                                    </div>
                                    <button className='w-full md:w-[128px] px-2 py-2 text-sm font-semibold rounded-full bg-zinc-800 hover:bg-pink-600 transition-colors border border-[#FF0065]'>
                                        Gia Hạn
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManagePayment;
