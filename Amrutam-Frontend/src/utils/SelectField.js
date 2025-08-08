import React from 'react';

export const SelectField = ({ label, value, onChange, options = [], error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select 
      value={value} 
      onChange={onChange} 
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm bg-white ${error ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
    >
      <option value="">Select</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);
