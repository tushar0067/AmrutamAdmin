import React from 'react';

export const InputField = ({ label, name, value, onChange, placeholder, containerClassName="", error }) => (
  <div className={containerClassName}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
    <input 
      type="text" 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${error ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-green-500'}`} 
    />
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);


