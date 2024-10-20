import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        topic: '',
        email: '',
        username: '',
        message: '',
        acknowledge: false,
        dataProcessing: false
    });

    const handleInputChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Form submitted', formData);
    };

    return (
        <div className='bg-gray-900 min-h-screen flex items-center justify-center pt-3'>
            <div>
                <h1 className='text-3xl font-semibold text-white mb-6 mt-16 '>
                    Liên hệ với chúng tôi
                </h1>
                <div className='  py-14 px-[190px] rounded-lg max-w-4xl w-full border-4 border-indigo-500/5'>
                    <p className='text-gray-400  mb-6'>
                        Chúng tôi luôn ghi nhận các đóng góp ý kiến của bạn để
                        cải tiến và nâng cấp sản phẩm SoundWave ngày một hoàn
                        thiện và hữu ích hơn. Đừng ngại chia sẻ ý tưởng cho
                        chúng tôi.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block mb-2 text-sm font-medium text-gray-400'>
                                Chọn vấn đề mà bạn cần hỗ trợ{' '}
                                <span className='text-red-600'> *</span>
                            </label>
                            <select
                                name='topic'
                                value={formData.topic}
                                onChange={handleInputChange}
                                className='w-full p-3 bg-gray-900 text-gray-200 rounded border border-pink-500'
                                required
                            >
                                <option value=''>
                                    Chọn vấn đề cần liên hệ
                                </option>
                                <option value='technical'>
                                    Hỗ trợ kỹ thuật
                                </option>
                                <option value='billing'>Hóa đơn</option>
                                <option value='general'>Câu hỏi chung</option>
                            </select>
                        </div>

                        <div className='mb-5'>
                            <label className='block mb-2 text-sm font-medium text-gray-400'>
                                Email <span className='text-red-600'> *</span>
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
                                Có thể tìm thấy tên người dùng trên hồ sơ
                                SoundWave của tài khoản.
                            </p>
                        </div>

                        <div className='mb-4'>
                            <label className='block mb-2 text-sm font-medium text-gray-400'>
                                Nội dung cần giúp đỡ{' '}
                                <span className='text-red-600'> *</span>
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
                                Xác nhận rằng nội dung trình bày là thật trước
                                khi gửi
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
                                    Tôi đảm bảo rằng tất cả thông tin là đúng và
                                    chính xác.
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
                                    Tôi đồng ý với chính sách xử lý dữ liệu của
                                    SoundWave.
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
        </div>
    );
};

export default ContactForm;
