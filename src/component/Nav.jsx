import InputSearch from "./InputSearch";
import { useState, useRef, useEffect, useContext } from "react";
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
import { Link } from "react-router-dom";
import { API_URL } from "../services/apiService";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from "../ContextAPI/UserContext";

function Nav() {
  const navigate = useNavigate();
  const { isSidebar, setIsSidebar } = useContext(UserContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const isProfile = user ? true : false;
  const profileRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [singers, setSingers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const fetchSearchResults = async (query) => {
    if (!query) {
      setSongs([]);
      setSingers([]);
      return;
    }

    const [songs, setSongs] = useState([]);
    const [singers, setSingers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);


    const fetchSearchResults = async query => {
        if (!query) {
            setSongs([]);
            setSingers([]);
            return;
        }
        setLoading(true);
        setError('');
    try {
      const response = await fetch(`${API_URL}/tim-kiem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ search: query }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch results.");
      }

      const data = await response.json();
      setSongs(data.songs || []);
      setSingers(data.singers || []);
      console.log(" setSongs", songs);
      console.log("setSingers", singers);
    } catch (error) {
      setError("Lỗi khi tìm kiếm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("isAccountType");
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    useEffect(() => {
        const handleClickOutside = event => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
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
      <div className="flex justify-between  w-full h-auto flex-shrink py-4   h-[90px] px-10    bg-medium  text-zinc-700 flex items-center justify-center z-10 ">
      <button
                className=" bg-red-600 text-white p-2 rounded-md lg:hidden "
                onClick={() => setIsSidebar(!isSidebar)}
            >
                {isSidebar ? <CloseIcon /> : <MenuIcon />}
            </button>
        <div className="relative w-[80%] md:w-auto">
          <InputSearch
            onSearch={fetchSearchResults}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200);
            }}
          />

          {isFocused && (songs.length > 0 || singers.length > 0 || loading) && (
            <div className="results mt-10 z-50 absolute top-3 bg-[#172533] rounded-xl p-5 w-full ">
              {loading && (
                <p className="text-center text-gray-400">Đang tìm kiếm...</p>
              )}

              {songs.length > 0 && (
                <div className="songs mt-6">
                  <h2 className="text-base text-slate-400 font-semibold mb-4">
                    🎵 Danh sách bài hát:
                  </h2>
                  <ul className=" gap-6">
                    {songs.map((song, index) => (
                      <li
                        key={index}
                        className=" rounded-lg p-2 hover:shadow-lg transition-shadow cursor-pointer w-full"
                      >
                        <Link to={`/SongDetail/${song.id}`}>
                          <div className="flex items-center">
                            <img
                              src={song.song_image}
                              alt={song.song_name}
                              className="size-12 rounded-lg"
                            />
                            <div className="ml-5 w-full flex-1">
                              <h3 className="font-bold text-base truncate text-slate-300 w-[80%]">
                                {song.song_name}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                {song.singer_name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Danh sách ca sĩ */}
              {singers.length > 0 && (
                <div className="singers mt-8">
                  <h2 className="text-base text-slate-400 font-semibold mb-4">
                    🎤 Danh sách ca sĩ:
                  </h2>
                  <ul className="gap-6">
                    {singers.map((singer) => (
                      <li
                        key={singer.id}
                        className="rounded-lg p-2 hover:shadow-lg transition-shadow cursor-pointer w-full"
                      >
                        <Link to={`/ProfileArtist/${singer.id}`}>
                          <div className="flex items-center">
                            <img
                              src={singer.singer_image}
                              alt={singer.singer_name}
                              className="size-12 rounded-lg"
                            />
                            <div className="ml-5">
                              <h3 className="font-bold text-base truncate text-slate-300 ">
                                {singer.singer_name}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!loading && songs.length === 0 && singers.length === 0 && (
                <p className="text-center text-gray-400 mt-10">
                  Không tìm thấy kết quả.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="  hidden md:flex text-left items-center">
          {isProfile ? (
            <>
              {user.users_type == "Basic" ? (
                <Link
                  to="/Upgrade"
                  className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-85 text-white text-sm rounded-full px-4 py-2 transition duration-300 mr-3"
                >
                  Trải nghiệm Premium
                </Link>
              ) : user.users_type == "Plus" ? (
                <span className="bg-gradient-to-r from-[#EAB308] to-[#FF0065] hover:opacity-85 text-white text-sm rounded-full px-4 py-2 transition duration-300 mr-3">
                  {" "}
                  SoundWave Plus
                </span>
              ) : (
                <span className="bg-gradient-to-r from-[#DB2777] to-[#FF0065] hover:opacity-85 text-white text-sm rounded-full px-4 py-2 transition duration-300 mr-3">
                  {" "}
                  SoundWave Premium{" "}
                </span>
              )}
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
                  <div className="absolute z-50 right-0 mt-2 w-[400px]  bg-gray-800 rounded-xl shadow-2xl ">
                    <div className="flex flex-col w-full max-w-md mx-auto bg-gray-900 text-white rounded-xl">
                      <div
                        onClick={() => {
                          navigate("/ProfileEditPage");
                        }}
                        className="flex items-center p-4 border-b border-gray-800"
                      >
                        <div className="w-14 h-14 mr-4 ">
                          <img
                            className="rounded-full h-14 w-14"
                            src={user.image}
                            alt="Profile"
                          />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-base font-semibold">
                            {user.name}
                          </h2>
                          {user.users_type == "Basic" ? (
                            <p className="text-xs bg-gray-400 py-1 px-2 mt-2 text-white font-medium  w-fit rounded-full">
                              SoundWave Basic
                            </p>
                          ) : user.users_type == "Plus" ? (
                            <p className="bg-gradient-to-r from-[#EAB308] to-[#FF0065] hover:opacity-85 text-white text-sm rounded-full px-4 transition w-fit duration-300">
                              SoundWave Plus <br />
                              {user.expiry_date !== null ? (
                                <em>Hạn: {user.expiry_date}</em>
                              ) : (
                                <em>Hạn: Vĩnh viễn</em>
                              )}
                            </p>
                          ) : (
                            <p className="bg-gradient-to-r from-[#DB2777] to-[#FF0065] hover:opacity-85 text-white text-sm rounded-full px-4 transition  w-fit duration-300">
                              SoundWave Premium <br />
                              {user.expiry_date !== null ? (
                                <em>Hạn: {user.expiry_date}</em>
                              ) : (
                                <em>Hạn: Vĩnh viễn</em>
                              )}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <nav className="flex flex-col z-50">
                        {[
                          {
                            icon: Sparkles,
                            href: "/Upgrade",
                            label: "Nâng cấp tài khoản",
                          },
                          {
                            icon: CloudDownload,
                            href: "https://example.com",
                            label: "Nhạc đã tải xuống",
                          }, // Ví dụ link ngoại vi
                          {
                            icon: LockKeyhole,
                            href: "Privacy",
                            label: "Quyền riêng tư",
                          },
                          {
                            icon: Settings,
                            href: "SettingsPage",
                            label: "Cài đặt",
                          },
                          {
                            icon: Headset,
                            href: "ContactForm",
                            label: "Liên hệ",
                          },
                        ].map((item, index) => (
                          <button
                            key={index}
                            className="flex items-center p-4 hover:bg-gray-800 transition-colors last:rounded-b-xl"
                          >
                            <item.icon
                              className={`w-5 h-5 mr-4 ${
                                index === 0
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="flex-grow text-left text-sm">
                              {/* Kiểm tra href có phải là đường dẫn nội bộ */}
                              {item.href && item.href.startsWith("/") ? (
                                <Link to={item.href}>{item.label}</Link> // Dùng Link cho đường dẫn nội bộ
                              ) : (
                                <a href={item.href}>{item.label}</a> // Dùng thẻ a cho liên kết ngoại vi
                              )}
                            </span>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </button>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="flex items-center p-4 hover:bg-gray-800 transition-colors last:rounded-b-xl"
                        >
                          <LogOut className="w-5 h-5 mr-4 text-red-500" />
                          <span className="flex-grow text-left text-sm">
                            Đăng xuất
                          </span>
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
