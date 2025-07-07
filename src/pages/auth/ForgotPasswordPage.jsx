import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setMessage('');
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Password reset instructions have been sent to your email');
    } catch (error) {
      setError('Failed to reset password');
    }
    
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
      <div className="auth-container w-full max-w-md">
        <div className="auth-header">
          <h2 className="text-2xl font-bold">Reset Your Password</h2>
          <p>Enter your email to receive reset instructions</p>
        </div>
        <div className="auth-form bg-white p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              <Link to="/login" className="text-blue-600">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;