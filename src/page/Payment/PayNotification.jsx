import PaySuccess from "./PaySuccess";
import PayError from "./PayError";
import PayFail from "./PayFail";
import { useEffect } from 'react';
import { API_URL } from "../../services/apiService";
import {  toast } from 'react-toastify';
import { useState } from 'react';


function PayNotification() {
    const [notifi,setnotifi] = useState(true);
    const [loading, setLoading] = useState(true); // Hiển thị spinner khi đang chờ API
    const user_type = localStorage.getItem('payment');
    const month = localStorage.getItem('month');
    const datasub = `user_type=${user_type}&month=${month}&`;
    // console.log(datasub);


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        // console.log(queryParams.toString());
        // Gửi dữ liệu trả về từ VNPAY đến backend để xác minh
        const checkPayment = async () => {
            try {
                const response = await fetch(API_URL +`/vnpay-return?`+datasub + queryParams.toString(), {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                });
                const data = await response.json();

                if (data.success) {
                    // console.log(data);
                    toast.success(data.message);
                    setnotifi(true)
                    localStorage.removeItem('payment');
                    localStorage.removeItem('month');
                    localStorage.setItem('user',JSON.stringify(data.user));

                    // Cập nhật URL, xóa tất cả các tham số sau dấu "?"
                    const currentUrl = new URL(window.location);
                    currentUrl.search = ''; // Xóa tất cả query string

                    // Cập nhật lại URL mà không reload
                    window.history.replaceState(null, '', currentUrl.toString());
                } else{
                    toast.error(data.message);
                    setnotifi(false)
                }
            } catch (err) {
                console.log(err.message); // Cập nhật state lỗi
            } finally {
                setLoading(false); // Tắt spinner
            }
        }
        checkPayment();
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : notifi ? (
                <PaySuccess />
            ) : (
                <PayFail />
            )}
            
        </>
    );
}
export default PayNotification;