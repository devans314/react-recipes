const express = require('express');
const router = express.Router();
const User = require('../models/user');
const recipe = require('../models/recipe');
const bcrypt = require('bcryptjs');
const requireLogin = require('../middleware/requireLogin');

// Instead of redirecting, send a res.json object with status and newUser

// Show/edit profile route (will also show all the recipes you've created and saved)
router.get('/:id', requireLogin, async (req, res, next) =>{
    try {
    const foundUser = await User.findById(req.params.id) //.populate user recipes??
    console.log(foundUser);
    res.json({
        status: 200,
        data: foundUser
        });
    }catch(err){
        next(err)
    }
});

// Edit user
router.put('/:id', async (req, res) => {
    try{
    const updatedUser =  await User.findByIdAndUpdate(req.params.id, req.body)
    console.log(User.username)
    //   res.redirect(`/user/${req.params.id}`);
    res.json({
        status: 200,
        data: updatedUser
    })
    }catch(err){
        res.send(err);   
    }
});


// Delete User
router.delete('/:id', requireLogin, async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        // res.redirect('/')
        res.json({
            status: 200,
            data: deletedUser
        })
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;