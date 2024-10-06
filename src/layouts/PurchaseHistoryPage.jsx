import React from 'react';

function PurchaseHistoryPage() {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-white mb-6">Lịch sử mua hàng</h1>

        {/* Hộp thông báo không có lịch sử */}
        <div className="bg-gray-800 text-gray-300 p-4 rounded-lg flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mr-2 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M12 4h.01"
            />
          </svg>
          <span>Bạn không có khoản thanh toán hoặc khoản hoàn tiền nào trong 2 năm qua.</span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
