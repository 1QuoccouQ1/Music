import React, { createContext, useState , useEffect } from 'react';

// Tạo Context
export const UserContext = createContext();

// Tạo Provider để cung cấp giá trị cho Context
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Lấy user từ localStorage nếu có
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Mỗi khi user thay đổi, lưu nó vào localStorage
    useEffect(() => {
        if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        } else {
        localStorage.removeItem('user');
        }
    }, [user]);
    // console.log(user);

//   const isProfile = user ? true : false;
//   console.log(isProfile);

  return (
    <UserContext.Provider value={{ user, setUser   }}>
      {children}
    </UserContext.Provider>
  );
};
