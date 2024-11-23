import InputSearch from "./InputSearch";
import  { useState ,useRef ,useEffect } from "react";
import {
  ChevronRight,
  CloudDownload,
  LockKeyhole,
  Settings,
  Headset,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router-dom';
''
function Nav() {
  const navigate = useNavigate();
  // const { user ,isProfile } = useContext(UserContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) 
  const isProfile = user ? true : false;
  // console.log(user);
  const profileRef = useRef(null);


    // Hàm xử lý logout
    const handleLogout = async () => {

      try {
        // Gửi yêu cầu logout tới API
        await fetch('https://admin.soundwave.io.vn/api/logout', { 
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }); 
  
        // Xóa user khỏi localStorage và cập nhật context
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
  
        // Chuyển hướng tới trang /login
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setIsProfileOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
  return (
    <>
      <div className="flex justify-between  w-auto h-auto flex-shrink py-4   h-[90px] px-10    bg-medium  text-zinc-700 flex items-center justify-center z-10">
        <InputSearch></InputSearch>
        <div className=" flex  text-left items-center">
          {isProfile ? (
            <>
              <Link to='/Upgrade' className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-85 text-white text-sm rounded-full px-4 py-2 transition duration-300 mr-10">
                Trải nghiệm Premium
              </Link>
              <button className="relative size-9 flex items-center justify-center bg-gray-800 rounded-full transition duration-300 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="red"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </button>
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2  rounded-full p-1 transition duration-300"
                >
                  <img
                    src={user.image}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transform transition-transform duration-300 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isProfileOpen && (
                  <div className="absolute z-10 right-0 mt-2 w-[400px]  bg-gray-800 rounded-xl shadow-2xl ">
                    <div className="flex flex-col w-full max-w-md mx-auto bg-gray-900 text-white rounded-xl">
                      <div onClick={() => {
                        navigate('/ProfileEditPage')
                      }} className="flex items-center p-4 border-b border-gray-800">
                        <div className="w-12 h-12 mr-4 ">
                          <img
                            className="rounded-full"
                            src={user.image}
                            alt="Profile"
                          />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-base font-semibold">
                             {user.name}
                          </h2>
                          <p className="text-xs bg-gray-400 py-1 px-2 mt-2 text-white font-medium  w-fit rounded-full">
                            SoundWave Basic
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <nav className="flex flex-col">
                      {[
                        { icon: Sparkles, href: "/Upgrade", label: "Nâng cấp tài khoản" },
                        { icon: CloudDownload, href: "https://example.com", label: "Nhạc đã tải xuống" }, // Ví dụ link ngoại vi
                        { icon: LockKeyhole, href: "Privacy", label: "Quyền riêng tư" },
                        { icon: Settings, href: "SettingsPage", label: "Cài đặt" },
                        { icon: Headset, href: "ContactForm", label: "Liên hệ" },
                      ].map((item, index) => (
                        <button
                          key={index}
                          className="flex items-center p-4 hover:bg-gray-800 transition-colors last:rounded-b-xl"
                        >
                          <item.icon
                            className={`w-5 h-5 mr-4 ${
                              index === 0 ? "text-yellow-500" : "text-gray-400"
                            }`}
                          />
                          <span className="flex-grow text-left text-sm">
                            {/* Kiểm tra href có phải là đường dẫn nội bộ */}
                            {item.href && item.href.startsWith('/') ? (
                              <Link to={item.href}>{item.label}</Link> // Dùng Link cho đường dẫn nội bộ
                            ) : (
                              <a href={item.href} >{item.label}</a> // Dùng thẻ a cho liên kết ngoại vi
                            )}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      ))}
                        <button onClick={handleLogout} className="flex items-center p-4 hover:bg-gray-800 transition-colors last:rounded-b-xl">
                          <LogOut className="w-5 h-5 mr-4 text-red-500" />
                          <span className="flex-grow text-left text-sm">Đăng xuất</span>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <a href="/register">
                <div className="text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full  cursor-pointer">
                  Đăng Ký{" "}
                </div>
              </a>
              <a href="/login">
                <div className="text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full  cursor-pointer">
                  Đăng Nhập{" "}
                </div>
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
