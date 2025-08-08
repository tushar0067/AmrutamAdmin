import React from 'react';
import { SelectField } from '../utils/SelectField';
import { InputField } from '../utils/InputField';
import { X } from 'lucide-react';

export const BenefitsStep = ({ formData, handleWhyToUseChange, handlePrakrittiChange, handleBenefitChange, toggleBenefitSelection, addNewBenefit, removeBenefit, errors }) => {
    const prakritiOptions = ["Balanced", "Mildly Increasing", "Unbalanced", "Aggravate"];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Benefits</h2>
            <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Why To Use?</h3>
            <div className="space-y-3">
                {formData.whyToUse.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                    <input type="text" placeholder="Describe a reason to use this ingredient..." value={item} onChange={(e) => handleWhyToUseChange(index, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                </div>
                ))}
            </div>
            </div>
            <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Prakriti Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <SelectField label="Vata *" value={formData.prakrittiImpact.vata} onChange={(e) => handlePrakrittiChange('vata', e.target.value)} options={prakritiOptions} error={errors.vata} />
                    <InputField name="vataReason" placeholder="Vata Reason..." value={formData.prakrittiImpact.vataReason} onChange={(e) => handlePrakrittiChange('vataReason', e.target.value)} containerClassName="mt-2" error={errors.vataReason} />
                </div>
                <div>
                    <SelectField label="Kapha *" value={formData.prakrittiImpact.kapha} onChange={(e) => handlePrakrittiChange('kapha', e.target.value)} options={prakritiOptions} error={errors.kapha} />
                    <InputField name="kaphaReason" placeholder="Kapha Reason..." value={formData.prakrittiImpact.kaphaReason} onChange={(e) => handlePrakrittiChange('kaphaReason', e.target.value)} containerClassName="mt-2" error={errors.kaphaReason} />
                </div>
                <div>
                    <SelectField label="Pitta *" value={formData.prakrittiImpact.pitta} onChange={(e) => handlePrakrittiChange('pitta', e.target.value)} options={prakritiOptions} error={errors.pitta} />
                    <InputField name="pittaReason" placeholder="Pitta Reason..." value={formData.prakrittiImpact.pittaReason} onChange={(e) => handlePrakrittiChange('pittaReason', e.target.value)} containerClassName="mt-2" error={errors.pittaReason} />
                </div>
            </div>
            </div>
            <div>
            <h3 className="text-lg font-medium mb-4">Benefits</h3>
            <div className="space-y-3">
                {formData.benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <button onClick={() => toggleBenefitSelection(benefit.id)} className={`w-6 h-6 rounded border-2 flex items-center justify-center ${benefit.selected ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300'}`} >
                    {benefit.selected && <X className="w-4 h-4" />}
                    </button>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">{benefit.emoji}</div>
                    <input type="text" placeholder="Describe a benefit..." value={benefit.text} onChange={(e) => handleBenefitChange(benefit.id, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                    <button onClick={() => removeBenefit(benefit.id)} className="p-2 text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
                </div>
                ))}
            </div>
            <button onClick={addNewBenefit} className="mt-3 text-sm font-medium text-green-600 hover:text-green-700">Add Another Benefit</button>
            </div>
        </div>
    );
};