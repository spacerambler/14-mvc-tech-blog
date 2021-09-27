const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection.js')

// new post
router.post('/', withAuth, async (req, res)=>{
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err)
    }
})

// get all posts
router.get('/', async (req, res) => {
    try {
        Post.findAll({
            attributes: ["id", "title", "postCopy", "date_created"],
            include: [
                {
                    model: User, 
                    attributes: ["name"],
                }, 
                {
                    model: Comment, 
                    attributes: ["id", "commentContent", "date_created"], 
                    include: {
                        model: User,
                        attributes: ["name"]
                        }
                }
            ],
        })
        res.status(200).json(postData);
    } catch(err) {
        res.status(500).json(err)
    }
})

// get one post

// edit post
router.put('/dashboard/:id', withAuth, async (req, res)=>{
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                postCopy: req.body.postCopy
            }, 
            {
                where: {
                    id: req.params.id
                }
            }
        )
        return res.json(postData)
    } catch (err) {
        return res.json(err)
    }
})

// delete post
router.delete('/dashboard/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        if (!projectData) {
            res.status(404).json({ message: 'No post found'})
            return
        }
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
