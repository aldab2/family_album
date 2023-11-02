import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Family from '../models/familyModel.js'
import generateToken from '../utils/generateToken.js';

/**
 * @desc Auth user/set token
 * @route POST /api/auth/authUser
 * @access Public
 *  @type {import("express").RequestHandler} */
const authUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      
          _id: user._id,
          firstName:user.firstName,
          lastName:user.lastName,
          email:user.email,
          userName:user.userName,
          family: user.family,
          role:user.role
        
      
    });
  }
  else {
    res.status(401);
    throw new Error("Invalid username or password");
  }

});


/**
* @desc Create a new Family Space 
* @route POST /api/auth/family
* @access Public
*  @type {import("express").RequestHandler} */
const registerFamily = asyncHandler(async (req, res) => {
  const { firstName, lastName, familyName, userName, email, password } = req.body;

  const userExists = await User.findOne({ userName: userName });
  if (userExists) {
    res.status(400);
    throw new Error('User already exsits');
  }

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    password: password,
    email: email,
    role:"parent"
  })
  const family = await Family.create({
    familyName: familyName,
    familyMembers: [user._id]
  })

  await User.updateOne({ _id: user._id }, { $set: { family: family._id } });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: family._id,
      familyName,
      familyMembers: [
        {
          _id: user._id,
          firstName,
          lastName,
          email,
          userName,
          role:user.role
        }
      ]
    });
  }
  else {
    res.status(400);
    throw new Error("Invalid User Data");
  }


  //res.status(200).send({message : "Register Family"})
});


/**
* @desc Get family profile
* @route GET /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const getFamilyProfile = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "Logout User" })
});

/**
* @desc update family profile
* @route PUT /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const editFamilyProfile = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "Edit Family" })
});


/**
* @desc delete family profile
* @route DELETE /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const deleteFamilyProfile = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "Delete Family" })
});



/**
* @desc Create a new user to the family 
* @route POST /api/auth/user
* @access Private
*  @type {import("express").RequestHandler} */
const createUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "Create User" })
});

/**
* @desc Get user profile
* @route GET /api/auth/user
* @access Private
*  @type {import("express").RequestHandler} */
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).send( req.user);
});


/**
 * @desc Edit a user 
 * @route PUT /api/auth/user
 * @access Private
 *  @type {import("express").RequestHandler} */
const editUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "Edit User" })
});


/**
 * @desc Delete user
 * @route DELETE /api/auth/user
 * @access Private
 *  @type {import("express").RequestHandler} */
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "Delete User" })
});


/**
* @desc Logout user
* @route POST /api/auth/logout
* @access Public
*  @type {import("express").RequestHandler} */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt','',{
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).send({ message: "User logged out" })
});




export {
  authUser,
  registerFamily,
  getFamilyProfile,
  editFamilyProfile,
  deleteFamilyProfile,
  createUser,
  getUserProfile,
  editUser,
  deleteUser,
  logoutUser
};