// routes/ingredientRoutes.js
const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredientModel');
const upload = require('../config/cloudinaryConfig'); 

// GET all ingredients (with search)
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }
        const ingredients = await Ingredient.find(query);
        res.json(ingredients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST (create) a new ingredient
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const ingredientData = JSON.parse(req.body.ingredientData);
        
        if (req.file) {
            ingredientData.image = req.file.path; // Get the URL from Cloudinary
        }

        const ingredient = new Ingredient(ingredientData);
        const newIngredient = await ingredient.save();
        res.status(201).json(newIngredient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) an ingredient
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const ingredientData = JSON.parse(req.body.ingredientData);

        if (req.file) {
            ingredientData.image = req.file.path; // Update with the new image URL
        }

        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, ingredientData, { new: true });
        res.json(updatedIngredient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            req.params.id, 
            { status: status }, 
            { new: true }
        );
        res.json(updatedIngredient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an ingredient
router.delete('/:id', async (req, res) => {
    try {
        await Ingredient.findByIdAndDelete(req.params.id);
        res.json({ message: 'Ingredient deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;