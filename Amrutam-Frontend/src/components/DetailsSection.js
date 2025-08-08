import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';

export const DetailsSection = ({ title, children, onEdit, onUpdateStatus }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 relative">
            <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <MoreVertical size={20} />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-10">
                            <button onClick={() => { onEdit(); setMenuOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <Edit size={14} className="mr-2" /> Edit
                            </button>
                            <button onClick={() => { onUpdateStatus(); setMenuOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                <Trash2 size={14} className="mr-2" /> Inactive
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
};