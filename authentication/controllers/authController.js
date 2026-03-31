// controllers/auth.controller.js
const AuthService = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await AuthService.registerUser(req.body);
    return res.status(201).json({ message: "User created", data: user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    // const { email, password } = req.body;
    const result = await AuthService.loginUser(req.body);
  
    return res.json(result);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { register, login };
