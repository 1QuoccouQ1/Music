import { Link } from "react-router-dom";

function PayFail() {
    localStorage.removeItem('payment');
    
    return ( <>
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 tracking-wide">
        <h1 className="text-2xl md:text-3xl text-center mb-8 font-medium" >
        Xin Lỗi Giao Dịch Của Bạn Đã Thất Bại !!!
        </h1>
        <div className="relative">
          <div className=" size-48 rounded-full bg-red-500 border-[20px] border-red-600/70  flex items-center justify-center">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          </div>
          <div className="absolute -inset-1 rounded-full bg-red-700  -z-10"></div>
        </div>
        <p className="mt-8 text-center text-slate-500  ">
        Có vẻ như giao dịch của bạn đã gặp sự cố vui lòng thử lại.
        </p>
        
        <Link to={'/Upgrade'} className="text-center mt-12 bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-85 w-4/5 md:w-[50%] text-white px-8 py-3 rounded-full transition duration-300 ease-in-out">
        Thử Lại
        </Link>
      </div>
    </> );
}

export default PayFail;