import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../services/apiService";

const ContactForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    topic: "",
    email: user.email || "",
    username: user.name || "",
    message: "",
    acknowledge: false,
    dataProcessing: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.topic) newErrors.topic = "Vui lòng chọn vấn đề cần liên hệ.";
    if (!formData.email) newErrors.email = "Email không được để trống.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Email không đúng định dạng.";
    if (!formData.message)
      newErrors.message = "Vui lòng nhập nội dung cần hỗ trợ.";
    if (!formData.acknowledge)
      newErrors.acknowledge =
        "Bạn cần xác nhận rằng nội dung trình bày là thật.";
    if (!formData.dataProcessing)
      newErrors.dataProcessing = "Bạn cần đồng ý với chính sách xử lý dữ liệu.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch(API_URL + "/lien-he", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thành công! Dữ liệu đã được gửi.");
        setFormData({
          topic: "",
          message: "",
          email: user.email || "",
          username: user.name || "",
          acknowledge: false,
          dataProcessing: false,
        });
        setErrors({});
      } else {
        toast.error("Có lỗi xảy ra khi gửi dữ liệu.");
      }
    } catch (error) {
      toast.error("Lỗi kết nối. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-3">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-semibold text-white mb-6 mt-8 text-center">
            Liên hệ với chúng tôi
          </h1>
          <div className="py-8 px-4 sm:px-10 rounded-lg border-4 border-indigo-500/5 bg-gray-800 shadow-lg">
            <p className="text-gray-400 mb-6 text-center">
              Chúng tôi luôn ghi nhận các đóng góp ý kiến của bạn để cải tiến và
              nâng cấp sản phẩm SoundWave.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-400">
                  Chọn vấn đề mà bạn cần hỗ trợ{" "}
                  <span className="text-red-600"> *</span>
                </label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className={`w-full p-3 bg-gray-900 text-gray-200 rounded border ${
                    errors.topic ? "border-red-500" : "border-pink-500"
                  }`}
                >
                  <option value="">-- Chọn vấn đề --</option>
                  <option value="Hỗ trợ kỹ thuật" selected>
                    Hỗ trợ kỹ thuật
                  </option>
                  <option value="Hóa đơn">Hóa đơn</option>
                  <option value="Câu hỏi chung">Câu hỏi chung</option>
                </select>
                {errors.topic && (
                  <p className="text-red-500 text-sm">{errors.topic}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-400">
                  Email <span className="text-red-600"> *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className={`w-full p-3 bg-gray-900 text-gray-200 rounded border ${
                    errors.email ? "border-red-500" : "border-pink-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-400">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  readOnly
                  className="w-full p-3 bg-gray-900 text-gray-200 rounded border border-pink-500"
                />
                <p className="text-sm text-gray-400 mt-2">
                  Có thể tìm thấy tên người dùng trên hồ sơ SoundWave của tài
                  khoản.
                </p>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-400">
                  Nội dung cần giúp đỡ <span className="text-red-600"> *</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full p-3 bg-gray-900 text-gray-200 rounded border ${
                    errors.message ? "border-red-500" : "border-pink-500"
                  }`}
                  rows="4"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">
                  Xác nhận rằng nội dung trình bày là thật trước khi gửi
                </p>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="acknowledge"
                    id="acknowledge"
                    checked={formData.acknowledge}
                    onChange={handleInputChange}
                    className="mr-2 border border-pink-500"
                  />
                  <label
                    className="text-gray-400 text-sm"
                    htmlFor="acknowledge"
                  >
                    Tôi đảm bảo rằng tất cả thông tin là đúng và chính xác.
                  </label>
                </div>
                {errors.acknowledge && (
                  <p className="text-red-500 text-sm">{errors.acknowledge}</p>
                )}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="dataProcessing"
                    checked={formData.dataProcessing}
                    onChange={handleInputChange}
                    className="mr-2 border border-pink-500"
                    id="dataProcessing"
                  />
                  <label
                    className="text-gray-400 text-sm"
                    htmlFor="dataProcessing"
                  >
                    Tôi đồng ý với chính sách xử lý dữ liệu của SoundWave.
                  </label>
                </div>
                {errors.dataProcessing && (
                  <p className="text-red-500 text-sm">
                    {errors.dataProcessing}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-semibold text-center ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-500 text-white"
                }`}
                disabled={isLoading} // Disable khi đang loading
              >
                {isLoading ? "Đang gửi..." : "Xác Nhận"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
