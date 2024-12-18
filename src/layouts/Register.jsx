import { Facebook, Apple } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Undo2 } from "lucide-react";

import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../services/apiService";
function Register() {
  const navigate = useNavigate();
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
  });

  const texts = {
    vi: {
      title: "Đăng Ký Tài Khoản",
      emailLabel: "Email",
      passwordLabel: "Mật Khẩu",
      forgotPassword: "Quên mật khẩu?",
      loginButton: "Đăng Ký",
      noAccount: "Bạn chưa có tài khoản?",
      register: "Đăng nhập",
      terms: "Điều khoản",
      privacy: "Chính sách bảo mật",
      footer: "SoundWave. Privacy by default.",
      name: "Tên đăng nhập",
      fullname: "Họ và Tên",
      nSing: "Ngày Sinh",
      gender: "Giới Tính",
      day: "Ngày",
      month: "Tháng",
      year: "Năm",
      male: "Nam",
      female: "Nữ",
      other: "Khác",
      loading: "Đang xử lý ...",
    },
    en: {
      title: "Register an account",
      emailLabel: "Email or Phone Number",
      passwordLabel: "Password",
      forgotPassword: "Forgot password?",
      loginButton: "Register",
      noAccount: "Don't have an account?",
      register: "Login",
      terms: "Terms",
      privacy: "Privacy policy",
      footer: "SoundWave. Privacy by default.",
      name: "Username",
      fullname: "Full Name",
      nSing: "Birthday",
      gender: "Gender",
      day: "Day",
      month: "Month",
      year: "Year",
      male: "male",
      female: "female",
      other: "other",
      loading: "Loading ...",
    },
  };

  const [errors, setErrors] = useState({});
  const [language, setLanguage] = useState("vi");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

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

    // Kiểm tra email
    if (!formData.email) {
      newErrors.email =
        language === "vi"
          ? "Email hoặc số điện thoại không được để trống."
          : "Email or phone number cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email =
        language === "vi"
          ? "Địa chỉ email không hợp lệ."
          : "Invalid email address.";
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password =
        language === "vi"
          ? "Mật khẩu không được để trống."
          : "Password cannot be empty.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        language === "vi"
          ? "Mật khẩu phải có ít nhất 8 ký tự."
          : "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      // Check for uppercase letters
      newErrors.password =
        language === "vi"
          ? "Mật khẩu phải chứa ít nhất một ký tự viết hoa."
          : "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      // Check for numbers
      newErrors.password =
        language === "vi"
          ? "Mật khẩu phải chứa ít nhất một số."
          : "Password must contain at least one number.";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      // Check for special characters
      newErrors.password =
        language === "vi"
          ? "Mật khẩu phải chứa ít nhất một ký tự đặc biệt."
          : "Password must contain at least one special character.";
    }

    // Kiểm tra họ và tên
    if (!formData.fullname) {
      newErrors.fullname =
        language === "vi"
          ? "Họ và tên không được để trống."
          : "Full names must not be left blank.";
    }

    // Kiểm tra ngày sinh
    if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
      newErrors.dateOfBirth =
        language === "vi"
          ? "Ngày sinh không hợp lệ."
          : "Invalid date of birth.";
    }

    // Kiểm tra giới tính
    if (!formData.gender) {
      newErrors.gender =
        language === "vi"
          ? "Vui lòng chọn giới tính."
          : "Please select gender.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (e) => {
    setDateOfBirth((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.fullname,
            gender: formData.gender,
            birthday: `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`,
          }),
        });
        const data = await response.json();

        // Kiểm tra trạng thái của phản hồi
        if (response.status === 200 || response.status === 201) {
          toast.success("Đăng ký thành công !");
          setFormData({
            email: "",
            password: "",
            fullname: "",
            gender: "",
          });
          setDateOfBirth({
            day: "",
            month: "",
            year: "",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setErrors({
            form:
              data.message ||
              (language === "vi"
                ? "Đăng nhập ký bại. Vui lòng kiểm tra lại."
                : "Register failed. Please try again."),
          });
        }
      } catch (error) {
        console.error("Error logging in:", error);
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
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
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {texts[language].fullname}
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts[language].nSing}
              </label>
              <div className="flex space-x-2">
                <select
                  name="day"
                  value={dateOfBirth.day}
                  onChange={handleDateChange}
                  className="w-1/3 px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value=""> {texts[language].Day}</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  name="month"
                  value={dateOfBirth.month}
                  onChange={handleDateChange}
                  className="w-1/3 px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value=""> {texts[language].Month}</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  name="year"
                  value={dateOfBirth.year}
                  onChange={handleDateChange}
                  className="w-1/3 px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value=""> {texts[language].Year}</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={2023 - i} value={2023 - i}>
                      {2023 - i}
                    </option>
                  ))}
                </select>
              </div>
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {texts[language].gender}
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Khác">{texts[language].other}</option>
                <option value="Nam">{texts[language].male}</option>ß
                <option value="Nữ">{texts[language].female}</option>ß
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
              {errors.form && (
                <p className="text-red-500 text-sm mt-1">{errors.form}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 font-semibold rounded-md transition duration-300 ease-in-out ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
              }`}
              disabled={isLoading}
            >
              {isLoading
                ? texts[language].loading
                : texts[language].loginButton}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {texts[language].noAccount}{" "}
              <Link to="/login" className="text-pink-500 hover:underline">
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default Register;
