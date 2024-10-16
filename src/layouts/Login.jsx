import { Facebook, Apple } from "lucide-react";
import { useState, useRef, useEffect,useContext } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../ContextAPI/UserContext';
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
      emailLabel: "Email hoặc số điện thoại",
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
      newErrors.email = language === "vi" ? "Email hoặc số điện thoại không được để trống." : "Email or phone number cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = language === "vi" ? "Địa chỉ email không hợp lệ." : "Invalid email address.";
    }

    if (!password) {
      newErrors.password = language === "vi" ? "Mật khẩu không được để trống." : "Password cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch('https://soundwave.io.vn/admin/public/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        // Kiểm tra trạng thái của phản hồi
        if (response.status === 200) {
          const data = await response.json();

          // console.log(data.user);

          localStorage.setItem('user',JSON.stringify(data.user) );
          
          // Lưu thông tin người dùng vào Context
          // setUser(data.user);  // data.user là thông tin người dùng trả về từ API
          
          navigate('/');
        } else {
          setErrors({
            form: language === 'vi' ? 'Đăng nhập thất bại. Vui lòng kiểm tra lại.' : 'Login failed. Please try again.'
          });
          console.log(errors);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        
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
          <h1 className="text-2xl font-bold text-center mb-6">{texts[language].title}</h1>
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
              <a href="/PasswordReset" className="text-sm text-slate-700 ">
                {texts[language].forgotPassword}
              </a>
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
              <a href="/register" className="text-pink-500 hover:underline">
                {texts[language].register}
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
