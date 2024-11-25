import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    email: "",
    username: "",
    message: "",
    acknowledge: false,
    dataProcessing: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Hàm validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.topic) newErrors.topic = "Vui lòng chọn vấn đề cần liên hệ.";
    if (!formData.email) newErrors.email = "Email không được để trống.";
    else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) // Kiểm tra định dạng email
    )
      newErrors.email = "Email không đúng định dạng.";
    if (!formData.message)
      newErrors.message = "Vui lòng nhập nội dung cần hỗ trợ.";
    if (!formData.acknowledge)
      newErrors.acknowledge =
        "Bạn cần xác nhận rằng nội dung trình bày là thật.";
    if (!formData.dataProcessing)
      newErrors.dataProcessing = "Bạn cần đồng ý với chính sách xử lý dữ liệu.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Nếu lỗi thì không tiếp tục

    try {
      const response = await fetch("/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Thành công! Dữ liệu đã được gửi.");
        setFormData({
          topic: "",
          email: "",
          username: "",
          message: "",
          acknowledge: false,
          dataProcessing: false,
        });

    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Form submitted', formData);
    };

    return (
        <div className='bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8'>
            <div className='w-full max-w-3xl'>
                <h1 className='text-3xl font-semibold text-white mb-6 mt-6 text-center'>
                    Liên hệ với chúng tôi
                </h1>
                <div className='bg-gray-900 py-10 px-8 sm:px-8 lg:px-12 rounded-lg border-4 border-indigo-500/5 shadow-lg '>
                    <p className='text-gray-400 mb-6 text-center'>
                        Chúng tôi luôn ghi nhận các đóng góp ý kiến của bạn để cải tiến và nâng cấp sản phẩm SoundWave ngày một hoàn thiện và hữu ích hơn. Đừng ngại chia sẻ ý tưởng cho chúng tôi.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block mb-2 text-sm font-medium text-gray-400'>
                                Chọn vấn đề mà bạn cần hỗ trợ <span className='text-red-600'>*</span>
                            </label>
                            <select
                                name='topic'
                                value={formData.topic}
                                onChange={handleInputChange}
                                className='w-full p-3 bg-gray-900 text-gray-200 rounded border border-pink-500'
                                required
                            >
                                <option value=''>Chọn vấn đề cần liên hệ</option>
                                <option value='technical'>Hỗ trợ kỹ thuật</option>
                                <option value='billing'>Hóa đơn</option>
                                <option value='general'>Câu hỏi chung</option>
                            </select>
                        </div>

                        <div className='mb-5'>
                            <label className='block mb-2 text-sm font-medium text-gray-400'>
                                Email <span className='text-red-600'>*</span>
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                className='w-full p-3 bg-gray-900 text-gray-200 rounded border border-pink-500'
                                required
                            />
                        </div>

                        <div className='mb-5'>
                            <label className='block mb-2 text-sm font-medium text-gray-400'>
                                Tên người dùng
                            </label>
                            <input
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleInputChange}
                                className='w-full p-3 bg-gray-900 text-gray-200 rounded border border-pink-500'
                            />
                            <p className='text-sm text-gray-400 mt-2'>
                                Có thể tìm thấy tên người dùng trên hồ sơ SoundWave của tài khoản.
                            </p>
                        </div>

                        <div className='mb-4'>
                            <label className='block mb-2 text-sm font-medium text-gray-400'>
                                Nội dung cần giúp đỡ <span className='text-red-600'>*</span>
                            </label>
                            <textarea
                                name='message'
                                value={formData.message}
                                onChange={handleInputChange}
                                className='w-full p-3 bg-gray-900 text-gray-200 rounded border border-pink-500'
                                rows='4'
                                required
                            />
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm text-gray-400 mb-2'>
                                Xác nhận rằng nội dung trình bày là thật trước khi gửi
                            </p>
                            <div className='flex items-center mb-2'>
                                <input
                                    type='checkbox'
                                    name='acknowledge'
                                    checked={formData.acknowledge}
                                    onChange={handleInputChange}
                                    className='mr-2 border border-pink-500'
                                    required
                                />
                                <label className='text-gray-400 text-sm'>
                                    Tôi đảm bảo rằng tất cả thông tin là đúng và chính xác.
                                </label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    name='dataProcessing'
                                    checked={formData.dataProcessing}
                                    onChange={handleInputChange}
                                    className='mr-2 border border-pink-500'
                                    required
                                />
                                <label className='text-gray-400 text-sm'>
                                    Tôi đồng ý với chính sách xử lý dữ liệu của SoundWave.
                                </label>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='w-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-500 text-white py-3 rounded-lg font-semibold text-center'
                        >
                            Xác Nhận
                        </button>
                    </form>
                </div>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-400">
                Email <span className="text-red-600"> *</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 bg-gray-900 text-gray-200 rounded border ${
                  errors.email ? "border-red-500" : "border-pink-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                onChange={handleInputChange}
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
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
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
                  checked={formData.acknowledge}
                  onChange={handleInputChange}
                  className="mr-2 border border-pink-500"
                  required
                />
                <label className="text-gray-400 text-sm">
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
                  required
                />
                <label className="text-gray-400 text-sm">
                  Tôi đồng ý với chính sách xử lý dữ liệu của SoundWave.
                </label>
              </div>
              {errors.dataProcessing && (
                <p className="text-red-500 text-sm">{errors.dataProcessing}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-500 text-white py-3 rounded-lg font-semibold text-center"
            >
              Xác Nhận
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
