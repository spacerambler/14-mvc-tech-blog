const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth.js');
const sequelize = require('../config/connection.js');

router.Router.get("/dashboard", (req, res)=>{
    res.sendFile(path.join(__dirname, "../views/dashboard.handlebars"))
})

