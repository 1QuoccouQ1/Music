import React, { useEffect, useState } from 'react';
import InvoiceDetail from './InvoiceDetail';

const PurchaseHistoryPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatCurrencyVND = (amount) => {
        if (isNaN(amount)) {
            return null; // Trả về null nếu không phải số
        }
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    const openModal = (purchase) => {
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
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
          );
    }
    



    return (
        <div className='bg-gray-900 min-h-screen flex justify-center py-5 ' >
            {/* {isModalOpen && ( */}
                <InvoiceDetail
                 isOpen={isModalOpen}
                 onClose={closeModal}
                 purchaseDetail={selectedPurchase}
             />
            {/* )} */}
            {purchases.length > 0 ? (
                <div className='overflow-x-auto max-w-[1000px]'>
                    <table className='min-w-full table-auto text-left text-gray-300 text-[14px]'>
                        <thead>
                            <tr className='border-b border-gray-700'>
                                <th className='px-5 py-3'>Ngày thanh toán</th>
                                <th className='px-5 py-3'>Mô tả</th>
                                <th className='px-5 py-3'>Số tiền</th>
                                <th className='px-5 py-3 text-center'>Trạng thái</th>
                                <th className='px-5 py-3'>Biên nhận</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase, index) => (
                                <tr
                                    key={index}
                                    className='border-b border-gray-800'
                                >
                                    <td className='px-6 py-4'>
                                        {purchase.payment_date}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {purchase.description}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {formatCurrencyVND(purchase.amount)}
                                    </td>
                                    <td className='px-6 py-4 w-48 text-center'>
                                        <span
                                            className={`text-sm ${
                                                purchase.payment_status ===
                                                'Thành công'
                                                    ? 'text-white bg-green-600 rounded-full p-2 w-full '
                                                    : purchase.payment_status ===
                                                      'Thất bại'
                                                    ? 'text-white bg-rose-800 rounded-full p-2 w-full'
                                                    : 'text-white bg-yellow-400 rounded-full p-2 w-full'
                                            }`}
                                        >
                                            {purchase.payment_status}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <button
                                           
                                            className='text-blue-400 hover:underline'
                                            onClick={() => openModal(purchase)}
                                        >
                                            Xem hóa đơn chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
