import React from 'react';
import { SelectField } from '../utils/SelectField';
import { InputField } from '../utils/InputField';
import { Plus, X } from 'lucide-react';

export const OtherStep = ({ formData, handleInputChange, newPlantPart, setNewPlantPart, addPlantPart, removePlantPart, errors }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Plant Parts And Its Purpose</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <SelectField label="Plant Part" value={newPlantPart.type} onChange={(e) => setNewPlantPart({...newPlantPart, type: e.target.value})} options={['Leave', 'Bark', 'Root', 'Flower', 'Seed']} />
                <InputField label="Description" name="description" value={newPlantPart.description} onChange={(e) => setNewPlantPart({...newPlantPart, description: e.target.value})} placeholder="Type here..." />
            </div>
            <div className="flex items-center space-x-2 mb-6">
                <button onClick={addPlantPart} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm hover:bg-green-700">
                    <Plus size={16} />
                    <span>Add</span>
                </button>
            </div>

            {formData.plantParts.length > 0 && (
                <div className="mb-8 border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Type</th>
                                <th className="text-left p-3 text-xs font-semibold text-gray-600 uppercase">Description</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.plantParts.map((part) => (
                                <tr key={part._id || part.id} className="border-b">
                                    <td className="p-3 text-sm">{part.type}</td>
                                    <td className="p-3 text-sm">{part.description}</td>
                                    <td>
                                        <button onClick={() => removePlantPart(part._id || part.id)} className="p-2 text-gray-400 hover:text-red-500"><X size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mb-6">
                <InputField label="Best Combined With" name="bestCombinedWith" value={formData.bestCombinedWith} onChange={handleInputChange} placeholder="Type here..." />
            </div>
            <div>
                <InputField 
                    label="Geographical Locations *" 
                    name="geographicalLocations" 
                    value={formData.geographicalLocations} 
                    onChange={handleInputChange} 
                    placeholder="Type here..." 
                    error={errors.geographicalLocations}
                />
            </div>
        </div>
    );
};
