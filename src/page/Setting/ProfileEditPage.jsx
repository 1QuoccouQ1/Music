import React, { useState, useEffect } from 'react';

function ProfileEditPage() {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        gender: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const [day, month, year] = user.birthday.split('-');
            setProfileData({
                ...user,
                birthDay: day,
                birthMonth: month,
                birthYear: year
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;

        if (!userId) {
            alert('User ID not found!');
            return;
        }

        const updatedProfileData = {
            ...profileData,
            birthday: `${profileData.birthDay}-${profileData.birthMonth}-${profileData.birthYear}`
        };

        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch(
                `https://your-api-url.com/api/${userId}/update-member`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                    body: JSON.stringify(updatedProfileData)
                }
            );

            if (!response.ok) {
                const errorData = await response.text();
                setErrorMessage(`API error: ${response.status} - ${errorData}`);
                return;
            }

            const data = await response.json();

            setSuccessMessage('Hồ sơ đã được lưu thành công!');
            localStorage.setItem('profileData', JSON.stringify(updatedProfileData));
        } catch (error) {
            console.error('Error while saving profile:', error);
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex justify-center pt-6  pb-10 px-4 sm:px-6">
            <div className="bg-gray-900 p-6 sm:p-8 rounded-lg w-full max-w-[777px] shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-9">
                    Chỉnh Sửa Hồ Sơ
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Tên người dùng</label>
                        <input
                            type="text"
                            className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
                            value={profileData.name}
                            name="name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
                            value={profileData.email}
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Ngày sinh</label>
                            <select
                                className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
                                value={profileData.birthDay}
                                name="birthDay"
                                onChange={handleChange}
                            >
                                {[...Array(31)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Tháng</label>
                            <select
                                className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
                                value={profileData.birthMonth}
                                name="birthMonth"
                                onChange={handleChange}
                            >
                                {[...Array(12)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Tháng {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Năm</label>
                            <select
                                className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
                                value={profileData.birthYear}
                                name="birthYear"
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

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Giới tính</label>
                        <select
                            className="bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full"
                            value={profileData.gender}
                            name="gender"
                            onChange={handleChange}
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    {errorMessage && (
                        <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
                    )}

                    {successMessage && (
                        <p className="text-green-600 text-sm mb-4">{successMessage}</p>
                    )}

                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                        <button
                            type="button"
                            className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full sm:w-auto"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-700 transition duration-700 text-white py-3 px-6 rounded-full w-full sm:w-auto"
                        >
                            {isSubmitting ? 'Đang lưu...' : 'Lưu hồ sơ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileEditPage;
