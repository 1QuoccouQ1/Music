export const API_URL = 'https://admin.soundwave.io.vn/api';

async function fetchAPI(endpoint, method = 'GET', body = null) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });
    return response.json();
}
// Đăng ký và đăng nhập
export const registerUser = (user) => fetchAPI('/users/register', 'POST', user);
export const loginUser = (user) => fetchAPI('/users/login', 'POST', user);


export const getMusics = () => fetchAPI('/rand-10');
export const getArtist = () => fetchAPI('/ca-si');
