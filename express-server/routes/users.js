var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
const users = []

router.route('/')
  .get((req, res, next) => {
    res.json(users)
  })
  .post((req, res) => {
    const user = req.body
    users.push(user)
    res.json(user)
  })

module.exports = router;
