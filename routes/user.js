const express = require('express');
const {
  handleGetAllUsers,
  handleCreateUSer,
  handleDeleteUserById,
  handleGetUserById,
  handleUpdateUserById,
} = require('../controllers/user');

const router = express.Router();

router.get('/', handleGetAllUsers);
router.get('/:id', handleGetUserById);
router.post('/', handleCreateUSer);
router.patch('/:id', handleUpdateUserById);
router.delete('/:id', handleDeleteUserById);

module.exports = router;
