const User = require('../modules/in_memo/user.js')
const Subscription = require('../modules/in_memo/subscription.js')

module.exports.getAllUsers = () => {
  return User.list()
}


module.exports.addNewUser = (fistName, lastName, age) => {
  return User.insert(fistName, lastName, age)
}

module.exports.getUserById = (userId) => {
  return User.getOneById(userId)
}

module.exports.createSubscriptioin = (userId, url) => {
  const user = User.getOneById(userId)
  if(!user) throw Error('No such user')
  return Subscription.insert(userId, url)
}