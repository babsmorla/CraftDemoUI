import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('craftconnect_user'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  /**
   * Login artisan using email and password from localStorage artisans
   */
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const artisans = JSON.parse(localStorage.getItem('craftconnect_artisans')) || [];
      const artisan = artisans.find(a => a.email === email && a.password === password);

      if (artisan) {
        setCurrentUser(artisan);
        localStorage.setItem('craftconnect_user', JSON.stringify(artisan));
        resolve(artisan);
      } else {
        reject(new Error('Invalid email or password'));
      }
    });
  };

  const signup = (userData) => {
    // If you want to store signups in artisans, add logic here
    setCurrentUser(userData);
    localStorage.setItem('craftconnect_user', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('craftconnect_user');
  };

  const createRequest = (request) => {
    const requests = JSON.parse(localStorage.getItem('craftconnect_requests')) || [];
    const newRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    const updatedRequests = [...requests, newRequest];
    localStorage.setItem('craftconnect_requests', JSON.stringify(updatedRequests));
    return newRequest;
  };

  const updateRequest = (requestId, updates) => {
    const requests = JSON.parse(localStorage.getItem('craftconnect_requests')) || [];
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, ...updates } : req
    );
    localStorage.setItem('craftconnect_requests', JSON.stringify(updatedRequests));
    return updatedRequests.find((req) => req.id === requestId);
  };

  const sendMessage = (message) => {
    const messages = JSON.parse(localStorage.getItem('craftconnect_messages')) || [];
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    const updatedMessages = [...messages, newMessage];
    localStorage.setItem('craftconnect_messages', JSON.stringify(updatedMessages));
    return newMessage;
  };

  const markMessagesAsRead = (requestId, userId) => {
    const messages = JSON.parse(localStorage.getItem('craftconnect_messages')) || [];
    const updatedMessages = messages.map((msg) =>
      msg.requestId === requestId && msg.receiverId === userId
        ? { ...msg, read: true }
        : msg
    );
    localStorage.setItem('craftconnect_messages', JSON.stringify(updatedMessages));
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    createRequest,
    updateRequest,
    sendMessage,
    markMessagesAsRead,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
