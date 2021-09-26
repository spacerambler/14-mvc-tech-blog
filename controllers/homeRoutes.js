const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth.js');
const sequelize = require('../config/connection.js');



// router.get('/', async (req, res) =>{
//     try {
//         const postData = await Post.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 },
//             ],
//         });

//         const posts = postData.map((post) => post.get({ plain: true }));

//         res.render('homepage', {
//             posts
//         })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/', (req, res) =>{
         Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        }).then((postData,err)=>{

            if(err)res.status(500).json(err);
        

            const posts = postData.map((post) => post.get({ plain: true }));

            res.render('homepage', {
                posts
            })
    
    
})
});

// router.get('/dashboard', withAuth, (req, res) => {
//     User.findByPk(req.session.user_id, {
//         include: [{ model: Post }]
//     }).then((userData, err) => {
//         if(err)res.status(500).json(err);
//     })

//     const posts = userData.map((post) => post.get({ plain: true}));

//     res.render('dashboard', {
//         ...user,
//         logged_in: true
//     })
// })

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/dashboard');
//         return;
//     }
//     res.render('login');
// })

module.exports = router;