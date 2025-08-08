import React, { useRef } from 'react';
import { InputField } from '../utils/InputField';
import { X } from 'lucide-react';

const logo1 = new URL("../Assets/uploadIcon.png", import.meta.url).href;

export const PropertiesStep = ({
  formData,
  handleInputChange,
  handleFormulationChange,
  addFormulation,
  removeFormulation,
  handleTherapeuticUseChange,
  addTherapeuticUse,
  removeTherapeuticUse,
  errors
}) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = (id) => {
    // Store the id somewhere if you need to attach file to a specific item
    fileInputRef.current.dataset.id = id;
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const itemId = fileInputRef.current.dataset.id;

    if (file) {
      console.log("File selected for item:", itemId, file);
      // Here you could call a function to handle upload and associate it with itemId
    }

    // Reset input so same file can be selected again
    event.target.value = "";
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Ayurvedic Properties
      </h2>

      {/* Ayurvedic Properties Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InputField label="Rasa *" name="rasa" value={formData.rasa} onChange={handleInputChange} placeholder="Type here..." error={errors.rasa} />
        <InputField label="Veerya *" name="veerya" value={formData.veerya} onChange={handleInputChange} placeholder="Type here..." error={errors.veerya} />
        <InputField label="Guna *" name="guna" value={formData.guna} onChange={handleInputChange} placeholder="Type here..." error={errors.guna} />
        <InputField label="Vipaka *" name="vipaka" value={formData.vipaka} onChange={handleInputChange} placeholder="Type here..." error={errors.vipaka} />
      </div>

      {/* Important Formulations */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Important Formulations</h3>
        <div className="space-y-3">
          {formData.importantFormulations.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              {/* Upload Button */}
              <button type="button" onClick={() => handleUploadClick(item.id)}>
                <span>
                  <img src={logo1} alt="Upload" className="w-30 " />
                </span>
              </button>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {/* Text input */}
              <input
                type="text"
                placeholder="Lorem ipsum"
                value={item.text}
                onChange={(e) => handleFormulationChange(item.id, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />

              {/* Remove button */}
              <button
                onClick={() => removeFormulation(item.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addFormulation}
          className="mt-3 text-sm font-medium text-green-600 hover:text-green-700"
        >
          Add Another Item
        </button>
      </div>

      {/* Therapeutic Uses */}
      <div>
        <h3 className="text-lg font-medium mb-4">Therapeutic Uses</h3>
        <div className="space-y-3">
          {formData.therapeuticUses.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry."
                value={item.text}
                onChange={(e) => handleTherapeuticUseChange(item.id, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button
                onClick={() => removeTherapeuticUse(item.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addTherapeuticUse}
          className="mt-3 text-sm font-medium text-green-600 hover:text-green-700"
        >
          Add Another Item
        </button>
      </div>
    </div>
  );
};
