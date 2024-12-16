import React, { useEffect, useState } from 'react';
import InvoiceDetail from './InvoiceDetail';

const PurchaseHistoryPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatCurrencyVND = amount => {
        if (isNaN(amount)) {
            return null; // Trả về null nếu không phải số
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };
    const openModal = purchase => {
        setSelectedPurchase(purchase);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPurchase(null);
    };

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('user'))?.id;
                const token = localStorage.getItem('access_token');

                if (!userId || !token) {
                    throw new Error(
                        'Authentication details are missing. Please log in again.'
                    );
                }

                const response = await fetch(
                    `https://admin.soundwave.io.vn/api/${userId}/history`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch purchase history: ${response.statusText}`
                    );
                }

                const data = await response.json();
                setPurchases(data);
                // console.log(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseHistory();
    }, []);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid'></div>
            </div>
        );
    }

    return (
        <div className='bg-gray-900 min-h-screen flex justify-center py-5'>
            <InvoiceDetail
                isOpen={isModalOpen}
                onClose={closeModal}
                purchaseDetail={selectedPurchase}
            />
            {purchases.length > 0 ? (
                <div className='overflow-x-auto w-full max-w-[1400px] px-4 lg:px-10'>
                    <div className='flex flex-col text-gray-300 text-[14px]'>
                        {/* Header */}
                        <div className='hidden md:flex justify-between border-b border-gray-700 px-5 py-3 mb-2'>
                            <div className='w-1/5 px-2 min-w-[150px]'>
                                Ngày thanh toán
                            </div>
                            <div className='w-2/5 min-w-[300px]'>Mô tả</div>
                            <div className='w-1/5 min-w-[150px]'>Số tiền</div>
                            <div className='w-1/5 text-center min-w-[180px]'>
                                Trạng thái
                            </div>
                            <div className='w-1/5 min-w-[180px]'>Biên nhận</div>
                        </div>

                        {/* Body */}
                        <div className='flex flex-col space-y-4'>
                            {purchases.map((purchase, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col md:flex-row md:justify-between bg-gray-900 p-4 rounded-lg shadow border border-gray-900 hover:border-gray-700 transition duration-200'
                                >
                                    {/* Row for small screens */}
                                    <div className='flex md:hidden flex-col space-y-2 mb-4'>
                                        <div>
                                            <span className='font-bold text-gray-400'>
                                                Ngày thanh toán:
                                            </span>{' '}
                                            {purchase.payment_date}
                                        </div>
                                        <div>
                                            <span className='font-bold text-gray-400'>
                                                Mô tả:
                                            </span>{' '}
                                            {purchase.description}
                                        </div>
                                        <div>
                                            <span className='font-bold text-gray-400'>
                                                Số tiền:
                                            </span>{' '}
                                            {formatCurrencyVND(purchase.amount)}
                                        </div>
                                        <div>
                                            <span className='font-bold text-gray-400'>
                                                Trạng thái:
                                            </span>{' '}
                                            <span
                                                className={`text-sm ${purchase.payment_status ===
                                                        'Thành công'
                                                        ? 'text-white bg-green-600 rounded-full p-1 px-2'
                                                        : purchase.payment_status ===
                                                            'Thất bại'
                                                            ? 'text-white bg-rose-800 rounded-full p-1 px-2'
                                                            : 'text-white bg-yellow-400 rounded-full p-1 px-2'
                                                    }`}
                                            >
                                                {purchase.payment_status}
                                            </span>
                                        </div>
                                        <div>
                                            <span className='font-bold text-gray-400'>
                                                Biên nhận:
                                            </span>{' '}
                                            <button
                                                className='text-blue-400 hover:underline'
                                                onClick={() =>
                                                    openModal(purchase)
                                                }
                                            >
                                                Xem hóa đơn chi tiết
                                            </button>
                                        </div>
                                    </div>

                                    {/* Row for tablet/desktop screens */}
                                    <div className='hidden md:flex w-1/5 items-center min-w-[150px]'>
                                        {purchase.payment_date}
                                    </div>
                                    <div className='hidden md:flex w-2/5 items-center min-w-[300px]'>
                                        {purchase.description}
                                    </div>
                                    <div className='hidden md:flex w-1/5 items-center min-w-[150px]'>
                                        {formatCurrencyVND(purchase.amount)}
                                    </div>
                                    <div className='hidden md:flex w-1/5 items-center justify-center min-w-[180px]'>
                                        <span
                                            className={`text-sm ${purchase.payment_status ===
                                                    'Thành công'
                                                    ? 'text-white bg-green-600 rounded-full p-1 px-2'
                                                    : purchase.payment_status ===
                                                        'Thất bại'
                                                        ? 'text-white bg-rose-800 rounded-full p-1 px-2'
                                                        : 'text-white bg-yellow-400 rounded-full p-1 px-2'
                                                }`}
                                        >
                                            {purchase.payment_status}
                                        </span>
                                    </div>
                                    <div className='hidden md:flex w-1/5 items-center min-w-[180px]'>
                                        <button
                                            className='text-blue-400 hover:underline'
                                            onClick={() => openModal(purchase)}
                                        >
                                            Xem hóa đơn chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='bg-zinc-800 text-gray-300 p-4 rounded-lg flex items-center'>
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
                        trong thời gian qua.
                    </span>
                </div>
            )}
        </div>
    );
};

export default PurchaseHistoryPage;
