const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: String,
  sanskritName: String,
  description: { type: String, required: true },
  
  image: String, // URL to the uploaded image
    color: String, 
    icon: String,
  whyToUse: [String],
  prakrittiImpact: {
    vata: String,
    vataReason: String,
    kapha: String,
    kaphaReason: String,
    pitta: String,
    pittaReason: String
  },
  benefits: [
    { 
      id: Number,
      emoji: String, 
      text: String, 
      selected: Boolean 
    }
  ],
  rasa: String,
  guna: String,
  veerya: String,
  vipaka: String,
  importantFormulations: [
    { 
      id: Number,
      text: String 
    }
  ],
  therapeuticUses: [
    { 
      id: Number,
      text: String 
    }
  ],
   plantParts: [
    { 
      type: { type: String, required: true }, 
      description: { type: String, required: true }
    }
  ],

  bestCombinedWith: String,
  geographicalLocations: String,
  status: { type: String, default: 'Active' }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;