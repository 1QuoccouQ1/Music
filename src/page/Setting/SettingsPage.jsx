import React, {useState} from 'react';

const SettingsPage = () => {
    const [quality, setQuality] = useState('128kbps');
    const [isOpen, setIsOpen] = useState(false);
  
    const handleQualityChange = (value) => {
      setQuality(value);
      setIsOpen(false); // Close dropdown after selection
    }; 
    return (
        <div className='min-h-screen bg-gray-900 flex justify-center text-white py-10 px-5'>
            <div className='bg-gray-900 p-8 rounded-lg w-full max-w-[912px] '>
                {/* Cài đặt */}
                <div className='mb-10'>
                    <h2 className='text-3xl font-bold mb-9'>Cài đặt</h2>

                    <div className='space-y-5 text-sm'>
                        {/* Chất lượng nhạc */}
                        <div className='mb-6'>
                            <label className='block text-lg font-bold mb-2'>
                                Chất lượng nhạc
                            </label>
                            <div className='relative  w-64 text-left'>
                        {/* Dropdown Button */}
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className='cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg flex justify-between items-center'
                        >
                            <span>
                                {quality === '128kbps' && 'Thường (128kbps)'}
                                {quality === '320kbps' && 'Cao (320kbps)'}
                                {quality === 'lossless' && 'Lossless'}
                            </span>
                            <span className='ml-2'>&#x25BC;</span>{' '}
                            {/* Down arrow */}
                        </div>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className='absolute left-0 mt-2 w-full bg-gray-900 text-white rounded-lg shadow-lg'>
                                <ul className='py-2'>
                                    <li
                                        onClick={() =>
                                            handleQualityChange('128kbps')
                                        }
                                        className='flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer'
                                    >
                                        <span>Thường (128kbps)</span>
                                        <span className='ml-2 w-3 h-3 rounded-full border-2 border-pink-500 flex items-center justify-center'>
                                            {quality === '128kbps' && (
                                                <span className='w-2 h-2 bg-pink-500 rounded-full'></span>
                                            )}
                                        </span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleQualityChange('320kbps')
                                        }
                                        className='flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer'
                                    >
                                        <span>
                                            Cao (320kbps){' '}
                                            <span className='text-yellow-500'>
                                                PLUS
                                            </span>
                                        </span>
                                        <span className='ml-2 w-3 h-3 rounded-full border-2 border-pink-500 flex items-center justify-center'>
                                            {quality === '320kbps' && (
                                                <span className='w-2 h-2 bg-pink-500 rounded-full'></span>
                                            )}
                                        </span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleQualityChange('lossless')
                                        }
                                        className='flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer'
                                    >
                                        <span>
                                            Lossless{' '}
                                            <span className='text-red-500'>
                                                PREMIUM
                                            </span>
                                        </span>
                                        <span className='ml-2 w-3 h-3 rounded-full border-2 border-pink-500 flex items-center justify-center'>
                                            {quality === 'lossless' && (
                                                <span className='w-2 h-2 bg-pink-500 rounded-full'></span>
                                            )}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                        </div>
                        {/* Phát nhạc */}
                        <div className='flex items-center justify-between'>
                            <span>Phát nhạc</span>
                            <div className='flex items-center'>
                                <span>Luôn phát nhạc toàn màn hình</span>
                                <span className='ml-2 w-3 h-3 bg-pink-500 rounded-full'></span>
                            </div>
                        </div>

                        {/* Lựa chọn giao diện */}
                        <div className='flex items-center justify-between'>
                            <span>Lựa chọn giao diện</span>
                            <div className='flex items-center'>
                                <span>Tối</span>
                                <span className='ml-2 w-3 h-3 bg-gray-700 rounded-full'></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quản lí tài khoản */}
                <div>
                    <h2 className='text-3xl font-bold mb-6'>
                        Quản lí tài khoản
                    </h2>
                    <p className='text-gray-400 mb-4'>
                        Thêm một hoặc một số phương thức đăng nhập để đảm bảo
                        bạn có thể truy cập vào tài khoản của mình bất cứ lúc
                        nào.
                    </p>

                    {/* Phương thức đăng nhập hiện tại */}
                    <div className='space-y-6'>
                        <div className='bg-gray-800 p-4 rounded-lg'>
                            <h3 className='text-lg font-semibold mb-2'>
                                Phương thức đăng nhập hiện tại
                            </h3>

                            {/* Email và mật khẩu */}
                            <div className='bg-gray-700 p-3 rounded-lg mb-4'>
                                <div className='flex justify-between items-center mb-2'>
                                    <span>Email và mật khẩu</span>
                                    <span className='text-green-500'>
                                        Đang đăng nhập
                                    </span>
                                </div>
                                <p className='text-gray-400'>
                                    nguyenvand88@gmail.com
                                </p>
                                <p className='text-gray-400'>
                                    Hôm nay, 20/09/2024 lúc 02:53:14
                                </p>
                            </div>

                            {/* Chrome */}
                            <div className='flex justify-between items-center bg-gray-700 p-3 rounded-lg mb-2'>
                                <div>
                                    <span className='font-semibold'>
                                        Chrome
                                    </span>
                                    <p className='text-gray-400'>
                                        Hôm qua, 19/09/2024 lúc 08:12:04
                                    </p>
                                </div>
                                <button className='text-red-500'>
                                    Đã đăng xuất
                                </button>
                            </div>

                            {/* Facebook */}
                            <div className='flex justify-between items-center bg-gray-700 p-3 rounded-lg'>
                                <div>
                                    <span className='font-semibold'>
                                        Facebook
                                    </span>
                                    <p className='text-gray-400'>
                                        12/09/2024 lúc 12:11:04
                                    </p>
                                </div>
                                <button className='text-red-500'>
                                    Đã đăng xuất
                                </button>
                            </div>
                        </div>

                        {/* Phương thức đăng nhập có sẵn */}
                        <div className='bg-gray-800 p-4 rounded-lg'>
                            <h3 className='text-lg font-semibold mb-2'>
                                Phương thức đăng nhập có sẵn
                            </h3>
                            <button className='bg-gray-700 p-3 rounded-lg w-full text-left'>
                                Apple
                            </button>
                        </div>
                    </div>

                    {/* Chọn tài khoản để đăng xuất */}
                    <div className='mt-10'>
                        <button className='text-pink-500 hover:underline'>
                            Chọn tài khoản để đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
