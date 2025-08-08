import React, { useState, useEffect, useCallback } from 'react';
import { Award, Home } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from "./Haeder";
import { IngredientsListPage } from './IngredientsListPage';
import { IngredientDetailsPage } from './IngredientDetailsPage ';
import { AddIngredientPage } from './AddIngredientPage';
import { PlaceholderPage } from '../utils/PlaceholderPage';
import { LoginPage } from './LoginPage';

// The API base URL

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/ingredients';

function App() {
  // Initialize auth state by checking localStorage for a token
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState('ingredients-list');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Failed to fetch ingredients:", error);
            }
        };
        fetchIngredients();
    }
  }, [isAuthenticated]);

  const handleLogin = (token) => {
    // Save the token to localStorage and update state
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Remove the token from localStorage and update state
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentPage('ingredients-list');
  };
  
  const handleAddNewIngredient = async (formData) => {
  try {
    console.log("📤 Sending ingredient form data...");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    console.log("📥 Raw Response Status:", response.status, response.statusText);

    const text = await response.text(); // read as text first to see raw output
    console.log("📄 Raw Backend Response:", text);

    let jsonData;
    try {
      jsonData = JSON.parse(text); // try parsing JSON
    } catch {
      jsonData = { message: text }; // fallback if not valid JSON
    }

    if (!response.ok) {
      throw new Error(jsonData.message || 'Failed to add ingredient');
    }

    console.log("✅ Ingredient Added:", jsonData);

    setIngredients(prev => [...prev, jsonData]);
    setCurrentPage('ingredients-list');

  } catch (error) {
    console.error("❌ Failed to add ingredient:", error);
  }
};

  
  const handleUpdateIngredient = async (formData) => {
    const ingredientData = JSON.parse(formData.get('ingredientData'));
    const ingredientId = ingredientData._id;
    try {
      const response = await fetch(`${API_URL}/${ingredientId}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update ingredient');
      }
      const returnedIngredient = await response.json();
      setIngredients(prev => prev.map(ing => ing._id === returnedIngredient._id ? returnedIngredient : ing));
      setCurrentPage('ingredients-list');
    } catch (error) {
      console.error("Failed to update ingredient:", error.message);
    }
  };

  const handleUpdateStatus = async (ingredientId, newStatus) => {
    if (!ingredientId) {
        console.error("Update failed: ingredientId is undefined.");
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${ingredientId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }
        const updatedIngredient = await response.json();
        setIngredients(prev => 
            prev.map(ing => 
                ing._id === updatedIngredient._id ? updatedIngredient : ing
            )
        );
        setCurrentPage('ingredients-list');
    } catch (error) {
        console.error("Failed to update status:", error.message);
    }
  };

  const handleViewIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setCurrentPage('ingredient-details');
  };

  const handleEditIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setCurrentPage('edit-ingredient');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const PageContent = () => {
    switch (currentPage) {
      case 'ingredients-list':
        return <IngredientsListPage setCurrentPage={setCurrentPage} ingredients={ingredients} onViewIngredient={handleViewIngredient} />;
      case 'add-ingredient':
        return <AddIngredientPage onSave={handleAddNewIngredient} onCancel={() => setCurrentPage('ingredients-list')} />;
      case 'edit-ingredient':
        return <AddIngredientPage onSave={handleUpdateIngredient} onCancel={() => setCurrentPage('ingredients-list')} ingredientToEdit={selectedIngredient} />;
      case 'ingredient-details':
        return <IngredientDetailsPage 
                  ingredient={selectedIngredient} 
                  setCurrentPage={setCurrentPage} 
                  onEdit={handleEditIngredient} 
                  onUpdateStatus={handleUpdateStatus}
               />;
      case 'specialties':
        return <PlaceholderPage title="Specialties Management" icon={Award} />;
      default:
        return <PlaceholderPage title="Welcome to Amrutam Admin" icon={Home} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          <PageContent />
        </main>
      </div>
    </div>
  );
}

export default App;