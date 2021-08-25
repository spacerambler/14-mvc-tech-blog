const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res)=>{
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newProject);
    } catch (err) {
        res.status(400).json(err)
    }
})

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
        return res.json(postData)
    }
})

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