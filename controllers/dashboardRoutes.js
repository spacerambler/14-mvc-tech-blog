// const router = require('express').Router();
// const { Post, User } = require('../models');
// const withAuth = require('../utils/auth.js');
// const sequelize = require('../config/connection.js');

// router.get('/', withAuth, (req, res) =>{
       
//     Post.findAll({
//         include: [
//             {
//                 model: User,
//                 attributes: ['name'],
//             },
//         ],
//     }).then((postData,err)=>{

//         if(err)res.status(500).json(err);
    

//         const posts = postData.map((post) => post.get({ plain: true }));

//         res.render('dashboard', {
//             posts, loggedIn: true
//         })


// })
// });

