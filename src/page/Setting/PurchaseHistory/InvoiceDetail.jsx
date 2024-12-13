import React from 'react';
import { NavLink } from 'react-router-dom';

const InvoiceDetail = ({ isOpen, onClose, purchaseDetail }) => {
    if (!isOpen) return null;
    const formatCurrencyVND = amount => {
        if (isNaN(amount)) {
            return null; // Trả về null nếu không phải số
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transform transition duration-300 ease-in-out 
                ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}   `}
        >
            <div className='bg-gray-900 text-white p-8 rounded-lg max-w-[807px] w-full'>
                <h1 className='text-3xl font-bold mb-8'>Hóa đơn chi tiết</h1>

                <table className='w-full text-sm text-left text-gray-300'>
                    <tbody>
                        <tr className='border-b border-gray-700'>
                            <td className='py-4 font-medium'>Ngày</td>
                            <td className='py-4 pl-10'>
                                {purchaseDetail.payment_date}
                            </td>
                        </tr>
                        <tr className='border-b border-gray-700'>
                            <td className='py-4 font-medium'>Số đơn hàng</td>
                            <td className='py-4 pl-10'>
                                {purchaseDetail.pay_id}
                            </td>
                        </tr>
                        <tr className='border-b border-gray-700'>
                            <td className='py-4 font-medium'>
                                Phương thức thanh toán
                            </td>
                            <td className='py-4 pl-10'>
                                {purchaseDetail.payment_method}
                            </td>
                        </tr>
                        <tr className='border-b border-gray-700'>
                            <td className='py-4 font-medium'>Nhà bán lẻ</td>
                            <td className='py-4 pl-10'>SOUNDWAVE VIETNAM</td>
                        </tr>

                        <tr className='border-b border-gray-700'>
                            <td className='py-4 font-medium'>Sản phẩm</td>
                            <td className='py-4 pl-10'>
                                {purchaseDetail.description}
                            </td>
                        </tr>

                        <tr className='border-b border-gray-700'>
                            <td className='py-4 font-medium'>Tổng</td>
                            <td className='py-4 text-lg font-bold pl-10'>
                                {formatCurrencyVND(purchaseDetail.amount)}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className='text-gray-400 text-sm mt-6'>
                    Bằng cách tiến hành mua, bạn cho phép SoundWave tính giá nếu
                    trên cho khoảng thời gian bạn đã chọn. Bạn đồng ý rằng bạn
                    có quyền rút lại lệnh mua và yêu cầu hoàn tiền trong vòng 14
                    ngày sau khi mua gói, nhưng sẽ mất quyền này nếu dùng
                    SoundWave trong thời gian đó.
                </p>

                <div className='flex justify-end mt-10'>
                    <div className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg mr-4'>
                        <button
                            className='text-white hover:text-gray-800'
                            onClick={onClose}
                        >
                            Đóng hóa đơn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetail;
