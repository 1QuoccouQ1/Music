import InputSearch from "./InputSearch";
import React, { useState } from "react";
import {
  ChevronRight,
  Bell,
  CloudDownload,
  LockKeyhole,
  Settings,
  Headset,
  LogOut,
  Sparkles
} from "lucide-react";

function Nav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isProfile = true;

  return (
    <>
      <div className="flex justify-between  w-auto h-auto flex-shrink py-4   h-[90px] px-10    bg-medium  text-zinc-700 flex items-center justify-center z-10">
        <InputSearch></InputSearch>
        <div className=" flex  text-left items-center">
          {isProfile ? <></> : <></>}
          {/* <a href='/register'>
                    <div className='text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full  cursor-pointer'>Đăng Ký </div>
                  </a>
                  <a href='/login'>
                    <div className='text-white py-2 px-7 mx-2  bg-gradient-to-r from-[#FF553E] to-[#FF0065] rounded-full  cursor-pointer'>Đăng Nhập </div>
                  </a> */}
          <button className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-85 text-white text-sm rounded-full px-4 py-2 transition duration-300 mr-10">
            Trải nghiệm Premium
          </button>
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
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2  rounded-full p-1 transition duration-300"
            >
              <img
                src="https://th.bing.com/th/id/OIP.jXI_zIdHAKX4NUOup0HSnQHaH2?w=203&h=216&c=7&r=0&o=5&pid=1.7"
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
              <div className="absolute z-10 right-0 mt-2 w-[400px]  bg-gray-800 rounded-xl shadow-lg ">
                <div className="flex flex-col w-full max-w-md mx-auto bg-gray-900 text-white rounded-xl">
                  
                  <div className="flex items-center p-4 border-b border-gray-800">
                    <div className="w-12 h-12 mr-4 ">
                      <img
                      className="rounded-full"
                        src="https://th.bing.com/th/id/OIP.jXI_zIdHAKX4NUOup0HSnQHaH2?w=203&h=216&c=7&r=0&o=5&pid=1.7"
                        alt="Profile"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-base font-semibold">
                        Nguyễn Đỗ Thanh Nguyên
                      </h2>
                      <p className="text-xs bg-gray-400 py-1 px-2 mt-2 text-white font-medium  w-fit rounded-full">SoundWave Basic</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <nav className="flex flex-col">
                    {[
                      { icon: Sparkles, label: "Nâng cấp tài khoản" },
                      { icon: CloudDownload, label: "Nhạc đã tải xuống" },
                      { icon: LockKeyhole, label: "Quyền riêng tư" },
                      { icon: Settings, label: "Cài đặt" },
                      { icon: Headset, label: "Liên hệ" },
                      { icon: LogOut, label: "Đăng xuất" },
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="flex items-center p-4 hover:bg-gray-800 transition-colors last:rounded-b-xl"
                      >
                        <item.icon  className={`w-5 h-5 mr-4 ${
          index === 0 ? "text-yellow-500" : "text-gray-400"
        }`}  />
                        <span className="flex-grow text-left text-sm ">
                          {item.label}
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
