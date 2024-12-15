import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { API_URL } from '../../services/apiService';


function Information() {
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const [textFavorite, setTextFavorite] = useState('');

    const settext = (text) => {
        setTextFavorite(text);
    };

    useEffect(() => {
        
        if (user) {
            setUserName(user.name);
            setUserImage(user.image);
        }
    }, []);

    return (
        <div>
            <div className='bg-gray-900 min-h-screen p-2 md:p-8'>
                {/* User information section */}
                <div className='ml-0 md:ml-5'>
                    <div>
                        <div className='flex flex-col md:flex-row items-center mb-8'>
                            <img
                                className='h-32 w-32 md:h-[318px] md:w-[318px] rounded-full mx-auto md:mx-0'
                                src={userImage || 'https://i.pinimg.com/enabled/564x/95/08/31/950831f8f677e4aa2e8e3bddaed0d3cf.jpg'}
                                alt='User Avatar'
                            />
                            <div className='mt-4 md:mt-0 md:ml-6 text-center md:text-left'>
                                <h2 className='text-xl md:text-3xl text-white font-semibold mb-4'>
                                {userName}
                                </h2>
                                <p className='text-gray-400'>
                                    {textFavorite ? textFavorite : '0'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className='mb-4 border-b border-gray-500'>
                        <ul className='flex flex-wrap md:flex-nowrap flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-sm font-medium'>
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
                            {/* Other Links */}
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
                                            Albums đã thích
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
                                            Nghệ sĩ đã thích
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
                            {/* <li className='relative group'>
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
                            </li> */}
                        </ul>
                    </nav>
                </div>

                {/* Outlet for Nested Routes */}
                <Outlet context={{ settext }}/>
            </div>
        </div>
    );
}

export default Information;
