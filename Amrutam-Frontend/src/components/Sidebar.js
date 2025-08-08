import React, { useState, useMemo } from 'react';
import { Home, UserCheck, Users, Calendar, Award, Package, Gift, HelpCircle, RefreshCw, Settings, Wallet, CreditCard } from 'lucide-react';
const logo1 = new URL("../Assets/logo2.png", import.meta.url).href;
const logo2 = new URL("../Assets/logo1.png", import.meta.url).href;
import { ChevronRight } from 'lucide-react';



export const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [openDropdown, setOpenDropdown] = useState('ingredients');

  const handlePageChange = (pageId) => {
      const parentId = pageId.split('-')[0];
      setOpenDropdown(parentId);
      setCurrentPage(pageId);
  };
  
  const handleParentClick = (itemId) => {
      setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  const sidebarItems = useMemo(() => [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'doctor', label: 'Doctor', icon: UserCheck },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointment', label: 'Appointment', icon: Calendar },
    { id: 'specialties', label: 'Specialties', icon: Award },
    { 
      id: 'ingredients', 
      label: 'Ingredients', 
      icon: Package, 
      subItems: [
        { id: 'ingredients-list', label: 'Ingredients List' },
        { id: 'add-ingredient', label: 'Add Ingredient' }
      ]
    },
    { id: 'coupons', label: 'Coupons', icon: Gift },
    { id: 'concerns', label: 'Concerns', icon: HelpCircle },
    { id: 'referral', label: 'Referral', icon: RefreshCw },
    { id: 'customization', label: 'Customization', icon: Settings },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'refund', label: 'Refund', icon: CreditCard }
  ], []);

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
        <img src={logo1} alt="Amrutam Logo" className="h-15 w-14 mx-2 cursor-pointer" onClick={() => setCurrentPage('dashboard')}  />
        <img src={logo2} alt="Amrutam Logo2" className="h-10 w-32 mx-2 cursor-pointer" onClick={() => setCurrentPage('dashboard')} />
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                openDropdown === item.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => item.subItems ? handleParentClick(item.id) : handlePageChange(item.id)}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.subItems && <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${openDropdown === item.id ? 'rotate-90' : ''}`} />}
            </div>
            {item.subItems && openDropdown === item.id && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.id}
                    className={`px-3 py-1 text-sm cursor-pointer rounded ${
                      currentPage === subItem.id ? 'text-green-600 font-semibold' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => handlePageChange(subItem.id)}
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};