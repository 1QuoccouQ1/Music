import { useEffect, useRef } from 'react';
import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import GroupsIcon from '@mui/icons-material/Groups';
import { API_URL } from '../services/apiService';
import { LogOut } from 'lucide-react';

function SettingSidebar() {
    const navigate = useNavigate();
    const { isSetting ,isSidebar, setIsSidebar } = useContext(UserContext);
    const sidebarSettingRef = useRef(null);

    const handleLogout = async () => {
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });



            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('isAccountType');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Đóng Sidebar khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarSettingRef.current && !sidebarSettingRef.current.contains(event.target)) {
        setIsSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSidebar]);

    if (!isSetting) return null;

    return (
        <>

            {/* Nút mở sidebar trên mobile */}
           

            {/* Sidebar */}
            <aside
            ref={sidebarSettingRef}
                className={`fixed top-0 left-0 h-full bg-sidebar px-6 py-3 z-40 transition-transform duration-300   ${isSidebar ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:w-56`}
            >

                <div className='space-y-4 h-auto'>
                    <Link to='/' className='flex justify-center'>
                        <img src='../imgs/Music Brand and App Logo 1.png' alt='Music Brand Logo'  className='size-5 lg:size-auto'/>
                    </Link>
                    <nav className='space-y-1 h-auto tracking-wide'>
                        <div className='flex flex-col justify-between h-auto'>
                            <div className='text-sm'>
                                <Link
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    to='/ProfileEditPage'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='size-5'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                        />
                                    </svg>
                                    <span className="hidden lg:inline">Chỉnh sửa Hồ Sơ</span>
                                </Link>
                                <Link
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    to='/ChangePasswordPage'
                                >
                                    <LockPersonOutlinedIcon fontSize='small' />
                                    <span className="hidden lg:inline">Đổi Mật Khẩu</span>
                                </Link>
                                <Link
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    to='/ManagerHistory'
                                >
                                    <ReceiptLongOutlinedIcon fontSize='small' />
                                    <span className="hidden lg:inline">Lịch sử Mua Hàng</span>
                                </Link>
                                <Link
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    to='/Privacy'
                                >
                                    <PrivacyTipOutlinedIcon fontSize='small' />
                                    <span className="hidden lg:inline">Quyền Riêng tư</span>
                                </Link>
                                <Link
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    to='/SettingsPage'
                                >
                                    <SettingsIcon fontSize='small' />
                                    <span className="hidden lg:inline">Cài Đặt</span>
                                </Link>
                                <Link
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    to='/ContactForm'
                                >
                                    <HeadphonesIcon fontSize='small' />
                                    <span className="hidden lg:inline">Liên Hệ</span>
                                </Link>
                                <Link
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    to='/AboutUs'
                                >
                                    <GroupsIcon fontSize='small' />
                                    <span className="hidden lg:inline">Về Chúng Tôi</span>
                                </Link>
                                <Link
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300 lg:hidden block'
                                    onClick={handleLogout}
                                >
                                    <LogOut fontSize='small' />
                                </Link>
                                <div onClick={handleLogout} className='text-red-600 border-red-600 border rounded-full py-1 cursor-pointer text-center mt-6 hover:opacity-90 hidden lg:inline'>
                                    Đăng Xuất
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default SettingSidebar;
