const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')

// Registration
router.post('/register', async (req, res)=> {
    console.log(req.body);
    try{
        const newUser = await User.create(req.body);
        console.log(req.body);

        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
        console.log(passwordHash)
        
        req.session.username = req.body.username;
        req.session.password = req.body.password;
        req.session.logged = true;
        console.log(newUser);
        // req.session.message = '';
        res.json({
            status: 200,
            data: newUser
        })
    }catch(err){
        console.log(err);
    }
});

// Login
router.post('/login', async (req, res)=> {
    try {
    const foundUser = await User.findOne({username: req.body.username});
    console.log(foundUser);
    if (foundUser){
        if (bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.logged = true;
            console.log(req.session.logged);
            req.session.userId = foundUser._id;
            req.session.user = foundUser;
            res.json({
                status: 200,
                data: foundUser
            })
        }
        else {
            req.session.message = 'incorrect username or password';
            console.log(req.session.message);
            res.redirect('/auth/login');
            }
        }
    else{
        req.session.message = 'username or password is incorrect';
        console.log(req.session.message);
        res.redirect('/auth/login');
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

// Logout
router.get('/logout', (req, res)=> {
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/auth/login');
        }
    });
});

module.exports = router;