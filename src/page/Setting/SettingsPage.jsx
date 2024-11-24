
import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const SettingsPage = () => {

    const [quality, setQuality] = useState('128kbps');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isQualityOpen, setIsQualityOpen] = useState(false);
    const [isInterfaceOpen, setIsInterfaceOpen] = useState(false);
    const [interfaceOption, setInterfaceOption] = useState('Tối');

    const handleQualityChange = value => {
        setQuality(value);
        setIsQualityOpen(false);
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleInterfaceOptionChange = option => {
        setInterfaceOption(option);
        setIsInterfaceOpen(false);
    };

    const settings = [
        { name: 'Chương trình khuyến mãi' },
        { name: 'Album và Single mới' },
        { name: 'Cập nhật ứng dụng/Web' },
    ];

    return (
        <div className='min-h-screen bg-[#0f172a] flex flex-col items-center text-white py-10 px-5'>
            <div className='bg-[#0f172a] p-2 rounded-lg w-full max-w-[912px]'>
                <div className='mb-10'>
                    <h2 className='text-4xl font-bold mb-9'>Cài đặt</h2>
                    <div className='space-y-5 text-sm'>
                        {/* Chất lượng nhạc */}
                        <div className='flex items-center justify-between mb-6 relative'>
                            <label className='text-lg font-bold'>
                                Chất lượng nhạc
                            </label>
                            <div className='relative w-64 text-left'>
                                <div
                                    onClick={() =>
                                        setIsQualityOpen(!isQualityOpen)
                                    }
                                    className='cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg flex justify-between items-center'
                                >
                                    <span>
                                        {quality === '128kbps' &&
                                            'Thường (128kbps)'}
                                        {quality === '320kbps' &&
                                            'Cao (320kbps)'}
                                        {quality === 'lossless' && 'Lossless'}
                                    </span>
                                    <span className='ml-2'>&#x25BC;</span>
                                </div>
                                {isQualityOpen && (
                                    <div className='absolute left-0 mt-2 w-full bg-gray-900 text-white rounded-lg shadow-lg z-20'>
                                        <ul className='py-2'>
                                            <li
                                                onClick={() =>
                                                    handleQualityChange(
                                                        '128kbps'
                                                    )
                                                }
                                                className='flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer'
                                            >
                                                <span>Thường (128kbps)</span>
                                                {quality === '128kbps' && (
                                                    <span className='ml-2 w-2 h-2 bg-pink-500 rounded-full'></span>
                                                )}
                                            </li>
                                            <li
                                                onClick={() =>
                                                    handleQualityChange(
                                                        '320kbps'
                                                    )
                                                }
                                                className='flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer'
                                            >
                                                <span>
                                                    Cao (320kbps){' '}
                                                    <span className='text-yellow-500'>
                                                        PLUS
                                                    </span>
                                                </span>
                                                {quality === '320kbps' && (
                                                    <span className='ml-2 w-2 h-2 bg-pink-500 rounded-full'></span>
                                                )}
                                            </li>
                                            <li
                                                onClick={() =>
                                                    handleQualityChange(
                                                        'lossless'
                                                    )
                                                }
                                                className='flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer'
                                            >
                                                <span>
                                                    Lossless{' '}
                                                    <span className='text-red-500'>
                                                        PREMIUM
                                                    </span>
                                                </span>
                                                {quality === 'lossless' && (
                                                    <span className='ml-2 w-2 h-2 bg-pink-500 rounded-full'></span>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full max-w-[912px] mb-8'>
                <h1 className='text-4xl font-bold mb-2'>Quản lí tài khoản</h1>
                <p className='text-gray-400 mb-4'>
                    Thêm một hoặc một số phương thức đăng nhập để đảm bảo bạn có
                    thể truy cập vào tài khoản của mình bất cứ lúc nào.
                </p>
            </div>

            {/* Phương thức đăng nhập hiện tại */}
            <div className='w-full max-w-[912px] mb-10'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold text-gray-300'>
                        Đăng nhập hiện tại
                    </h2>
                    <a
                        href='#'
                        className='text-pink-500 text-sm hover:underline'
                    >
                        <LogoutIcon /> Chọn tài khoản để đăng xuất
                    </a>
                </div>

                {/* Grid Layout */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Email và mật khẩu */}
                    <div className='bg-gray-800 rounded-lg p-2 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out'>
                        <div>
                            <div className='flex items-center justify-between mb-4 pb-2 border-b-2 border-[#7C8EA5]'>
                                <div className='text-sm font-semibold flex items-center space-x-3'>
                                    <EmailIcon
                                        className='text-gray-400'
                                        fontSize='medium'
                                    />
                                    <span>Email và mật khẩu</span>
                                </div>
                                <span className='text-green-400 font-semibold text-sm'>
                                    Đang đăng nhập
                                </span>
                            </div>
                            <div className='text-sm text-gray-400 space-y-2'>
                                {/* Phần Email */}
                                <div>
                                    <p className='text-white text-sm'>Email:</p>
                                    <p className='text-[11px] flex justify-between items-center'>
                                        nguyendct68@gmail.com
                                        <span className='cursor-pointer hover:underline'>
                                            Cập nhật
                                        </span>
                                    </p>
                                </div>
                                {/* Phần Mật khẩu */}
                                <div>
                                    <p className='text-white'>Mật khẩu:</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[11px]'>********</p>
                                        <span className='text-[11px] cursor-pointer hover:underline'>
                                            Cập nhật
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='text-sm text-white mt-4'>
                            <CalendarMonthIcon fontSize='medium' /> Hôm nay,
                            20/09/2024 lúc 02:53:14
                        </p>
                    </div>
                </div>
            </div>

            

            <div className='bg-[#0f172a]  p-10 flex flex-col items-start'>
                {/* Title */}
                <h2 className='text-white text-3xl font-bold mb-8'>
                    Cài đặt thông báo
                </h2>

                {/* Settings List */}
                <div className='space-y-6 w-[910px]'>
                    {settings.map((setting, index) => (
                        <div
                            key={index}
                            className='flex justify-between items-center w-full text-white'
                        >
                            {/* Setting Name */}
                            <span className='text-lg'>{setting.name}</span>

                            {/* Dropdown Button and Indicator */}
                            <div className='flex items-center space-x-2'>
                                {/* Dropdown Button */}
                                <button className='bg-[#1a1f2e] text-white text-sm font-medium px-4 py-2 rounded-md flex items-center justify-between w-32 shadow-md'>
                                    Mặc định
                                    <svg
                                        className='w-4 h-4 ml-2'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </button>

                                {/* Indicator Dot */}
                                <span className='w-3 h-3 bg-pink-500 rounded-full'></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
