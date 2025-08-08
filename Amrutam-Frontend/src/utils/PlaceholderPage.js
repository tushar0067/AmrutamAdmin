import React from 'react';
import { Construction } from 'lucide-react';  

export const PlaceholderPage = ({ title, icon: Icon }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center text-gray-500">
      <Icon className="w-16 h-16 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p>This page is under construction.</p>
    </div>
  </div>
);
