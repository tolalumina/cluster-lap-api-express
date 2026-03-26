const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.post('/users', userController.create);
router.put('/users/:id/active', userController.setActive);
router.put('/users/:id/inactive', userController.setInactive);
router.delete('/users/:id', userController.delete); 

module.exports = router;