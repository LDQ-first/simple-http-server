const User = require('../modules/in_memo/user.js')

module.exports.getAllUsers = () => {
  return User.list()
}


module.exports.addNewUser = (fistName, lastName, age) => {
  return User.insert(fistName, lastName, age)
}
