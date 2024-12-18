import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../services/apiService';

function ProfileEditPage() {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        gender: '',
        phone: '',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isImageChanged, setIsImageChanged] = useState('/default-avatar.png');

    useEffect(() => {
        try {
            const user = localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user'))
                : null;
            if (user) {
                const {
                    birthday = '0000-00-00',
                    image,
                    name,
                    email,
                    gender,
                    phone
                } = user;
                const [year = '', month = '', day = ''] = birthday.split('-');
                setProfileData({
                    name: name || '',
                    email: email || '',
                    birthDay: day,
                    birthMonth: month,
                    birthYear: year,
                    gender: gender || '',
                    image: image || '/default-avatar.png',
                    phone: phone || ''
                });
                setIsImageChanged(image || '/default-avatar.png');
            } else {
                console.warn('No user found in localStorage');
            }
        } catch (err) {
            console.error('Error parsing user data from localStorage:', err);
        }
    }, []);

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            setProfileData(prevData => ({
                ...prevData,
                image: file
            }));
            setIsImageChanged(URL.createObjectURL(file));
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = [];
        if (!profileData.name) errors.push('Vui lòng nhập tên người dùng.');
        if (!profileData.email) {
            errors.push('Vui lòng nhập email.');
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profileData.email)) {
            errors.push('Email không đúng định dạng.');
        }
        if (!profileData.phone) {
            errors.push('Vui lòng nhập số điện thoại.');
        } else if (!/^\d{10}$/.test(profileData.phone)) {
            errors.push('Số điện thoại phải chứa đúng 10 chữ số.');
        }
        if (
            !profileData.birthDay ||
            !profileData.birthMonth ||
            !profileData.birthYear
        ) {
            errors.push('Vui lòng chọn đầy đủ ngày, tháng, năm sinh.');
        }
        return errors;
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            validationErrors.forEach(error => toast.error(error));
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;

        if (!userId) {
            toast.error('User ID không tồn tại!');
            return;
        }

        const updatedProfileData = {
            ...profileData,
            birthday: `${
                profileData.birthYear
            }-${profileData.birthMonth.padStart(
                2,
                '0'
            )}-${profileData.birthDay.padStart(2, '0')}`
        };

        const formData = new FormData();
        formData.append('name', updatedProfileData.name);
        formData.append('email', updatedProfileData.email);
        formData.append('birthday', updatedProfileData.birthday);
        formData.append('gender', updatedProfileData.gender);
        formData.append('phone', updatedProfileData.phone);

        if (profileData.image instanceof File) {
            formData.append('image', profileData.image);
        }
        console.log('formData:', formData);

        formData.append('_method', 'PUT');

        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/${userId}/update-member`, {
                method: 'POST', // Đặt POST thay vì PUT
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'access_token'
                    )}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.text();
                toast.error(`API error: ${response.status} - ${errorData}`);
                return;
            }

            const data = await response.json();
            toast.success('Hồ sơ đã được lưu thành công!');
            localStorage.setItem('user', JSON.stringify(data.user));
            setIsImageChanged(data.user.image);
        } catch (error) {
            console.error('Error while saving profile:', error);
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-gray-900 min-h-screen flex justify-center pt-6 pb-10 px-4 sm:px-6'>
            <div className='bg-gray-900 p-6 sm:p-8 rounded-lg w-full max-w-[777px] shadow-lg'>
                <h1 className='text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-9'>
                    Chỉnh Sửa Hồ Sơ
                </h1>
                <form onSubmit={handleSubmit} enctype='multipart/form-data'>
                    <div className='mb-4'>
                        <div className='flex flex-col items-center'>
                            <div className='relative'>
                                <img
                                    src={isImageChanged}
                                    alt='Profile'
                                    className='rounded-full w-[255px] h-[255px] border-4 border-pink-600 object-cover'
                                />
                                <label
                                    htmlFor='imageUpload'
                                    className='absolute bottom-2 right-2 cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg'
                                >
                                    <FaEdit className='text-white text-4xl' />
                                </label>
                                <input
                                    id='imageUpload'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-400 mb-2'>
                            Tên người dùng
                        </label>
                        <input
                            type='text'
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            value={profileData.name}
                            name='name'
                            onChange={handleChange}
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
                            readOnly
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-400 mb-2'>
                            Số điện thoại
                        </label>
                        <input
                            type='text'
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            value={profileData.phone}
                            name='phone'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
                        {['Ngày', 'Tháng', 'Năm'].map((label, index) => (
                            <div className='w-full sm:w-1/3' key={label}>
                                <label className='block text-sm font-medium text-gray-400 mb-2'>
                                    {label}
                                </label>
                                <select
                                    className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                                    value={
                                        index === 0
                                            ? profileData.birthDay
                                            : index === 1
                                            ? profileData.birthMonth
                                            : profileData.birthYear
                                    }
                                    name={
                                        index === 0
                                            ? 'birthDay'
                                            : index === 1
                                            ? 'birthMonth'
                                            : 'birthYear'
                                    }
                                    onChange={handleChange}
                                >
                                    {Array.from(
                                        {
                                            length:
                                                index === 2
                                                    ? 100
                                                    : index === 1
                                                    ? 12
                                                    : 31
                                        },
                                        (_, i) => {
                                            const value =
                                                index === 2
                                                    ? (2024 - i).toString()
                                                    : (i + 1)
                                                          .toString()
                                                          .padStart(2, '0');
                                            return (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        ))}
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-400 mb-2'>
                            Giới tính
                        </label>
                        <select
                            className='bg-gray-900 text-white border-2 border-pink-600 rounded-lg p-3 w-full'
                            value={profileData.gender || ''}
                            name='gender'
                            onChange={handleChange}
                        >
                            <option value=''>Chọn giới tính</option>
                            <option value='Nam'>Nam</option>
                            <option value='Nữ'>Nữ</option>
                            <option value='Khác'>Khác</option>
                        </select>
                    </div>

                    <div className='flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4'>
                        <button
                            type='button'
                            className='bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full sm:w-auto'
                            onClick={() =>
                                setProfileData(
                                    JSON.parse(localStorage.getItem('user'))
                                )
                            }
                        >
                            Hủy
                        </button>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-700 hover:scale-105 transition-all duration-700 ease-in-out text-white py-3 px-6 rounded-full w-full sm:w-auto'
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
