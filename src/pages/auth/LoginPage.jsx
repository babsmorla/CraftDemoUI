import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/artisan');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
      <div className="auth-container w-full max-w-md">
        <div className="auth-header">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p>Sign in to your CraftConnect account</p>
        </div>
        <div className="auth-form bg-white p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-blue-600 text-sm">Forgot Password?</Link>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">Remember me</label>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;