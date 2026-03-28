const userModel = require('../models/userModel');

class UserService {
  getAllUsers() {
    return userModel.getAllUsers();
  }

  getUserById(id) {
    return userModel.getUserById(id);
  }

  createUser(name, email) {
    return userModel.createUser(name, email);
  }

  setActive(id) {
    return userModel.updateUserStatus(id, true);
  }

  setInactive(id) {
    return userModel.updateUserStatus(id, false);
  }

  deleteUser(id) {
    return userModel.deleteUser(id);
  }
}

module.exports = new UserService(); // singleton service instance