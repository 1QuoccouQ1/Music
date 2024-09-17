import { ArrowLeft } from 'lucide-react'
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import ErrorIcon from '@mui/icons-material/Error';
export default function PasswordCode() {
  const [resetMethod, setResetMethod] = useState('email')
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

  return (
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative">
        <a href='/PasswordReset'>
            <button className="absolute left-4 top-4 text-gray-600 hover:text-gray-800" aria-label="Go back">
            <ArrowLeft className="h-6 w-6" />
            </button>
        </a>
        <h1 className="text-2xl font-bold text-center mb-4">Đặt lại mật khẩu</h1>
        <p className="text-sm text-gray-600 text-left mb-6">
          Để tiếp tục, hãy chọn phương thức khôi phục tài khoản để chúng tôi có thể xác minh yêu cầu.
        </p>
        <div className="flex justify-center font-medium  mb-4">
          <button
            className={`px-4 py-2 flex-1 border-b-2 text-black   ${
              resetMethod === 'email' ? 'border-pink-500 ' : 'border-gray-200 '
            }`}
            onClick={() => setResetMethod('email')}
          >
            Email
          </button>
          <button
            className={`px-4 py-2 flex-1 border-b-2  ${
              resetMethod === 'phone' ? 'border-pink-500 ' : 'border-gray-200 '
            }`}
            onClick={() => setResetMethod('phone')}
          >
            Số điện thoại
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Chúng tôi sẽ gửi mã đặt lại đến {
              resetMethod === 'email' ? 'địa chỉ email ' : 'số điện thoại '
            }  bạn đã cung cấp để khôi phục tài khoản.
        </p>
        <div className=" border border-slate-300  px-4 py-3 rounded-lg relative mb-4" role="alert">
          <strong className="font-medium text-red-500 flex inline-flex items-center "> <ErrorIcon sx={{ fontSize: 14 }}  /><span className='ml-1'>Cảnh báo:</span></strong>
          <span className="block sm:inline text-slate-500"> Bạn sẽ mất quyền truy cập vào tất cả dữ liệu được mã hóa hiện tại trong tài khoản của mình nếu bạn tiếp tục.</span>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
               {
              resetMethod === 'email' ? 'Địa chỉ email ' : 'Số điện thoại '
            }  khôi phục
            </label>
            <div className="relative">
            {
              resetMethod === 'email' ? (
                <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 pr-20"
                placeholder="Nhập email của bạn "
                
              />
              ) : (
                <input
                id="phone"
                type="tel"
                className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 pr-20"
                placeholder="Nhập số điện thoại của bạn "
                
              />
              )
            } 
              
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-pink-500 text-white rounded-md text-sm"
              >
                gửi mã
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md transition duration-300 ease-in-out"
          >
            Gửi mã
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/login" className="text-pink-500 hover:underline text-sm">
            Quay lại Đăng Nhập
          </a>
        </div>
      </div>
    </div>
  )
}