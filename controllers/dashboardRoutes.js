const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth.js');
const sequelize = require('../config/connection.js');

// get all posts of user
router.get('/', withAuth, (req, res) =>{

});

// get one post of user
router.get('/id', withAuth, (req, res) =>{

});

// create new post
router.get('/new', withAuth, (req, res)=>{
    res.render('newPost')
});

module.exports = router