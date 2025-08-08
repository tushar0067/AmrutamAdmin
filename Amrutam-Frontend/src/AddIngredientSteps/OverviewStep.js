import React from 'react';
import { OverviewSection } from "./OverviewSection";


export const OverviewStep = ({ formData }) => (
    <div className="p-6 border rounded-lg bg-white">
        <OverviewSection title="General Information">
            <div className="flex flex-col items-center text-center">
                {formData.image && <img src={formData.image} alt="Ingredient" className="w-48 h-48 object-cover rounded-lg mb-4" />}
                <h3 className="text-2xl font-bold text-gray-800">{formData.name} - {formData.scientificName} (Sanskrit - {formData.sanskritName})</h3>
            </div>
            <div className="mt-6">
                <h4 className="font-semibold text-gray-700">Description</h4>
                <p className="mt-1 text-gray-600">{formData.description}</p>
            </div>
        </OverviewSection>

        <OverviewSection title="Why To Use?">
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                {formData.whyToUse.map((item, index) => item && <li key={index}>{item}</li>)}
            </ul>
        </OverviewSection>

        <OverviewSection title="Prakriti Impact">
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Vata - {formData.prakrittiImpact.vata} - {formData.prakrittiImpact.vataReason}</li>
                <li>Kapha - {formData.prakrittiImpact.kapha} - {formData.prakrittiImpact.kaphaReason}</li>
                <li>Pitta - {formData.prakrittiImpact.pitta} - {formData.prakrittiImpact.pittaReason}</li>
            </ul>
        </OverviewSection>

        <OverviewSection title="Benefits">
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                {formData.benefits.map(b => b.text && <li key={b._id || b.id}>{b.emoji} {b.text}</li>)}
            </ul>
        </OverviewSection>

        <OverviewSection title="Ayurvedic Properties">
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Rasa - {formData.rasa}</li>
                <li>Veerya - {formData.veerya}</li>
                <li>Guna - {formData.guna}</li>
                <li>Vipaka - {formData.vipaka}</li>
            </ul>
        </OverviewSection>
        
        <OverviewSection title="Important Formulations">
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                {formData.importantFormulations.map(f => f.text && <li key={f._id || f.id}>{f.text}</li>)}
            </ul>
        </OverviewSection>

        <OverviewSection title="Therapeutic Uses">
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                {formData.therapeuticUses.map(t => t.text && <li key={t._id || t.id}>{t.text}</li>)}
            </ul>
        </OverviewSection>

        <OverviewSection title="Plant Parts and its Purpose">
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                {formData.plantParts.map(p => p.description && <li key={p._id || p.id}>{p.type} - {p.description}</li>)}
            </ul>
        </OverviewSection>

        <OverviewSection title="Best Combined With">
            <p className="text-gray-600">{formData.bestCombinedWith}</p>
        </OverviewSection>

        <OverviewSection title="Geographical Locations">
            <p className="text-gray-600">{formData.geographicalLocations}</p>
        </OverviewSection>
    </div>
);

