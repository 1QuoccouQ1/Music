import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function ManagerHistory() {
    return (
        <div className='bg-gray-900 min-h-screen p-8 flex flex-col items-center'>
            {/* Main container for navigation */}
            <div className='w-full max-w-[780px]'>
                <div className='flex items-center mb-8'>
                    <h1 className='text-4xl font-semibold text-white mb-1'>Quản Lý Đơn Hàng </h1>
                </div>

                {/* Navigation Links */}
                <nav className='mb-4'>
                    <ul className='flex space-x-8 text-sm font-medium'>
                        <li className='relative group'>
                            <NavLink
                                to='ManagePayment'
                                className={({ isActive }) =>
                                    `text-white pb-2 ${isActive ? 'active' : ''}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        Quản lí gói đăng ký
                                        <span
                                            className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                isActive ? 'scale-x-100' : 'scale-x-0'
                                            } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                        ></span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className='relative group'>
                            <NavLink
                                to='PurchaseHistoryPage'
                                className={({ isActive }) =>
                                    `text-gray-400 hover:text-white pb-2 ${isActive ? 'active' : ''}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        Lịch sử mua hàng
                                        <span
                                            className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                isActive ? 'scale-x-100' : 'scale-x-0'
                                            } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                        ></span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Centered main content */}
            <div className='flex-grow flex items-center justify-center w-full max-w-[777px]'>
                <Outlet />
            </div>
        </div>
    );
}

export default ManagerHistory;
