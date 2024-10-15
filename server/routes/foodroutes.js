const express = require('express');
const router = express.Router();
const {CategoryModel, FoodModel} = require('./../models');

// POST route to add a new category
router.post('/addfoodcategory', async (req, res) => {
    const { name, available } = req.body;

    // Check if required properties are missing
    if (!name || !available) {
        return res.status(400).json({ message: 'Properties are missing' });
    }

    try {
        // Check if the category already exists
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create and save a new category
        const category = new CategoryModel({ name, available });
        const savedCategory = await category.save();
        
        // Return a success response with the saved category
        return res.status(201).json({
            message: 'Category added successfully',
            data: savedCategory
        });
    } catch (err) {
        console.error('Error while inserting the data:', err);
        return res.status(500).json({ message: 'Error while inserting the data', error: err.message });
    }
});

router.post('/addfooditem', async (req, res) => {
    const { foodItems } = req.body; // Expecting an array or a single object
    if (!foodItems || foodItems.length === 0) {
        return res.status(400).json({ message: 'Food items data is missing' });
    }

    try {
        // Check if the input is an array (bulk insertion)
        if (Array.isArray(foodItems)) {
            // Validate if any property is missing in any of the food items
            for (const item of foodItems) {
                const { name, category, price, available } = item;
                if (!name || !category || !price || available === undefined) {
                    return res.status(400).json({ message: 'One or more properties are missing in bulk insertion' });
                }

                // Check if any of the food items already exist
                const existingFoodItem = await FoodModel.findOne({ name });
                if (existingFoodItem) {
                    return res.status(400).json({ message: `Food item '${name}' already exists` });
                }
            }

            // Perform bulk insertion
            const savedFoodItems = await FoodModel.insertMany(foodItems);
            return res.status(201).json({
                message: 'Food items added successfully',
                data: savedFoodItems
            });
        } else {
            // Handle single insertion
            const { name, category, price, image, description, available } = foodItems;

            // Validate input for single item
            if (!name || !category || !price || available === undefined) {
                return res.status(400).json({ message: 'Properties are missing' });
            }

            // Check if the food item already exists
            const existingFoodItem = await FoodModel.findOne({ name });
            if (existingFoodItem) {
                return res.status(400).json({ message: 'Food item already exists' });
            }

            // Create and save single food item
            const foodItem = new FoodModel({ name, category, price, image, description, available });
            const savedFoodItem = await foodItem.save();
            return res.status(201).json({
                message: 'Food item added successfully',
                data: savedFoodItem
            });
        }
    } catch (err) {
        console.error('Error while inserting the data:', err);
        return res.status(500).json({ message: 'Error while inserting the data', error: err.message });
    }
});




router.post('/getfooditem', async(req,res)=>{
    console.log(req.body)
    const foodcategory = req.body.category
    if(!foodcategory){
        return res.status(400).json({ message: 'Food category is missing' });
    }
    try{
    const results = await FoodModel.find({ 'category': foodcategory });
    console.log(results);

    // If the intent is to return only the name of the items, map over the results
    const response = await results
    .filter(res => res.available === 'true')  // Filter only those with available === 'True'
    .map(res => res.name);
    console.log("Food items response", response)
    res.status(200).json({message:response})
    } catch(err){
        console.error('Error while fetching the data:', err);
        return res.status(500).json({ message: 'Error while fetching the data', error: err.message });
    }
    

})

module.exports = router;



