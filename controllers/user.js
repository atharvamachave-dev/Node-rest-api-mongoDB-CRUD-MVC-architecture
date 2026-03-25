const User = require('../models/user');
const mongoose = require('mongoose');

const handleGetAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: 'User not found...' });
  }
  return res.status(200).json(user);
};

const handleUpdateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    // Optional: map incoming fields to DB fields
    const updatedData = {
      ...(updates.first_name && { firstName: updates.first_name }),
      ...(updates.last_name && { lastName: updates.last_name }),
      ...(updates.email && { email: updates.email }),
      ...(updates.gender && { gender: updates.gender }),
      ...(updates.job_title && { job_title: updates.job_title }),
    };

    const user = await User.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }, // returns updated document
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      msg: 'User updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error updating user', error });
  }
};

const handleDeleteUserById = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.status(201).json({ msg: 'User deleted successfully...!!' });
};

const handleCreateUSer = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: 'All fileds are required...' });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  res
    .status(201)
    .json({ msg: 'User created successfully..!!', id: result._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUSer,
};
