const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// GET index
router.get('/', async (req, res, next) => {
    console.log(req.body, ' getting all of the recipes');
    try {
        const allRecipes = await Recipe.find();
        res.json({
            status: 200,
            data: allRecipes
          })
        } catch (err){
          console.log('Error ' + err);
    }
})


// POST create a recipe
router.post('/', async(req, res) =>{
    try{
        console.log(req.body, ' this is req.body');
        const createdRecipe = await Recipe.create(req.body);
        res.json({
            status: 200,
            data: createdRecipe
        })
    } catch(err){
        console.log('Error ' + err);
    }
})


// GET a recipe at /:id
router.get('/:id', async(req, res, next) =>{
    try{
        console.log(req.params.id, ' this is req.params');
        const foundRecipe = await Recipe.findById(req.params.id);
        res.json({
            status: 200,
            data: foundRecipe
        })
    } catch(err){
        console.log('Error ' + err);
    }
})

// PUT update recipe /:id
router.put('/:id', async(req, res) => {
    try{
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            status: 200,
            data: updatedRecipe
        })
    } catch(err){
        console.log('Error ' + err);
    }
})

// DELETE destroy recipe at /:id
router.delete('/:id', async(req, res) => {
    try{
        const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
        res.json({
            status: 200,
            data: deletedRecipe
        })
    } catch(err){
        console.log('Error ' + err);
    }
})


module.exports = router;