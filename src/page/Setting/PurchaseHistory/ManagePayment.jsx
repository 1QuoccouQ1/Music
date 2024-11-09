import React, { useEffect, useState } from 'react';

function ManagePayment() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                {
                    id: 1,
                    name: 'SoundWave Basic',
                    color: 'bg-gradient-to-r from-gray-400 to-gray-200',
                    price: 'Miễn Phí',
                    features: [
                        'Nghe nhạc có quảng cáo',
                        'Không tải xuống để nghe offline',
                        'Chất lượng âm thanh cơ bản',
                        'Phát nhạc theo ngẫu nhiên',
                        'Không sắp xếp danh sách phát'
                    ],
                    isRegistered: true,
                    buttonText: 'Đăng Ký Ngay'
                },
                {
                    id: 2,
                    name: 'SoundWave Plus',
                    color: 'bg-gradient-to-r from-[#FFA53B] to-[#F4C829]',
                    notification:
                        'Gói SoundWave Plus của bạn sẽ kết thúc vào ngày 15/10/24. Để tiếp tục sử dụng gói mà không bị gián đoạn vui lòng đăng ký trước hạn.',
                    features: [
                        'Nghe nhạc không quảng cáo',
                        'Tải xuống để nghe offline',
                        'Chất lượng âm thanh cao',
                        'Phát nhạc theo danh sách tự chọn',
                        'Sắp xếp danh sách phát'
                    ],
                    isRegistered: true,
                    buttonText: 'Gia Hạn'
                },
                {
                    id: 3,
                    name: 'SoundWave Premium',
                    color: 'bg-gradient-to-r from-pink-500 to-red-500',
                    notification:
                        'Gói SoundWave Plus của bạn sẽ kết thúc vào ngày 15/10/24. Để tiếp tục sử dụng gói mà không bị gián đoạn vui lòng đăng ký trước hạn.',
                    features: [
                        'Nghe nhạc không quảng cáo',
                        'Kho nhạc Premium',
                        'Chất lượng âm thanh tốt nhất',
                        'Tải xuống để nghe offline',
                        'Đồng bộ hóa tất cả các bài hát'
                    ],
                    isRegistered: true,
                    buttonText: 'Đăng Ký Ngay'
                }
            ];
            setSubscriptions(data);
        };

        fetchData();
    }, []);

    return (
        <div className='bg-gray-900 min-h-screen flex justify-center items-center py-5'>
            {/* Check if there are subscriptions */}
            {subscriptions.length > 0 ? (
                // Purchase history table
                <div className='overflow-x-auto max-w-[808px] mb-[550px]'>
                 

                    <div className='flex flex-col items-center gap-8 max-w-screen-lg'>
                        {subscriptions
                            .filter(subscription => subscription.isRegistered)
                            .map(subscription => (
                                <div
                                    key={subscription.id}
                                    className='rounded-xl overflow-hidden shadow-lg w-[780px] text-white'
                                    style={{ minHeight: '400px' }}
                                >
                                    <div
                                        className={`${subscription.color} p-6 h-[193px] flex items-center`}
                                    >
                                        <h2 className='text-4xl font-bold'>
                                            {subscription.name}
                                        </h2>
                                    </div>

                                    <div className='bg-zinc-800 p-6 flex flex-row justify-between h-[225px] '>
                                        <ul className='mb-6 space-y-2 w-1/2 float-start'>
                                            {subscription.features.map(
                                                (feature, i) => (
                                                    <li
                                                        key={i}
                                                        className='flex items-start space-x-2 '
                                                    >
                                                        <svg
                                                            className='w-4 h-4 text-green-500 mt-1'
                                                            fill='currentColor'
                                                            viewBox='0 0 20 20'
                                                        >
                                                            <path d='M10 18a8 8 0 100-16 8 8 0 000 16zm3-10l-4 4-1-1-2-2 1-1 2 2 3-3 1 1z' />
                                                        </svg>
                                                        <span>{feature}</span>
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                        <div className='flex flex-col justify-between w-1/2'>
                                            <div className='text-xl font-bold'>
                                                {subscription.price}
                                            </div>
                                            {subscription.notification && (
                                                <div className='bg-gray-700 text-gray-300 p-4 rounded-lg mb-4 text-sm w-[324px] h-[108px]'>
                                                    {subscription.notification}
                                                </div>
                                            )}
                                            <button className='w-[128px] px-2 py-2 text-sm font-semibold rounded-full bg-zinc-800 hover:bg-pink-600 transition-colors border border-[#FF0065]'>
                                                {subscription.buttonText}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                // No purchases case
                <div className='bg-zinc-800 text-gray-300 p-4 rounded-lg flex items-center mb-[700px]'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        className='w-6 h-6 mr-2 text-gray-400'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13 16h-1v-4h-1m0-4h.01M12 20h.01M12 4h.01'
                        />
                    </svg>
                    <span>
                        Bạn không có khoản thanh toán hoặc khoản hoàn tiền nào
                        trong 2 năm qua.
                    </span>
                </div>
            )}
        </div>
    );
}

export default ManagePayment;
