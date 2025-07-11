// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate authentication check
//     const user = localStorage.getItem('craftconnect_user');
//     if (user) {
//       setCurrentUser(JSON.parse(user));
//     }
//     setLoading(false);
//   }, []);

//   const login = (email, password) => {
//     // Simulate login
//     const user = { 
//       id: '1', 
//       email, 
//       name: 'Kwame Mensah', 
//       role: 'artisan',
//       photoURL: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
//     };
//     localStorage.setItem('craftconnect_user', JSON.stringify(user));
//     setCurrentUser(user);
//     return Promise.resolve(user);
//   };

//   const signup = (userData) => {
//     // Simulate signup
//     const user = { 
//       id: '2', 
//       email: userData.email, 
//       name: userData.name, 
//       role: userData.accountType,
//       photoURL: null
//     };
//     localStorage.setItem('craftconnect_user', JSON.stringify(user));
//     setCurrentUser(user);
//     return Promise.resolve(user);
//   };

//   const logout = () => {
//     localStorage.removeItem('craftconnect_user');
//     setCurrentUser(null);
//     return Promise.resolve();
//   };

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }