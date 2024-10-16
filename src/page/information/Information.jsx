import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Information() {
    return (
        <div>
            <div className='bg-gray-900 min-h-screen p-8'>
                {/* User information section */}
                <div className='ml-5'>
                    <div>
                        <div className='flex items-center mb-8'>
                            <img
                                className=' h-[318px] rounded-full'
                                src='https://i.pinimg.com/enabled/564x/95/08/31/950831f8f677e4aa2e8e3bddaed0d3cf.jpg'
                            ></img>
                            <div className='ml-6'>
                                <h2 className='text-3xl text-white font-semibold mb-6'>
                                    Nguyễn Đỗ Thanh Nguyên
                                </h2>
                                <p className='text-gray-400'>
                                    123 bài hát yêu thích
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className='mb-4 border-b border-gray-500'>
                        <ul className='flex space-x-8 text-sm font-medium'>
                            <li className='relative group'>
                                <NavLink
                                    to='InfoLibrary'
                                    className={({ isActive }) =>
                                        `text-white pb-2 ${
                                            isActive ? 'active' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            Thư Viện
                                            {/* Pink underline */}
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                    isActive
                                                        ? 'scale-x-100'
                                                        : 'scale-x-0'
                                                } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li className='relative group'>
                                <NavLink
                                    to='ListenedMusic'
                                    className={({ isActive }) =>
                                        `text-gray-400 hover:text-white pb-2 ${
                                            isActive ? 'active' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            Bài Hát Đã Thích
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                    isActive
                                                        ? 'scale-x-100'
                                                        : 'scale-x-0'
                                                } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li className='relative group'>
                                <NavLink
                                    to='PlayLists'
                                    className={({ isActive }) =>
                                        `text-gray-400 hover:text-white pb-2 ${
                                            isActive ? 'active' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            Danh Sách Phát
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                    isActive
                                                        ? 'scale-x-100'
                                                        : 'scale-x-0'
                                                } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li className='relative group'>
                                <NavLink
                                    to='InfoAlbums'
                                    className={({ isActive }) =>
                                        `text-gray-400 hover:text-white pb-2 ${
                                            isActive ? 'active' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            Albums
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                    isActive
                                                        ? 'scale-x-100'
                                                        : 'scale-x-0'
                                                } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li className='relative group'>
                                <NavLink
                                    to='Artist'
                                    className={({ isActive }) =>
                                        `text-gray-400 hover:text-white pb-2 ${
                                            isActive ? 'active' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            Nghệ sĩ 
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                    isActive
                                                        ? 'scale-x-100'
                                                        : 'scale-x-0'
                                                } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li className='relative group'>
                                <NavLink
                                    to='Downloaded'
                                    className={({ isActive }) =>
                                        `text-gray-400 hover:text-white pb-2 ${
                                            isActive ? 'active' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            Đã Tải Xuống
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                    isActive
                                                        ? 'scale-x-100'
                                                        : 'scale-x-0'
                                                } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li className='relative group'>
                                <NavLink
                                    to='Followed'
                                    className={({ isActive }) =>
                                        `text-gray-400 hover:text-white pb-2 ${
                                            isActive ? 'active' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            Đã Theo Dõi
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-[0.4px] bg-pink-500 ${
                                                    isActive
                                                        ? 'scale-x-100'
                                                        : 'scale-x-0'
                                                } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                           
                        </ul>
                    </nav>
                </div>

                {/* Outlet for Nested Routes */}
                <Outlet />
            </div>
        </div>
    );
}

export default Information;
