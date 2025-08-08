import React, { useState } from 'react';
import { Search, Plus, Download, Upload, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 5; // You can adjust this number

export const IngredientsListPage = ({ setCurrentPage, ingredients, onViewIngredient }) => {
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIngredients = ingredients.filter(ingredient => 
    ingredient && ingredient.name && ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentIngredients = filteredIngredients.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setActivePage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setActivePage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Ingredients List</h2>
            <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search here" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setActivePage(1); // Reset to first page on search
                }}
            />
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <button onClick={() => setCurrentPage('add-ingredient')} className="bg-green-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm hover:bg-green-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add</span>
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"><Download className="w-4 h-4" /></button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"><Upload className="w-4 h-4" /></button>
        </div>
      </div>
     <div className="overflow-x-auto">
  <table className="w-full table-fixed">
  <thead className="bg-gray-50">
    <tr>
      <th className="p-4 w-[25%] text-left text-xs font-semibold text-gray-600 uppercase">
        Ingredients
      </th>
      {/* Increased description width from 50% → 60% */}
      <th className="p-4 w-[60%] text-left text-xs font-semibold text-gray-600 uppercase">
        Description
      </th>
      {/* Decreased status width from 25% → 15% and aligned right */}
      <th className="p-4 px-10 w-[15%] text-right text-xs font-semibold text-gray-600 uppercase">
        Status
      </th>
    </tr>
  </thead>
  <tbody>
    {currentIngredients.map((ingredient) => (
      <tr
        key={ingredient._id || ingredient.id}
        className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
        onClick={() => onViewIngredient(ingredient)}
      >
        {/* INGREDIENT CELL */}
        <td className="p-4 align-middle">
          <div className="flex items-center space-x-3">
            {/* Small round before image */}
            <span
              className={`w-2 h-2 rounded-full ${
                ingredient.status?.toLowerCase() === "active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></span>

            {ingredient.image ? (
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-8 h-8 object-cover rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            )}

            <span className="text-sm font-medium text-gray-800">
              {ingredient.name}
            </span>
          </div>
        </td>

        {/* DESCRIPTION CELL */}
        <td className="p-4 align-middle">
          <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {ingredient.description.length > 105
              ? ingredient.description.slice(0, 105) + "..."
              : ingredient.description}
          </p>
        </td>

        {/* STATUS CELL (right aligned) */}
        <td className="p-4 px-10 align-middle text-right">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              ingredient.status?.toLowerCase() === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {ingredient.status}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>


</div>

      <div className="flex items-center justify-end p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
            <button onClick={goToPreviousPage} disabled={activePage === 1} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft size={16} />
            </button>
            {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                    key={page}
                    onClick={() => setActivePage(page)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${activePage === page ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    {page}
                </button>
            ))}
            <button onClick={goToNextPage} disabled={activePage === totalPages} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};
