import { Facebook, Apple } from 'lucide-react'
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";

function Register() {
    const [dateOfBirth, setDateOfBirth] = useState({ day: '', month: '', year: '' })

  const handleDateChange = (e) => {
    setDateOfBirth(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [language, setLanguage] = useState("vi");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    return ( <>
        <div className="min-h-screen bg-[#0a0e17] flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <div className="relative" ref={dropdownRef}>
                <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-[150px] px-3 py-2 text-purple-400 bg-gray-800 rounded-md focus:outline-none"
                >
                <Globe className="w-4 h-4 mr-2" />
                <span>{language === "vi" ? "Tiếng Việt" : "English"}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {isOpen && (
                <div className="absolute z-10 w-[150px] mt-1 bg-gray-800 rounded-md shadow-lg">
                    <ul className="py-1">
                    <li>
                        <button
                        onClick={() => selectLanguage("vi")}
                        className="block w-full px-4 py-2 text-left text-purple-400 hover:bg-gray-700"
                        >
                        Tiếng Việt
                        </button>
                    </li>
                    <li>
                        <button
                        onClick={() => selectLanguage("en")}
                        className="block w-full px-4 py-2 text-left text-purple-400 hover:bg-gray-700"
                        >
                        English
                        </button>
                    </li>
                    </ul>
                </div>
                )}
            </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Ký Tài Khoản</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email hoặc số điện thoại
            </label>
            <input
              id="email"
              type="text"
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật Khẩu
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
              Họ và Tên
            </label>
            <input
              id="fullname"
              type="text"
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày Sinh
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="day"
                placeholder="Ngày"
                value={dateOfBirth.day}
                onChange={handleDateChange}
                className="w-1/3 px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                name="month"
                placeholder="Tháng"
                value={dateOfBirth.month}
                onChange={handleDateChange}
                className="w-1/3 px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                name="year"
                placeholder="Năm"
                value={dateOfBirth.year}
                onChange={handleDateChange}
                className="w-1/3 px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Giới Tính
            </label>
            <select
              id="gender"
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value=""></option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold rounded-md transition duration-300 ease-in-out"
          >
            Đăng Ký
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <a href="/login" className="text-pink-500 hover:underline">
              Đăng Nhập
            </a>
          </p>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out">
            <Facebook className="h-5 w-5 text-blue-600" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out">
            <Apple className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>SoundWave. Privacy by default.</p>
        <div className="mt-2">
          <a href="#" className="text-pink-500 hover:underline mr-4">
            Terms
          </a>
          <a href="#" className="text-pink-500 hover:underline mr-4">
            Privacy policy
          </a>
          <span>Version 5.0.163.5</span>
        </div>
      </div>
    </div>
    </> );
}

export default Register;