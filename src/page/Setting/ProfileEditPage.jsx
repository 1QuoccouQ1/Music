import React, { useState, useEffect } from 'react';

const ProfileEditPage = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        gender: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        country: '',
        shareData: false
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get saved profile data from localStorage when component mounts
    useEffect(() => {
        const savedData = localStorage.getItem('profileData');
        if (savedData) {
            setProfileData(JSON.parse(savedData));
        } else {
            // If there's no profile data in localStorage, handle the case accordingly
            console.log('No profile data found in localStorage');
        }
    }, []);

    // Handle input changes
    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Save data to localStorage (and optionally update via API)
    const handleSave = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
        const userId = user ? user.id : null;

        if (!userId) {
            alert('User ID not found!');
            return;
        }

        const profileData = {
            // Default profile data structure
            name: '',
            email: '',
            phone: '',
            // Add other fields as necessary
            ...JSON.parse(localStorage.getItem('profileData')) // Merge with existing profile data if available
        };

        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Make the API call to update the user's profile
            const response = await fetch(
                `https://your-api-url.com/api/${userId}/update-member`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`
                    },
                    body: JSON.stringify(profileData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Hồ sơ đã được lưu thành công!');
                // Optionally save updated data to localStorage
                localStorage.setItem(
                    'profileData',
                    JSON.stringify(profileData)
                );
            } else {
                setErrorMessage(
                    data.message || 'Có lỗi xảy ra khi cập nhật hồ sơ.'
                );
            }
        } catch (error) {
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-gray-900 min-h-screen flex justify-center items-center pb-10 px-4 sm:px-6'>
            <div className='bg-gray-900 p-6 sm:p-8 rounded-lg w-full max-w-[777px]'>
                <h1 className='text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-9'>
                    Chỉnh Sửa Hồ Sơ
                </h1>

                <form>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-400 mb-2'>
                            Tên người dùng
                        </label>
                        <input
                            type='text'
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            value={profileData.username}
                            name='username'
                            disabled
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-400 mb-2'>
                            Email
                        </label>
                        <input
                            type='email'
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            value={profileData.email}
                            name='email'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-400 mb-2'>
                            Giới tính
                        </label>
                        <select
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            value={profileData.gender}
                            name='gender'
                            onChange={handleChange}
                        >
                            <option value='Nam'>Nam</option>
                            <option value='Nữ'>Nữ</option>
                            <option value='Khác'>Khác</option>
                        </select>
                    </div>

                    <div className='mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
                        <div className='w-full sm:w-1/3'>
                            <label className='block text-sm font-medium text-gray-400 mb-2'>
                                Ngày sinh
                            </label>
                            <select
                                className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                                value={profileData.birthDay}
                                name='birthDay'
                                onChange={handleChange}
                            >
                                {[...Array(31)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='w-full sm:w-1/3'>
                            <label className='block text-sm font-medium text-gray-400 mb-2'>
                                Tháng
                            </label>
                            <select
                                className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                                value={profileData.birthMonth}
                                name='birthMonth'
                                onChange={handleChange}
                            >
                                {[...Array(12)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Tháng {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='w-full sm:w-1/3'>
                            <label className='block text-sm font-medium text-gray-400 mb-2'>
                                Năm
                            </label>
                            <select
                                className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                                value={profileData.birthYear}
                                name='birthYear'
                                onChange={handleChange}
                            >
                                {[...Array(100)].map((_, i) => (
                                    <option key={i} value={2024 - i}>
                                        {2024 - i}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-400 mb-2'>
                            Quốc gia và Khu Vực
                        </label>
                        <select
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            value={profileData.country}
                            name='country'
                            onChange={handleChange}
                        >
                            <option value='Vietnam'>Việt Nam</option>
                            <option value='USA'>Hoa Kỳ</option>
                            <option value='Japan'>Nhật Bản</option>
                        </select>
                    </div>

                    <div className='mb-6'>
                        <label className='inline-flex items-center'>
                            <input
                                type='checkbox'
                                className='form-checkbox h-5 w-5 text-pink-600 rounded bg-[7C7C7C] border-pink-600'
                                name='shareData'
                                checked={profileData.shareData}
                                onChange={handleChange}
                            />
                            <span className='ml-2 text-gray-400 text-sm'>
                                Chia sẻ dữ liệu đăng ký của tôi với các nhà cung
                                cấp nội dung SoundWave cho mục đích tiếp thị.
                            </span>
                        </label>
                    </div>

                    {errorMessage && (
                        <p className='text-red-600 text-sm mb-4'>
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p className='text-green-600 text-sm mb-4'>
                            {successMessage}
                        </p>
                    )}

                    <div className='flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4'>
                        <button
                            type='button'
                            className='bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full sm:w-auto'
                        >
                            Hủy
                        </button>
                        <button
                            type='button'
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className='bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-700 transition duration-700 text-white py-3 px-6 rounded-full w-full sm:w-auto'
                        >
                            {isSubmitting ? 'Đang lưu...' : 'Lưu hồ sơ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditPage;
