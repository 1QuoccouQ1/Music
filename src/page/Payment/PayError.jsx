function PayError() {
    return ( <>
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 tracking-wide">
        <h1 className="text-2xl md:text-3xl text-center mb-8 font-medium" >
        Không Tải Được Trang
        </h1>
        <div className="relative">
          <div className=" size-48 rounded-full bg-yellow-500 border-[20px] border-yellow-600/70  flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          </div>
          <div className="absolute -inset-1 rounded-full bg-yellow-700  -z-10"></div>
        </div>
        <p className="mt-8 text-center text-slate-500  ">
        Đường dẫn không hợp lệ hoặc hết hạn.
        </p>
        
        <button className="mt-12 bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-85 min-w-[600px] text-white px-8 py-3 rounded-full transition duration-300 ease-in-out">
        Về Trang Dịch Vụ
        </button>
      </div>
    </>  );
}

export default PayError;