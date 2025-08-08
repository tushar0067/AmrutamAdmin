import React, { useState } from 'react';
import { GeneralInfoStep } from '../AddIngredientSteps/GeneralInfoStep';
import { BenefitsStep } from "../AddIngredientSteps/BenifitsStep";  
import { PropertiesStep } from "../AddIngredientSteps/PropertiesStep";
import { OtherStep } from "../AddIngredientSteps/OtherStep";
import { OverviewStep } from '../AddIngredientSteps/OverviewStep';
import { initialNewIngredientState } from '../utils/constant/initialNewIngredientState ';

export const AddIngredientPage = ({ onSave, onCancel, ingredientToEdit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(ingredientToEdit || initialNewIngredientState);
  const [newPlantPart, setNewPlantPart] = useState({ type: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const isEditing = !!ingredientToEdit;

  // This function now contains the complete validation logic
  const validateStep = () => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Ingredient Name is required.";
        if (!formData.description.trim()) newErrors.description = "Description is required.";
        break;
      case 2:
        if (!formData.prakrittiImpact.vata) newErrors.vata = "Vata impact is required.";
        if (formData.prakrittiImpact.vata && !formData.prakrittiImpact.vataReason.trim()) {
            newErrors.vataReason = "Reason is required for Vata impact.";
        }
        if (!formData.prakrittiImpact.kapha) newErrors.kapha = "Kapha impact is required.";
        if (formData.prakrittiImpact.kapha && !formData.prakrittiImpact.kaphaReason.trim()) {
            newErrors.kaphaReason = "Reason is required for Kapha impact.";
        }
        if (!formData.prakrittiImpact.pitta) newErrors.pitta = "Pitta impact is required.";
        if (formData.prakrittiImpact.pitta && !formData.prakrittiImpact.pittaReason.trim()) {
            newErrors.pittaReason = "Reason is required for Pitta impact.";
        }
        break;
      case 3:
        if (!formData.rasa.trim()) newErrors.rasa = "Rasa is required.";
        if (!formData.veerya.trim()) newErrors.veerya = "Veerya is required.";
        if (!formData.guna.trim()) newErrors.guna = "Guna is required.";
        if (!formData.vipaka.trim()) newErrors.vipaka = "Vipaka is required.";
        break;
      case 4:
        if (!formData.geographicalLocations.trim()) newErrors.geographicalLocations = "Geographical Locations are required.";
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 5));
    }
  };
  
  const handleBack = () => {
    setErrors({});
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: null}));
    }
  };
  
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };
  
  const removeImage = () => {
    setImageFile(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  const handleSave = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const dataToSubmit = new FormData();
    if (imageFile) {
      dataToSubmit.append('image', imageFile);
    }
    
    // Create a deep copy to modify without affecting the UI state
    const finalFormData = JSON.parse(JSON.stringify(formData));
    
    // Remove the temporary image preview URL
    delete finalFormData.image; 

    // --- THIS IS THE FIX ---
    // Remove the client-side 'id' from plantParts before sending to the backend
    if (finalFormData.plantParts && finalFormData.plantParts.length > 0) {
        finalFormData.plantParts = finalFormData.plantParts.map(({ type, description }) => ({
            type,
            description
        }));
    }

    dataToSubmit.append('ingredientData', JSON.stringify(finalFormData));
    
    try {
        await onSave(dataToSubmit);
    } catch (error) {
        console.error("Submission failed:", error);
        setIsSubmitting(false); // Re-enable button on failure
    }
  };

  // --- (All other handler functions remain the same) ---
  const handlePrakrittiChange = (field, value) => setFormData(prev => ({ ...prev, prakrittiImpact: { ...prev.prakrittiImpact, [field]: value } }));
  const handleWhyToUseChange = (index, value) => setFormData(prev => ({ ...prev, whyToUse: prev.whyToUse.map((item, i) => i === index ? value : item) }));
  const handleBenefitChange = (id, text) => setFormData(prev => ({ ...prev, benefits: prev.benefits.map(b => b.id === id ? { ...b, text } : b) }));
  const toggleBenefitSelection = (id) => setFormData(prev => ({ ...prev, benefits: prev.benefits.map(b => b.id === id ? { ...b, selected: !b.selected } : b) }));
  const addNewBenefit = () => setFormData(prev => ({ ...prev, benefits: [...prev.benefits, { id: Date.now(), emoji: '🌿', text: '', selected: false }] }));
  const removeBenefit = (id) => setFormData(prev => ({ ...prev, benefits: prev.benefits.filter(b => b.id !== id) }));
  const handleFormulationChange = (id, text) => setFormData(prev => ({...prev, importantFormulations: prev.importantFormulations.map(f => f.id === id ? {...f, text} : f)}));
  const addFormulation = () => setFormData(prev => ({...prev, importantFormulations: [...prev.importantFormulations, {id: Date.now(), text: ''}]}));
  const removeFormulation = (id) => setFormData(prev => ({...prev, importantFormulations: prev.importantFormulations.filter(f => f.id !== id)}));
  const handleTherapeuticUseChange = (id, text) => setFormData(prev => ({...prev, therapeuticUses: prev.therapeuticUses.map(t => t.id === id ? {...t, text} : t)}));
  const addTherapeuticUse = () => setFormData(prev => ({...prev, therapeuticUses: [...prev.therapeuticUses, {id: Date.now(), text: ''}]}));
  const removeTherapeuticUse = (id) => setFormData(prev => ({...prev, therapeuticUses: prev.therapeuticUses.filter(t => t.id !== id)}));
  const addPlantPart = () => {
    if (!newPlantPart.type || !newPlantPart.description) return;
    setFormData(prev => ({ ...prev, plantParts: [...prev.plantParts, { ...newPlantPart, id: Date.now() }] }));
    setNewPlantPart({ type: '', description: '' });
  };
   const removePlantPart = (idToRemove) => {
    setFormData(prev => ({
      ...prev,
      plantParts: prev.plantParts.filter(p => (p._id || p.id) !== idToRemove)
    }));
  };

  const renderStepContent = () => {
    switch(step) {
      case 1: return <GeneralInfoStep formData={formData} handleInputChange={handleInputChange} handleImageUpload={handleImageUpload} removeImage={removeImage} errors={errors} />;
      case 2: return <BenefitsStep formData={formData} handleWhyToUseChange={handleWhyToUseChange} handlePrakrittiChange={handlePrakrittiChange} handleBenefitChange={handleBenefitChange} toggleBenefitSelection={toggleBenefitSelection} addNewBenefit={addNewBenefit} removeBenefit={removeBenefit} errors={errors} />;
      case 3: return <PropertiesStep formData={formData} handleInputChange={handleInputChange} handleFormulationChange={handleFormulationChange} addFormulation={addFormulation} removeFormulation={removeFormulation} handleTherapeuticUseChange={handleTherapeuticUseChange} addTherapeuticUse={addTherapeuticUse} removeTherapeuticUse={removeTherapeuticUse} errors={errors} />;
      case 4: return <OtherStep formData={formData} handleInputChange={handleInputChange} newPlantPart={newPlantPart} setNewPlantPart={setNewPlantPart} addPlantPart={addPlantPart} removePlantPart={removePlantPart} errors={errors} />;
      case 5: return <OverviewStep formData={formData} />;
      default: return <div className="text-center p-8"><h3 className="text-lg font-semibold">Step {step}</h3><p>This step is under construction.</p></div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full">
      <div className="p-6 overflow-y-auto">
        <div className="flex items-center justify-center mb-8">
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step >= i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{step > i + 1 ? '✓' : i + 1}</div>
                <p className={`text-xs mt-2 w-20 ${step >= i + 1 ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>{['General Info', 'Benefits', 'Properties', 'Other', 'Overview'][i]}</p>
              </div>
              {i < 4 && <div className={`flex-1 h-0.5 mx-2 ${step > i + 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>}
            </React.Fragment>
          ))}
        </div>
        {renderStepContent()}
      </div>
      <div className="flex justify-between items-center space-x-4 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg mt-auto">
        <button onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">Cancel</button>
        <div className="flex space-x-3">
          {step > 1 && <button onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">Back</button>}
          <button 
            onClick={step < 5 ? handleNext : handleSave} 
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:bg-gray-400"
          >
            {isSubmitting ? 'Saving...' : (step < 5 ? 'Next' : (isEditing ? 'Update Ingredient' : 'Submit'))}
          </button>
        </div>
      </div>
    </div>
  );
};