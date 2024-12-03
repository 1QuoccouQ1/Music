import React from 'react';
import { NavLink } from 'react-router-dom';

const InvoiceDetail = () => {
    const invoiceData = {
        date: '25/11/2025',
        orderNumber: '25451458123156105-1-1',
        paymentMethod: 'MoMo',
        retailer: 'SoundWave CD',
        address: '111 Nguyễn Huy Tưởng, Hoà An, Liên Chiểu, Đà Nẵng',
        vatId: '1000000197',
        product: 'SoundWave Plus',
        vat: '500đ',
        taxTotal: '500đ',
        total: '19.000đ'
    };

    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center py-10">
            <div className="bg-gray-900 text-white p-8 rounded-lg max-w-[807px] w-full">
                <h1 className="text-3xl font-bold mb-8">Hóa đơn chi tiết</h1>

                <table className="w-full text-sm text-left text-gray-300">
                    <tbody>
                        {Object.entries(invoiceData).map(([key, value]) => (
                            <tr className="border-b border-gray-700" key={key}>
                                <td className="py-4 font-medium">{key === 'vat' ? 'GTGT (5%)' : key}</td>
                                <td className="py-4 pl-10">{value}</td>
                            </tr>
                        ))}
                        <tr className="border-b border-gray-700">
                            <td className="py-4 font-medium">Tổng</td>
                            <td className="py-4 text-lg font-bold pl-10">{invoiceData.total}</td>
                        </tr>
                    </tbody>
                </table>

                <p className="text-gray-400 text-sm mt-6">
                    Bằng cách tiến hành mua, bạn cho phép SoundWave tính giá nếu trên cho khoảng thời gian bạn đã chọn. Bạn đồng ý rằng bạn có quyền rút lại lệnh mua và yêu cầu hoàn tiền trong vòng 14 ngày sau khi mua gói, nhưng sẽ mất quyền này nếu dùng SoundWave trong thời gian đó.
                </p>

                <div className="flex justify-end mt-10">
                    <NavLink to="/PurchaseHistoryPage" className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg mr-4">
                        Quay lại
                    </NavLink>
                    <button className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:bg-pink-700 text-white py-2 px-9 rounded-lg">
                        In hóa đơn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetail;
