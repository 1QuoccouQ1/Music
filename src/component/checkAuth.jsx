import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AuthChecker() {
    const location = useLocation(); // Lấy thông tin route hiện tại
    const checkAuth = () => {
        const token = localStorage.getItem("access_token");
        const user = localStorage.getItem("user");

        if (token && user) {
            const decodedToken = decodeJwt(token);
            if (isTokenExpired(decodedToken)) {
                console.log("Token đã hết hạn, xóa dữ liệu...");
                localStorage.removeItem("user");
            }
        }
    }
    function isTokenExpired(decodedToken) {
        const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)
        return decodedToken.exp < currentTime; // `exp` là thời gian hết hạn trong payload
    }
    function decodeJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Đảm bảo chuỗi base64 hợp lệ
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    useEffect(() => {
        checkAuth();
    }, [location]);

    return null;
}

export default AuthChecker;