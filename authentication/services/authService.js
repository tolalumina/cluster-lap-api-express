// services/auth.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (payload) => {
  const { name, email, password } = payload;
  const existing = await User.findByEmail(email);
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
  const user = await User.createUser({ name, email, password: hashedPassword });

  return user;
};

// const loginUser = async (email, password) => {

//   const user = await User.findByEmail(email);
//   if (!user) throw new Error("Invalid Email and Password!");
//   console.log(user);

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) throw new Error("Invalid credentials");

//   const token = jwt.sign(
//     { userId: user.id },
//     process.env.JWT_SECRET || "SECRET_KEY",
//     { expiresIn: "1h" },
//   );

//   return { user: { id: user.id, name: user.name, email: user.email }, token };
// };

const loginUser = async (body) => {
  //  check email and pass
  if (!body.email || !body.password) {
    throw new Error("Email invalid and password");
  }
  const user = await User.findByEmail(body.email);
  if (!user) throw new Error("Email invalid and Password!");

  // compare user's validate that exit in database
  const inValid = await bcrypt.compare(body.password, user.password);
  if (!inValid) throw new Error("Email invalid and Password!");

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "SECRET_KEY",
    { expiresIn: "1h" },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      
    },
    token,
  };
};

module.exports = { registerUser, loginUser };
