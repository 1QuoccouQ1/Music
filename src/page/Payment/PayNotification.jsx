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
    const payment = JSON.parse(localStorage.getItem('payment'));
    
    // console.log(datasub);
    if(!payment){
        return <PayError/>;
      }
    const datasub = `user_type=${payment.type}&month=${payment.month}&`;
    useEffect(() => {
        let isMounted = true; // Đảm bảo component vẫn được mount
        const queryParams = new URLSearchParams(window.location.search);
        
        const checkPayment = async () => {
            try {
                const response = await fetch(API_URL + `/vnpay-return?` + datasub + queryParams.toString(), {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                });
                const data = await response.json();
    
                if (isMounted) { // Chỉ thực thi khi component chưa bị unmount
                    if (data.success) {
                        toast.success(data.message, { toastId: 'success-toast' }); // Sử dụng toastId để tránh trùng lặp
                        setnotifi(true);
                        localStorage.setItem('user', JSON.stringify(data.user));
    
                        const currentUrl = new URL(window.location);
                        currentUrl.search = ''; 
                        window.history.replaceState(null, '', currentUrl.toString());
                    } else {
                        toast.error(data.message, { toastId: 'error-toast' }); // Sử dụng toastId
                        setnotifi(false);
    
                        const currentUrl = new URL(window.location);
                        currentUrl.search = ''; 
                        window.history.replaceState(null, '', currentUrl.toString());
                    }
                }
            } catch (err) {
                console.log(err.message);
            } finally {
                if (isMounted) setLoading(false); 
            }
        };
        checkPayment();
    
        return () => {
            isMounted = false; // Cleanup effect
        };
    }, []);
    

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : notifi ? (
                <PaySuccess type={payment.type}/>
            ) : (
                <PayFail />
            )}
            
        </>
    );
}
export default PayNotification;