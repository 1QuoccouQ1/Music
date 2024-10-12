import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ReplayIcon from '@mui/icons-material/Replay';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import GroupsIcon from '@mui/icons-material/Groups';
import React from 'react';

function SettingSidebar() {
    return (
        <>
            <aside className='w-56 max-w-64 bg-sidebar px-6 py-3 h-full fixed '>
                <div className='space-y-4 h-auto'>
                    <a href='/' className='flex justify-center'>
                        <img src='../imgs/Music Brand and App Logo 1.png' alt='Music Brand Logo' />
                    </a>
                    <nav className='space-y-1 h-auto tracking-wide'>
                        <div className='flex flex-col justify-between h-auto'>
                            <div className='text-sm'>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    href='/ProfileEditPage'
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
                                    <span>Chỉnh sửa Hồ Sơ</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    href='/ChangePasswordPage'
                                >
                                    <LockPersonOutlinedIcon fontSize='small' />
                                    <span>Đổi Mật Khẩu</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    href='/PurchaseHistoryPage'
                                >
                                    <ReceiptLongOutlinedIcon fontSize='small' />
                                    <span>Lịch sử Mua Hàng</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    href='/Genre'
                                >
                                    <PrivacyTipOutlinedIcon fontSize='small' />
                                    <span>Quyền Riêng tư</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    href='/Genre'
                                >
                                    <SettingsIcon fontSize='small' />
                                    <span>Cài Đặt</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    href='/ContactForm'
                                >
                                    <HeadphonesIcon fontSize='small' />
                                    <span>Liên Hệ</span>
                                </a>
                                <a
                                    className='flex items-center space-x-2 text-gray-400 hover:text-red-600 py-3 px-3 hover:shadow-lg rounded-lg duration-300'
                                    href='/Genre'
                                >
                                    <GroupsIcon fontSize='small' />
                                    <span>Về Chúng Tôi</span>
                                </a>
                                <div className='text-red-600 border-red-600 border rounded-full py-1 cursor-pointer text-center mt-6 hover:opacity-90'>
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