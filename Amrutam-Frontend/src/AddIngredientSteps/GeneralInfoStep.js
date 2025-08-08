import React from 'react';
import { InputField } from '../utils/InputField';
import { Upload, X } from 'lucide-react';


export const GeneralInfoStep = ({ formData, handleInputChange, handleImageUpload, removeImage, errors }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6 text-gray-800">General Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <InputField 
        label="Ingredient Name*" 
        name="name" 
        value={formData.name} 
        onChange={handleInputChange} 
        error={errors.name} 
      />
      <InputField 
        label="Scientific Name" 
        name="scientificName" 
        value={formData.scientificName} 
        onChange={handleInputChange} 
      />
      <InputField 
        label="Sanskrit Name" 
        name="sanskritName" 
        value={formData.sanskritName} 
        onChange={handleInputChange} 
      />
    </div>
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Ingredient Description*</label>
      <textarea 
        name="description" 
        value={formData.description} 
        onChange={handleInputChange} 
        rows={3} 
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${errors.description ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
      ></textarea>
      {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
    </div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Ingredient Image</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        {formData.image ? (
            <div className="relative w-32 h-32 mx-auto">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                <button onClick={removeImage} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-red-500 hover:bg-red-50">
                    <X size={16} />
                </button>
            </div>
        ) : (
            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
        )}
    </div>
  </div>
);
