import React, { useState } from 'react';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { API_URL } from '../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';

function Payment() {
    const user = JSON.parse(localStorage.getItem('user'));
    const payment = JSON.parse(localStorage.getItem('payment'));
    // Tạo state để lưu trữ phương thức thanh toán được chọn
    const [selectedMethod, setSelectedMethod] = useState('');

    // Hàm xử lý khi người dùng chọn phương thức thanh toán
    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
    };
    const handlePayment = () =>{
        if(!user){
            toast.error('Vui lòng đăng nhập để thanh toán.');
            return false;
        }
        fetch(API_URL + '/create-vnpay-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                user_id: user.id,
                payment_method: selectedMethod,
                amount: payment.price,
                description: payment.type,
                month: payment.month,
            })
        })
            .then(response => response.json())
            .then(data => {
                // Xử lý dữ liệu trả về từ API (nếu cần)
                console.log('Đã đánh dấu ', data);
                localStorage.setItem('payment',data.user_type);
                localStorage.setItem('month',data.month);
                // toast.success(data.message);
                window.location.href = data.data;
            })
            .catch(error => {
                // console.error('Lỗi khi gửi yêu cầu:', error);
                toast.error('Lỗi khi gửi yêu cầu:', error);
            });
    }

    const formatCurrencyVND = (amount) => {
        if (isNaN(amount)) {
            return null; // Trả về null nếu không phải số
        }
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    const calculateExpiryDate = (monthsToAdd) => {
        if (isNaN(monthsToAdd) || monthsToAdd < 0) {
            return null; // Trả về null nếu số tháng không hợp lệ
        }
    
        const today = new Date();
        const expiryDate = new Date(today.setMonth(today.getMonth() + monthsToAdd));
    
        // Định dạng ngày theo kiểu dd/mm/yyyy
        const day = expiryDate.getDate().toString().padStart(2, '0'); // Đảm bảo ngày luôn có 2 chữ số
        const month = (expiryDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = expiryDate.getFullYear();
    
        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-medium mb-4">Phương thức thanh toán</h2>
                        <div className="space-y-4">

                            {/* Ví Momo */}
                            <div
                                className={`border ${selectedMethod === 'MOMO' ? 'border-red-600' : 'border-gray-700'} rounded-lg p-4 flex items-center justify-between cursor-pointer`}
                                onClick={() => handleSelectMethod('MOMO')}
                            >
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full ${selectedMethod === 'MOMO' ? 'bg-red-600' : 'border border-gray-400'} mr-3`}></div>
                                    <span>Ví Momo</span>
                                </div>
                                <img src="https://th.bing.com/th/id/OIP.1GNvjAZu4hlbE0bWflshGwHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7" alt="momo" className="w-8 h-8 rounded-md" />
                            </div>
                            {/* VNPAY */}
                            <div
                                className={`border ${selectedMethod === 'VNPAY' ? 'border-red-600' : 'border-gray-700'} rounded-lg p-4 flex items-center justify-between cursor-pointer`}
                                onClick={() => handleSelectMethod('VNPAY')}
                            >
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full ${selectedMethod === 'VNPAY' ? 'bg-red-600' : 'border border-gray-400'} mr-3`}></div>
                                    <span>VNPAY</span>
                                </div>
                                <img src="https://stcd02265632633.cloud.edgevnpay.vn/website-vnpay-public/1920/2023/9/06ncktiwd6dc1694418196384.png" alt="vnpay" className="w-8 h-8 rounded-md" />
                            </div>

                            {/* QR Code */}
                            {/* <div
                                className={`border ${selectedMethod === 'qrcode' ? 'border-red-600' : 'border-gray-700'} rounded-lg p-4 flex items-center justify-between cursor-pointer`}
                                onClick={() => handleSelectMethod('qrcode')}
                            >
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full ${selectedMethod === 'qrcode' ? 'bg-red-600' : 'border border-gray-400'} mr-3`}></div>
                                    <span>QR Code</span>
                                </div>
                                <QrCode2Icon />
                            </div>
                            {selectedMethod === 'qrcode' && (
                                <>
                                    <p className="text-center text-lg mt-6 mb-4">Quét mã QR để thanh toán</p>
                                    <div className="flex justify-center mb-4">
                                        <img className="w-48 h-48 bg-white" src='https://th.bing.com/th/id/OIP.SzaQ2zk5Q5EsnORQ_zpvGAHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7' />
                                    </div>
                                    <p className="text-center text-sm text-gray-400 mb-6">
                                        Mã QR chỉ có hiệu lực cho lần thanh toán này. Hết hạn sau: 09:59
                                    </p>
                                </>
                            )} */}


                            {/* Thẻ tín dụng hoặc thẻ ghi nợ */}
                            {/* <div
                                className={`border ${selectedMethod === 'credit' ? 'border-red-600' : 'border-gray-700'} rounded-lg p-4 flex items-center justify-between cursor-pointer`}
                                onClick={() => handleSelectMethod('credit')}
                            >
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full ${selectedMethod === 'credit' ? 'bg-red-600' : 'border border-gray-400'} mr-3`}></div>
                                    <span>Thẻ tín dụng hoặc thẻ ghi nợ</span>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-8 h-5 bg-white rounded" style={{ backgroundImage: 'url(../imgs/amex.png)' }}></div>
                                    <div className="w-8 h-5 bg-white rounded" style={{ backgroundImage: 'url(../imgs/jcb.png)' }}></div>
                                    <div className="w-8 h-5 bg-white rounded" style={{ backgroundImage: 'url(../imgs/mastercard.png)' }}></div>
                                    <div className="w-8 h-5 bg-white rounded" style={{ backgroundImage: 'url(../imgs/visa.png)' }}></div>
                                </div>
                            </div> */}
                        </div>

                        {/* Thông tin thanh toán */}
                        <p className="text-sm text-gray-400 mt-4">
                            Thông tin thanh toán được mã hóa và bảo mật bởi Đối Tác. Thanh toán được Ngân hàng Nhà nước cấp phép.
                        </p>
                        {/* {selectedMethod === 'credit' && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-4">Vui lòng nhập thông tin của thẻ</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Họ và Tên chủ thẻ"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Số thẻ"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                                    />
                                    <div className="flex space-x-4">
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        )} */}
                        <div className="flex items-center mt-4">
                            <input type="checkbox" id="terms" className="mr-2" />
                            <label htmlFor="terms" className="text-sm text-slate-500">
                                Khi tiếp tục thanh toán, bạn đồng ý với thỏa thuận sử dụng dịch vụ
                            </label>
                        </div>
                        <button className="w-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] text-white py-3 rounded-full mt-6" onClick={handlePayment}>
                            Tiếp tục thanh toán
                        </button>
                        <button className="w-full text-center text-gray-400 mt-4">
                            Hủy giao dịch
                        </button>
                    </div>

                    {/* Chi tiết giao dịch */}
                    <div className="w-full md:w-1/2 bg-[#0C1B2C] p-10">
                        <h2 className="text-2xl font-medium mb-4">Chi tiết giao dịch</h2>
                        <div className=" mb-6 bg-medium p-3 rounded-md">
                            <p className='text-xl my-2'>Tài khoản mua dịch vụ</p>
                            <div className="flex justify-between items-center">
                                <span className="mr-2">{user.name}</span>
                                <img className="size-12 bg-gray-300 rounded-full" src={user.image} />
                            </div>
                        </div>
                        <div className="pt-4 bg-medium p-3 space-y-2 rounded-t-md">
                            <h3 className="font-semibold mb-2">Sản Phẩm</h3>
                            <div className="lg:flex space-y-2 lg:justify-between mb-1">
                                <p>SoundWave {payment.type} - {payment.month} tháng</p>
                                <p>{formatCurrencyVND(payment.price)}</p>
                            </div>
                            <div className="text-sm text-gray-400">
                                Kỳ thanh toán tiếp theo: {calculateExpiryDate(payment.month)}
                            </div>
                        </div>
                        <div className="border-t border-gray-700 space-y-2 min-h-36 pt-8 bg-medium p-3 rounded-b-md">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Tổng tiền</span>
                                <span className="text-2xl font-bold">{formatCurrencyVND(payment.price)}</span>
                            </div>
                            <div className="text-sm text-gray-400 text-right">
                                Đã bao gồm VAT và phí liên quan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;
