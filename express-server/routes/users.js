const express = require('express');
const router = express.Router();
const User = require('../modules/in_memo/user.js')
const UserService = require('../services/user_service.js')

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
const users = []

router.route('/')
  .get((req, res, next) => {
    /*const u = new User(req.query.firstName, req.query.lastName, req.query.age)
    res.locals.user = u
    res.render('user')*/
    const users = UserService.getAllUsers()
    res.locals.users = users
    res.render('users')
  })
  .post((req, res, next) =>{
    const { firstName, lastName, age } = req.body
    const u = UserService.addNewUser(firstName, lastName, age)
    res.json(u)
  })

router.get('/:userId', (req, res) => {
    const user = UserService.getUserById(Number(req.params.userId))
    res.locals.user = user
    res.render('user')
})

router.post('/:userId/subscription', (req, res, next) => {
    try {
      const sub = UserService.createSubscriptioin(Number(req.params.userId), req.body.url)
      res.json(sub)
    } catch (e) {
      next(e)
    }
})

router.get('/:userId/subscription/:subscriptionId', (req, res, next) => {
    res.json({
      userId: req.params.userId,
      subscriptionId: req.params.subscriptionId
    })
})

module.exports = router;
