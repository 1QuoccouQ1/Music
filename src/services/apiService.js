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

export const getArtist =  fetchAPI('/ca-si');



// Lấy dữ liệu categories
export const getCategories = () => fetchAPI('/categories');
// Tạo một category mới
export const createCategory = (category) => fetchAPI('/categories', 'POST', category);




// Lấy dữ liệu user
export const getUsers = () => fetchAPI('/users/user');
//Tìm user theo id
export const findUser = (id) => fetchAPI('/users/Finduser', 'POST',{id});
// Cập nhật user
export const updateUser = (id,userData) => fetchAPI('/users/UpdateUser', 'PUT',{id,...userData});
// Delete User
export const DelUser = (id) => fetchAPI('/users/DeleteUser', 'DELETE',{id});



// Check token
export const AuthToken = (token) => fetchAPI('/users/AuthToken', 'POST', {token});
