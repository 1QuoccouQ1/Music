import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const PurchaseHistoryPage = () => {
    // Dữ liệu mẫu về sản phẩm đã mua
    const purchases = [
        {
            id: 1,
            product: 'Gói Premium 1 năm',
            price: '1.200.000 VND',
            date: '25/07/2023',
            status: 'Chưa Thanh toán'
        },
        {
            id: 2,
            product: 'Gói Premium 6 tháng',
            price: '600.000 VND',
            date: '15/01/2023',
            status: 'Đã Thanh toán'
        },
        {
            id: 3,
            product: 'Gói Premium 1 tháng',
            price: '120.000 VND',
            date: '03/09/2022',
            status: 'Chưa Thanh toán'
        },
        {
            id: 4,
            product: 'Gói Premium 1 tháng',
            price: '120.000 VND',
            date: '03/09/2022',
            status: 'Đã Thanh toán'
        },
        ,
        {
            id: 4,
            product: 'Gói Premium 1 tháng',
            price: '120.000 VND',
            date: '03/09/2022',
            status: 'Đã Thanh toán'
        },
        {
            id: 1,
            product: 'Gói Premium 1 năm',
            price: '1.200.000 VND',
            date: '25/07/2023',
            status: 'Chưa Thanh toán'
        },
        {
            id: 2,
            product: 'Gói Premium 6 tháng',
            price: '600.000 VND',
            date: '15/01/2023',
            status: 'Đã Thanh toán'
        },
        {
            id: 3,
            product: 'Gói Premium 1 tháng',
            price: '120.000 VND',
            date: '03/09/2022',
            status: 'Chưa Thanh toán'
        },
        {
            id: 4,
            product: 'Gói Premium 1 tháng',
            price: '120.000 VND',
            date: '03/09/2022',
            status: 'Đã Thanh toán'
        },
        ,
        {
            id: 4,
            product: 'Gói Premium 1 tháng',
            price: '120.000 VND',
            date: '03/09/2022',
            status: 'Đã Thanh toán'
        },
        
    ];

    return (
        <div className='bg-gray-900 min-h-screen flex justify-center items-center py-5'>
            {/* Kiểm tra nếu có đơn hàng */}
            {purchases.length > 0 ? (
                // Bảng lịch sử mua hàng
                <div className='overflow-x-auto max-w-[808px] mb-[550px]'>
                  
                  

                    <table className='min-w-full table-auto text-left text-gray-300 text-[14px]'>
                        <thead>
                            <tr className='border-b border-gray-700'>
                                <th className='px-5 py-3'>Ngày thanh toán</th>
                                <th className='px-5 py-3'>Mô tả</th>
                                <th className='px-5 py-3'>Số tiền</th>
                                <th className='px-5 py-3'>Trạng thái</th>
                                <th className='px-5 py-3'>Biên nhận</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map(purchase => (
                                <tr
                                    key={purchase.id}
                                    className='border-b border-gray-800'
                                >
                                    <td className='px-6 py-4'>
                                        {purchase.date}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {purchase.product}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {purchase.price}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <p
                                            className={`text-sm ${
                                                purchase.status === 'Đã Thanh toán'
                                                    ? 'text-green-500' // Màu xanh cho trạng thái 'Hoàn tất'
                                                    : purchase.status ===
                                                      'Chưa Thanh toán'
                                                    ? 'text-red-500' // Màu đỏ cho trạng thái 'Thất Bại'
                                                    : 'text-yellow-500' // Màu vàng cho trạng thái 'Đang xử lý'
                                            }`}
                                        >
                                            {purchase.status}
                                        </p>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <a
                                            href='/InvoiceDetail'
                                            className='text-blue-400 hover:underline'
                                        >
                                            Xem hóa đơn chi tiết
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // Trường hợp không có đơn hàng
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
};

export default PurchaseHistoryPage;
