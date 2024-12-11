import { useNavigate } from "react-router-dom";

function PaySuccess() {
  const payment = JSON.parse(localStorage.getItem('payment'));
  const navigate = useNavigate();
  const handleHome = () => {
    localStorage.removeItem('payment');
    navigate('/');
  }
  

  return (<div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 tracking-wide">
    <h1 className="text-2xl md:text-3xl text-center mb-8 font-medium" >
      Chúc Mừng Giao Dịch Của Bạn Đã Thành Công
    </h1>
    <div className="relative">
      <div className=" size-48 rounded-full bg-green-500 border-[20px] border-green-600/70  flex items-center justify-center">
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div className="absolute -inset-1 rounded-full bg-green-700  -z-10"></div>
    </div>
    <p className="mt-8 text-center text-slate-500  ">
      Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
    </p>
    <p className="mt-2 text-center text-slate-500">
      Chúc bạn có những trải nghiệm{" "}
      <span className="text-red-600 ">SoundWave {payment ? payment.type : 'Basic'}</span> tốt nhất
    </p>
    <button onClick={handleHome} className="mt-12 bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-85 min-w-[600px] text-white px-8 py-3 rounded-full transition duration-300 ease-in-out">
      Trở về Trang Chủ
    </button>
  </div>);
}

export default PaySuccess;