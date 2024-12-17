import { Facebook, Apple } from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../ContextAPI/UserContext";
import { Undo2 } from "lucide-react";
import { API_URL } from "../services/apiService";
function Login() {
  // const { setUser } = useContext(UserContext);
  const [language, setLanguage] = useState("vi");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // State cho các trường và lỗi
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const texts = {
    vi: {
      title: "Đăng Nhập",
      emailLabel: "Email",
      passwordLabel: "Mật Khẩu",
      forgotPassword: "Quên mật khẩu?",
      loginButton: "Đăng Nhập",
      noAccount: "Bạn chưa có tài khoản?",
      register: "Đăng ký",
      terms: "Điều khoản",
      privacy: "Chính sách bảo mật",
      footer: "SoundWave. Privacy by default.",
    },
    en: {
      title: "Login",
      emailLabel: "Email or Phone Number",
      passwordLabel: "Password",
      forgotPassword: "Forgot password?",
      loginButton: "Login",
      noAccount: "Don't have an account?",
      register: "Register",
      terms: "Terms",
      privacy: "Privacy policy",
      footer: "SoundWave. Privacy by default.",
    },
  };

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

  // Hàm kiểm tra tính hợp lệ của form
  const validate = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email =
        language === "vi"
          ? "Email hoặc số điện thoại không được để trống."
          : "Email or phone number cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email =
        language === "vi"
          ? "Địa chỉ email không hợp lệ."
          : "Invalid email address.";
    }

    if (!password) {
      newErrors.password =
        language === "vi"
          ? "Mật khẩu không được để trống."
          : "Password cannot be empty.";
    } else if (password.length < 8) {
      newErrors.password =
        language === "vi"
          ? "Mật khẩu phải có ít nhất 8 ký tự."
          : "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const data = await response.json();

        // Kiểm tra trạng thái của phản hồi
        if (response.status === 200) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isAccountType", data.user.users_type);
          localStorage.setItem("isSetting", false);
          navigate("/");
        } else {
          setErrors({
            form:
              data.error ||
              (language === "vi"
                ? "Đăng nhập thất bại. Vui lòng kiểm tra lại."
                : "Login failed. Please try again."),
          });
        }
      } catch (error) {
        console.error("Error parsing response JSON:", error);
        setErrors({
          form:
            language === "vi"
              ? "Đã có lỗi xảy ra. Vui lòng thử lại."
              : "An error occurred. Please try again.",
        });
      }
    }
  };

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
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <Link to="/" className="cursor-pointer mb-4">
            <Undo2 />
          </Link>
          <h1 className="text-2xl font-bold text-center mb-6">
            {texts[language].title}
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {texts[language].emailLabel}
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-pink-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {texts[language].passwordLabel}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-pink-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              {errors.form && (
                <p className="text-red-500 text-sm mt-1">{errors.form}</p>
              )}
            </div>
            <div className="text-right">
              <Link to="/PasswordReset" className="text-sm text-slate-700 ">
                {texts[language].forgotPassword}
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold rounded-md transition duration-300 ease-in-out"
            >
              {texts[language].loginButton}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {texts[language].noAccount}{" "}
              <Link to="/register" className="text-pink-500 hover:underline">
                {texts[language].register}
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>{texts[language].footer}</p>
          <div className="mt-2">
            <a href="#" className="text-pink-500 hover:underline mr-4">
              {texts[language].terms}
            </a>
            <a href="#" className="text-pink-500 hover:underline mr-4">
              {texts[language].privacy}
            </a>
            <span>Version 5.0.163.5</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
