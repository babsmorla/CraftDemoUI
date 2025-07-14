import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const [accountType, setAccountType] = useState('artisan');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    
    try {
      setError('');
      setLoading(true);
      await signup({ accountType, name, email, phone });
      navigate(accountType === 'artisan' ? '/artisan' : '/');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
      <div className="auth-container w-full max-w-md">
        <div className="auth-header">
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <p>Join CraftConnect as a homeowner or artisan</p>
        </div>
        <div className="auth-form bg-white p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  className={`border rounded-lg py-3 text-center ${
                    accountType === 'homeowner' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setAccountType('homeowner')}
                >
                  <i className={`fas fa-home text-2xl mb-2 ${
                    accountType === 'homeowner' ? 'text-blue-600' : 'text-gray-600'
                  }`}></i>
                  <p>Homeowner</p>
                </button>
                <button 
                  type="button"
                  className={`border rounded-lg py-3 text-center ${
                    accountType === 'artisan' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setAccountType('artisan')}
                >
                  <i className={`fas fa-tools text-2xl mb-2 ${
                    accountType === 'artisan' ? 'text-blue-600' : 'text-gray-600'
                  }`}></i>
                  <p>Artisan</p>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input 
                type="checkbox" 
                id="terms" 
                className="mr-2" 
                required 
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I agree to the <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>
              </label>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-600">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;