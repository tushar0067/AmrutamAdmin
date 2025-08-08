import React from 'react';
import { ChevronRight } from 'lucide-react';
import { DetailsSection } from './DetailsSection';
export const IngredientDetailsPage = ({ ingredient, setCurrentPage, onEdit, onUpdateStatus }) => {
    if (!ingredient) return <div className="p-6">Select an ingredient to see details.</div>;

    const handleUpdate = () => onUpdateStatus(ingredient._id, 'Inactive');
    const handleEdit = () => onEdit(ingredient);

    return (
        <div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="cursor-pointer hover:text-gray-700" onClick={() => setCurrentPage('ingredients-list')}>Ingredient</span>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="font-medium text-gray-800">Ingredient Details</span>
            </div>
            <div className="space-y-6">
                <DetailsSection title="General Information" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <div className="flex flex-col items-center text-center">
                        {ingredient.image && <img src={ingredient.image} alt={ingredient.name} className="w-48 h-48 object-cover rounded-lg mb-4" />}
                        <h3 className="text-2xl font-bold text-gray-800">{ingredient.name} - {ingredient.scientificName} (Sanskrit - {ingredient.sanskritName})</h3>
                    </div>
                </DetailsSection>

                <DetailsSection title="Description" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <p className="text-gray-600">{ingredient.description}</p>
                </DetailsSection>

                <DetailsSection title="Why To Use?" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                     <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {ingredient.whyToUse?.map((item, index) => item && <li key={index}>{item}</li>)}
                    </ul>
                </DetailsSection>

                <DetailsSection title="Prakriti Impact" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Vata - {ingredient.prakrittiImpact?.vata} - {ingredient.prakrittiImpact?.vataReason}</li>
                        <li>Kapha - {ingredient.prakrittiImpact?.kapha} - {ingredient.prakrittiImpact?.kaphaReason}</li>
                        <li>Pitta - {ingredient.prakrittiImpact?.pitta} - {ingredient.prakrittiImpact?.pittaReason}</li>
                    </ul>
                </DetailsSection>

                <DetailsSection title="Benefits" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                     <ul className="space-y-2 text-gray-600">
                        {ingredient.benefits?.map(b => b.text && <li key={b.id} className="flex items-center"><span className="mr-2">{b.emoji}</span> {b.text}</li>)}
                    </ul>
                </DetailsSection>

                <DetailsSection title="Ayurvedic Properties" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Rasa - {ingredient.rasa}</li>
                        <li>Veerya - {ingredient.veerya}</li>
                        <li>Guna - {ingredient.guna}</li>
                        <li>Vipaka - {ingredient.vipaka}</li>
                    </ul>
                </DetailsSection>
                
                <DetailsSection title="Important Formulations" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {ingredient.importantFormulations?.map(f => f.text && <li key={f.id}>{f.text}</li>)}
                    </ul>
                </DetailsSection>

                <DetailsSection title="Therapeutic Uses" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {ingredient.therapeuticUses?.map(t => t.text && <li key={t.id}>{t.text}</li>)}
                    </ul>
                </DetailsSection>

                <DetailsSection title="Plant Parts and its Purpose" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {ingredient.plantParts?.map((p, index) => 
  p.description && <li key={p._id || index}>{p.type} - {p.description}</li>
)}
                    </ul>
                </DetailsSection>

                <DetailsSection title="Best Combined With" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <p className="text-gray-600">{ingredient.bestCombinedWith}</p>
                </DetailsSection>

                <DetailsSection title="Geographical Locations" onEdit={handleEdit} onUpdateStatus={handleUpdate}>
                    <p className="text-gray-600">{ingredient.geographicalLocations}</p>
                </DetailsSection>
            </div>
        </div>
    );
};
