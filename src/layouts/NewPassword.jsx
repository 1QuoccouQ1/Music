import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react";
import { API_URL } from "../services/apiService";
import { toast } from "react-toastify";

function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState("vi");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { email } = location.state || {};
  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumberOrSpecialChar, setHasNumberOrSpecialChar] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [isMatching, setIsMatching] = useState(true); // Check mật khẩu khớp
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const validatePassword = (value) => {
    setHasLetter(/[a-zA-Z]/.test(value));
    setHasNumberOrSpecialChar(/[0-9!@#\$%\^&]/.test(value));
    setIsLongEnough(value.length >= 10);
  };

  const checkPasswordsMatch = (confirmValue) => {
    setIsMatching(password === confirmValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước khi gửi
    if (!hasLetter || !hasNumberOrSpecialChar || !isLongEnough || !isMatching) {
      setError("Vui lòng đảm bảo mật khẩu thỏa mãn các điều kiện.");
      return;
    }

    try {
      // Gọi API bằng fetch
      const response = await fetch(
        `${API_URL}/newpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        // Nếu thành công, chuyển hướng về trang đăng nhập
        toast.success("Mật khẩu đã được cập nhật. Vui lòng đăng nhập.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Không thể cập nhật mật khẩu. Vui lòng thử lại.");
    }
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
    <>
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
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button className="absolute top-4 left-4 text-gray-600 hover:text-gray-800">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold mb-4 mt-8">Tạo mật khẩu mới</h1>
          <p className="text-gray-600 mb-6">
            Vui lòng nhập mật khẩu mới của bạn dưới đây cho tài khoản Spotify
            của bạn.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="new-password"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="new-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="••••••••••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                    checkPasswordsMatch(confirmPassword); // Check xem mật khẩu có khớp không mỗi khi thay đổi
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-2">
                Mật khẩu của bạn phải có ít nhất
              </p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-pink-500 "
                    checked={hasLetter}
                    readOnly
                  />
                  <span className="ml-2 text-sm text-gray-600 font-bold">
                    1 chữ cái
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-pink-500  "
                    checked={hasNumberOrSpecialChar}
                    readOnly
                  />
                  <span className="ml-2 text-sm text-gray-600 font-bold">
                    1 chữ số hoặc ký tự đặc biệt (ví dụ: # ? ! &)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-pink-500"
                    checked={isLongEnough}
                    readOnly
                  />
                  <span className="ml-2 text-sm text-gray-600 font-bold">
                    10 ký tự
                  </span>
                </label>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="••••••••••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    checkPasswordsMatch(e.target.value); // Cập nhật trạng thái khớp khi người dùng nhập lại mật khẩu
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {!isMatching && (
                <p className="text-sm text-red-500 mt-2">
                  Mật khẩu không khớp. Vui lòng kiểm tra lại.
                </p>
              )}
            </div>
            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}{" "}
            {/* Hiển thị lỗi */}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-pink-600 transition duration-300"
              disabled={
                !hasLetter ||
                !hasNumberOrSpecialChar ||
                !isLongEnough ||
                !isMatching
              }
            >
              Tiếp tục
            </button>
          </form>
          <Link to={"/login"} className="text-center mt-6 text-sm text-pink-500 hover:underline cursor-pointer">
            Quay lại Đăng Nhập
          </Link>
        </div>
      </div>
    </>
  );
}

export default NewPassword;
