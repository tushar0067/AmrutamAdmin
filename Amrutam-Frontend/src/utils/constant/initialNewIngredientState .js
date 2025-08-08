
export const initialNewIngredientState = {
  name: '', scientificName: '', sanskritName: '', description: '', image: null,
  whyToUse: ['', '', ''],
  prakrittiImpact: { vata: '', vataReason: '', kapha: '', kaphaReason: '', pitta: '', pittaReason: '' },
  benefits: [
    { id: 1, emoji: '💗', text: '', selected: false },
    { id: 2, emoji: '🧠', text: '', selected: false },
  ],
  rasa: '', guna: '', veerya: '', vipaka: '',
  importantFormulations: [{ id: 1, text: '' }],
  therapeuticUses: [{ id: 1, text: '' }],
  plantParts: [],
  bestCombinedWith: '',
  geographicalLocations: ''
};