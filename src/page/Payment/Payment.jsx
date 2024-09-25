import React, { useState } from 'react';
import QrCode2Icon from '@mui/icons-material/QrCode2';

function Payment() {
    // Tạo state để lưu trữ phương thức thanh toán được chọn
    const [selectedMethod, setSelectedMethod] = useState('');

    // Hàm xử lý khi người dùng chọn phương thức thanh toán
    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-medium mb-4">Phương thức thanh toán</h2>
                        <div className="space-y-4">

                            {/* Ví Momo */}
                            <div
                                className={`border ${selectedMethod === 'momo' ? 'border-red-600' : 'border-gray-700'} rounded-lg p-4 flex items-center justify-between cursor-pointer`}
                                onClick={() => handleSelectMethod('momo')}
                            >
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full ${selectedMethod === 'momo' ? 'bg-red-600' : 'border border-gray-400'} mr-3`}></div>
                                    <span>Ví Momo</span>
                                </div>
                                <img src="https://th.bing.com/th/id/OIP.1GNvjAZu4hlbE0bWflshGwHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7" alt="momo" className="w-8 h-8 rounded-md" />
                            </div>

                            {/* QR Code */}
                            <div
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
                                <img className="w-48 h-48 bg-white" src='https://th.bing.com/th/id/OIP.SzaQ2zk5Q5EsnORQ_zpvGAHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7'/>
                            </div>
                            <p className="text-center text-sm text-gray-400 mb-6">
                                Mã QR chỉ có hiệu lực cho lần thanh toán này. Hết hạn sau: 09:59
                            </p>
                            </>
                        )}
                            

                            {/* Thẻ tín dụng hoặc thẻ ghi nợ */}
                            <div
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
                            </div>
                        </div>

                        {/* Thông tin thanh toán */}
                        <p className="text-sm text-gray-400 mt-4">
                            Thông tin thanh toán được mã hóa và bảo mật bởi Đối. Tác thanh toán được Ngân hàng Nhà nước cấp phép.
                        </p>
                        {selectedMethod === 'credit' && (
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
                        )}
                        <div className="flex items-center mt-4">
                            <input type="checkbox" id="terms" className="mr-2" />
                            <label htmlFor="terms" className="text-sm text-slate-500">
                                Khi tiếp tục thanh toán, bạn đồng ý với thỏa thuận sử dụng dịch vụ
                            </label>
                        </div>
                        <button className="w-full bg-gradient-to-r from-[#FF553E] to-[#FF0065] text-white py-3 rounded-full mt-6">
                            Tiếp tục thanh toán
                        </button>
                        <button className="w-full text-center text-gray-400 mt-4">
                            Hủy giao dịch
                        </button>
                    </div>

                    {/* Chi tiết giao dịch */}
                    <div className="w-full md:w-1/2 bg-[#0C1B2C] p-10">
                        <h2 className="text-2xl font-medium mb-4">Chi tiết giao dịch</h2>
                        <div className="flex justify-between items-center mb-6 bg-medium p-3 rounded-md">
                            <span>Tài khoản mua dịch vụ</span>
                            <div className="flex items-center">
                                <span className="mr-2">Nguyễn Đỗ Thanh Nguyên</span>
                                <img className="size-12 bg-gray-300 rounded-full" src='../imgs/Ellipse 5.png' />
                            </div>
                        </div>
                        <div className="pt-4 bg-medium p-3 rounded-t-md">
                            <h3 className="font-semibold mb-2">Sản Phẩm</h3>
                            <div className="flex justify-between mb-1">
                                <span>SoundWave Plus - 12 tháng</span>
                                <span>149,000đ</span>
                            </div>
                            <div className="text-sm text-gray-400">
                                Kỳ thanh toán tiếp theo: 23/09/2025
                            </div>
                        </div>
                        <div className="border-t border-gray-700 min-h-36 pt-8 bg-medium p-3 rounded-b-md">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Tổng tiền</span>
                                <span className="text-2xl font-bold">149,000đ</span>
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
