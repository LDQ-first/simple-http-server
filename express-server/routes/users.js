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
    res.render('user')
  })
  .post((req, res, next) =>{
    const { firstName, lastName, age } = req.body
    const u = UserService.addNewUser(firstName, lastName, age)
    res.json(u)
  })

module.exports = router;
