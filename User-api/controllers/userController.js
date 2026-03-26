const userService = require('../services/userService');

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      
      res.json({ result: true, data: users });
    } catch (err) {
      res.status(500).json({ result: false, message: err.message });
    }
  }
  
  // function handler getUserby id 
  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ result: false, message: 'User not found' });
      res.json({ result: true, data: user });
    } catch (err) {
      res.status(500).json({ result: false, message: err.message });
    }
  }

  async create(req, res) {
    const { name, email } = req.body;
    if (!name || !email) 
      return res.status(400).json(
    { result: false, message: 'Name & email required'
      
     });
    try {
      const user = await userService.createUser(name, email);
      res.status(201).json({ result: true, data: user });
    } catch (err) {
      res.status(500).json({ result: false, message: err.message });
    }
  }

  async setActive(req, res) {
    try {
      const user = await userService.setActive(req.params.id);
      res.json({ result: true, data: user });
    } catch (err) {
      res.status(500).json({ result: false, message: err.message });
    }
  }

  async setInactive(req, res) {
    try {
      const user = await userService.setInactive(req.params.id);
      res.json({ result: true, data: user });
    } catch (err) {
      res.status(500).json({ result: false, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) return res.status(404).json({ result: false, message: 'User not found' });
      res.json({ result: true, message: 'User deleted', data: user });
    } catch (err) {
      res.status(500).json({ result: false, message: err.message });
    }
  }
}

module.exports = new UserController();