import React, { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_URL } from '../../services/apiService';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [quality, setQuality] = useState('basic');
    const [isQualityOpen, setIsQualityOpen] = useState(false);
    const [data, setData] = useState({
        email: '',
        users_type: ''
    });

    // Khi người dùng thay đổi chất lượng nhạc
    const handleQualityChange = value => {
        setQuality(value);
        localStorage.setItem('isQuality', value); // Lưu vào Local Storage
        setIsQualityOpen(false);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                await fetch(API_URL + '/api/logout', {
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

        // Khôi phục chất lượng nhạc từ Local Storage
        const savedQuality = localStorage.getItem('isQuality');
        if (savedQuality) {
            setQuality(savedQuality);
        }
        fetchUserData();
    }, []);

    const { users_type } = data; // Retrieve user type from data

    return (
        <div className='min-h-screen bg-[#0f172a] flex flex-col items-center text-white py-10 px-5'>
            <div className='bg-[#0f172a] p-2 rounded-lg w-full max-w-[912px]'>
                <div className='mb-10'>
                    <h2 className='text-4xl font-bold mb-9 text-center md:text-left'>
                        Cài đặt
                    </h2>
                    <div className='space-y-5 text-sm'>
                        {/* Chất lượng nhạc */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative">
                        <label className="text-lg font-bold mb-2 md:mb-0">
                            Chất lượng nhạc
                        </label>
                        <div className="relative w-full md:w-64">
                            <div
                                onClick={() => setIsQualityOpen(!isQualityOpen)}
                                className="cursor-pointer bg-gray-800 px-4 py-2 rounded-lg flex justify-between items-center"
                            >
                                <span>
                                    {quality === 'basic' && ' 128kbps'}
                                    {quality === 'plus' && ' 320kbps'}
                                    {quality === 'premium' && 'LossLess'}
                                </span>
                                <span>&#x25BC;</span>
                            </div>
                            {isQualityOpen && (
                                <ul className="absolute left-0 mt-2 w-full bg-gray-900 rounded-lg shadow-lg z-20">
                                    <li
                                        onClick={() => handleQualityChange('basic')}
                                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                    >
                                            128kbps <span className="text-silver-500">Basic</span>
                                    </li>
                                    {['Plus', 'Premium'].includes(users_type) && (
                                        <li
                                            onClick={() => handleQualityChange('plus')}
                                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                        >
                                            320kbps <span className="text-yellow-500">PLUS</span>
                                        </li>
                                    )}
                                    {users_type === 'Premium' && (
                                        <li
                                            onClick={() => handleQualityChange('premium')}
                                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                        >
                                             LossLess <span className="text-red-500">PREMIUM</span>
                                        </li>
                                    )}
                                </ul>
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
        </div>
    );
};

export default SettingsPage;
