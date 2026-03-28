const todos = require("../model/todoModel");

async function getAlltodos() {
  try {

  }catch(error) {
    
  }
}
const sayHello = (req, res) => {
  res.json({
    result: true,
    data: todos,
  });
};
module.exports = {
  sayHello,
};
