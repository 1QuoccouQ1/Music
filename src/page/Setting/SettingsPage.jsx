import React, { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [quality, setQuality] = useState('128kbps');
    const [isQualityOpen, setIsQualityOpen] = useState(false);
    const [data, setData] = useState({
        email: '',
        users_type: ''
    });

    const handleQualityChange = value => {
        setQuality(value);
        setIsQualityOpen(false);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                await fetch('https://admin.soundwave.io.vn/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    const parsedUser = JSON.parse(user);
                    setData({
                        email: parsedUser.email || '',
                        users_type: parsedUser.users_type || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const settings = [
        { name: 'Chương trình khuyến mãi' },
        { name: 'Album và Single mới' },
        { name: 'Cập nhật ứng dụng/Web' }
    ];
    const { users_type } = data;  // Retrieve user type from data

    return (
        <div className='min-h-screen bg-[#0f172a] flex flex-col items-center text-white py-10 px-5'>
            <div className='bg-[#0f172a] p-2 rounded-lg w-full max-w-[912px]'>
                <div className='mb-10'>
                    <h2 className='text-4xl font-bold mb-9 text-center md:text-left'>
                        Cài đặt
                    </h2>
                    <div className='space-y-5 text-sm'>
                        {/* Chất lượng nhạc */}
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 relative'>
                            <label className='text-lg font-bold mb-2 md:mb-0'>
                                Chất lượng nhạc
                            </label>
                            <div className='relative w-full md:w-64 text-left'>
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
                                            {/* Basic: Only 128kbps */}
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
                                            {/* Plus or Premium: Show 320kbps */}
                                            {(users_type === 'Plus' ||
                                                users_type === 'Premium') && (
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
                                            )}
                                            {/* Premium: Show Lossless */}
                                            {users_type === 'Premium' && (
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
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quản lý tài khoản */}
            <div className='w-full max-w-[912px] mb-8'>
                <h1 className='text-4xl font-bold mb-2 text-center md:text-left'>
                    Quản lí tài khoản
                </h1>
                <p className='text-gray-400 mb-4 text-center md:text-left'>
                    Thêm một hoặc một số phương thức đăng nhập để đảm bảo bạn có
                    thể truy cập vào tài khoản của mình bất cứ lúc nào.
                </p>
            </div>

            {/* Phương thức đăng nhập hiện tại */}
            <div className='w-full max-w-[912px] mb-10'>
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold text-gray-300 mb-2 md:mb-0'>
                        Đăng nhập hiện tại
                    </h2>
                    <a
                        onClick={handleLogout}
                        className='text-rose-800 text-sm hover:underline flex items-center'
                    >
                        <LogoutIcon className='mr-1' /> Đăng Xuất
                    </a>
                </div>

                {/* Grid Layout */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='bg-gray-800 rounded-lg p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out'>
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
                                <div>
                                    <p className='text-white text-sm'>Email:</p>
                                    <p className='text-[11px] flex justify-between items-center'>
                                        {data.email}
                                        <span className='cursor-pointer hover:underline'>
                                            <Link to='/ProfileEditPage'>
                                                Cập Nhật
                                            </Link>
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className='text-white'>Mật khẩu:</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[11px]'>********</p>
                                        <span className='text-[11px] cursor-pointer hover:underline'>
                                            <Link to='/ChangePasswordPage'>
                                                Cập Nhật
                                            </Link>
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

            
            <div className="bg-[#0f172a] p-10 flex flex-col items-center md:items-start">
                <h2 className="text-white text-3xl font-bold mb-8 text-center md:text-left">
                    Cài đặt thông báo
                </h2>
                <div className="space-y-6 w-full max-w-[912px]">
                    {settings.map((setting, index) => (
                        <div
                            key={index}
                            className="bg-[#1a1f2e] p-4 rounded-lg shadow-md"
                        >
                            <span className="text-lg font-medium text-white">{setting.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
