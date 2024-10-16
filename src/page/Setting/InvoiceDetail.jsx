import React from 'react';

const InvoiceDetail = () => {
  const invoice = {
    date: '25/11/2025',
    orderNumber: '243454131231251010-1-1',
    paymentMethod: 'MoMo',
    seller: 'SoundWave CD',
    address: '111 Nguyễn Huy Tưởng, Hòa An, Liên Chiểu, Đà Nẵng',
    vatId: '100000137',
    product: 'SoundWave Plus',
    subtotal: '500đ',
    tax: '500đ',
    total: '19.000đ',
    note: 'Gói dịch vụ SoundWave Plus với nhiều tính năng nâng cấp cao cấp giúp người dùng trải nghiệm âm nhạc không giới hạn. Gói dịch vụ này có thể hoàn trả nếu được yêu cầu trong vòng 14 ngày kể từ ngày thanh toán. Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với bộ phận hỗ trợ khách hàng.',
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-gray-300">
      <h1 className="text-3xl font-semibold text-white mb-6">Hóa đơn chi tiết</h1>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <p><strong>Ngày:</strong> {invoice.date}</p>
          <p><strong>Số đơn hàng đặt:</strong> {invoice.orderNumber}</p>
          <p><strong>Phương thức thanh toán:</strong> {invoice.paymentMethod}</p>
        </div>

        <div className="mb-4">
          <p><strong>Nhà bán lẻ:</strong> {invoice.seller}</p>
          <p><strong>Địa chỉ:</strong> {invoice.address}</p>
          <p><strong>VAT ID:</strong> {invoice.vatId}</p>
        </div>

        <div className="mb-4">
          <p><strong>Sản Phẩm:</strong> {invoice.product}</p>
          <p><strong>Giá trước thuế (GTGT 5%):</strong> {invoice.subtotal}</p>
          <p><strong>Tổng thuế:</strong> {invoice.tax}</p>
          <p><strong>Tổng cộng:</strong> {invoice.total}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-400">{invoice.note}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
            <a href="/PurchaseHistoryPage"> Quay Lại</a>
          </button>
          <button className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded">
            In hóa đơn
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
