const router = require('express').Router();
const { User, Post } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Email not found, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Find all users
router.get('/', async (req, res)=>{
try {
  User.findAll({
    attributes: {exclude: [password]}
  })
  res.status(200).json(userData);
} catch(err){
  res.status(500).json(err);
}
})

// find one user
router.get('/:id', async (req, res)=>{
  try {
    User.findOne({
      attributes: {exclude: [password]}, 
      where: {id: req.params.id}, 
      include: [
        {
          model: Post, 
          attributes: ["id", "title", "postCopy", "date_created"]
        }, 
        {
          model: Comment, 
          attributes: ["id", "title", "commentContent", "date_created"],
          include: {
            model: Post, 
            attributes: ["title"]
          }, 
        }, 
        { 
          model: Post, 
          attributes: ["title"],
        }
      ]
    });
    if (!userData) {
      res.status(400).json({ message: 'No user found with that id'});
      return;
    }
    res.status(200).json(userData);
  } catch(err){
    res.status(500).json(err);
  }
  })

// update user
router.put('/:id', async (req, res)=>{
  try {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
    if (!userData) {
      res.status(400).json({ message: 'No user found with that id'});
      return;
    }
    res.status(200).json(userData);
  } catch(err){
    res.status(500).json(err);
  }
});

// delete user
router.delete('/:id', async (req, res)=>{
  try {
    User.destroy({
      where: { id: req.params.id }
    })
    if (!userData) {
      res.status(400).json({ message: 'No user found with that id'});
      return;
    }
    res.status(200).json(userData);
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
