const router = require('express').Router();
const { post } = require('.');
const { Post, User } = require('../models');
const withAuth = require('../utils/auth.js')

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

module.exports = router;