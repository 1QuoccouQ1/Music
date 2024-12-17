import { ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../services/apiService";

export default function PasswordReset() {
  const [language, setLanguage] = useState("vi");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
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

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Vui lòng nhập email.");
      return;
    }
    // Ngăn chặn hành vi mặc định của form
    setErrorMessage("");
    try {
      // Gửi request POST đến /resetpass với email
      const response = await fetch(`${API_URL}/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Gửi email trong body request
      });

      if (response.status === 200) {
        // Nếu API trả về thành công, điều hướng tới trang /passcode
        navigate("/PasswordCode", { state: { email } });
      } else {
        const data = await response.json(); // Lấy dữ liệu từ API
        setErrorMessage(data.message || "Có lỗi xảy ra. Vui lòng thử lại."); // Hiển thị thông báo lỗi từ API hoặc lỗi mặc định
      }
    } catch (error) {
      setErrorMessage("Lỗi kết nối. Vui lòng kiểm tra lại mạng của bạn.");
    }
  };

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
        <Link to="/login">
          <button
            className="absolute left-4 top-4 text-gray-600 hover:text-gray-800"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-center mb-6">
          Đặt lại mật khẩu
        </h1>
        <p className="text-sm text-gray-600 text-left mb-6 pr-4">
          Nhập địa chỉ email hoặc tên người dùng được liên kết với tài khoản
          SoundWave của bạn và chúng tôi sẽ gửi email cho bạn.
        </p>
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email hoặc số điện thoại
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">
              {errorMessage} {/* Hiển thị thông báo lỗi nếu có */}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-80 text-white font-semibold rounded-md transition duration-300 ease-in-out"
          >
            Tiếp tục
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-pink-500 hover:underline text-sm">
            Quay lại Đăng Nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
