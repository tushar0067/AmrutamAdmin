import {useState} from 'react';
import { User, LogOut } from 'lucide-react';
export const Header = ({ currentPage, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const title = currentPage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <div className="relative">
          <div 
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
              <button 
                onClick={onLogout} 
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
