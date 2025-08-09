import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

// Assuming you have a login image in your assets
const loginBg = new URL("../Assets/loginImage.jpg", import.meta.url).href;

// Using a placeholder for compatibility
// const loginBg = 'https://i.imgur.com/3df90f.png';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
     setError(''); // Clear previous errors

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // In a real app, you would save this token (e.g., in localStorage)
        console.log('Received token:', data.token); 
        onLogin(data.token);

    } catch (err) {
        setError(err.message);
    }
    
  };

  return (
    <div 
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="w-full max-w-sm p-8 space-y-8 bg-gray-800 bg-opacity-75 rounded-xl shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center border-4 border-gray-700">
                <User className="w-10 h-10 text-white" />
            </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600 bg-gray-700 border-gray-600 rounded" />
                <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:text-green-400">Forgot Password?</a>
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};