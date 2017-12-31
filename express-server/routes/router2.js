const express = require('express');
const router = express.Router();

console.log('router2')

router.use('/', (req, res, next) => {
  console.log('mw1')
  next('router')   //跳过当前中间件，进入下一个中间件
});

router.use('/', (req, res, next) => {
  console.log('mw2')
  next()
})

module.exports = router;
