import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../ContextAPI/UserContext";
import { Link, useLocation } from 'react-router-dom';

// Danh sách menu được định nghĩa ở đây
const menuItems = [
  {
    label: 'Trang Chủ',
    to: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: 'BXH Hàng Tuần',
    to: '/BXH',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
  {
    label: 'Top Nghệ Sĩ',
    to: '/Artist',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
      </svg>
    ),
  },
  {
    label: 'Thể Loại',
    to: '/Genre',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    label: 'Album',
    to: '/Albums',
    icon: <QueueMusicIcon />,
  },
  {
    label: 'Nhạc của Tôi',
    to: '/Information',
    icon: <PlaylistPlayIcon />,
    requireAuth: true,
  },
];

function Sidebar() {
  const { isSetting, isSidebar, setIsSidebar } = useContext(UserContext);
  const isLoggedIn = Boolean(localStorage.getItem('user')); // Kiểm tra đăng nhập
  const location = useLocation();
  const sidebarRef = useRef(null);
  const user = localStorage.getItem('user');

  // Đóng Sidebar khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSidebar]);

  if (isSetting) return null;

  return (
    <>
      <aside ref={sidebarRef} className={`max-w-64 bg-sidebar lg:px-6 px-1 lg:px-5 py-3 fixed top-0 left-0 h-full lg:w-56 z-40 ${isSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}>
        <div className="space-y-4 h-auto">
          <Link to="/" className="flex justify-center">
            <img src="../imgs/Music Brand and App Logo 1.png" alt="Logo" className='w-[92px] h-[70px] ' />
          </Link>
          <nav className="space-y-1 h-auto tracking-wide">
            <div className="flex flex-col justify-between h-auto">
              <div className="text-sm">
                {menuItems.map((item, index) => {
                  if (item.requireAuth && !isLoggedIn) return null;
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={index}
                      className={`flex items-center space-x-2 py-3 px-1 lg:px-3 hover:shadow-lg rounded-lg duration-300 cursor-pointer ${isActive ? 'text-red-600 font-semibold' : 'text-gray-400 hover:text-red-600'
                        }`}
                      to={item.to}
                    >
                      {item.icon}
                      <span className="">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
          {user ? "" : (
            <div className="block md:hidden items-center my-2">
              <Link to="/register">
                <div className="text-white py-2 px-7 mx-2 my-2 bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full  cursor-pointer">
                  Đăng Ký{" "}
                </div>
              </Link>
              <Link to="/login">
                <div className="text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full  cursor-pointer">
                  Đăng Nhập{" "}
                </div>
              </Link>
            </div>
          )}
        </div>
      </aside>
      
    </>
  );
}

export default Sidebar;
