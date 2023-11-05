import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Family from '../models/familyModel.js'
import generateToken from '../utils/generateToken.js';
import { FamilyCreateDTO, FamilyReadDTO } from '../DTOs/FamilyDTOs.js';
import { UserCreateDTO, UserReadDTO } from '../DTOs/UserDTOs.js';

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
    res.status(200).json(new UserReadDTO(user));
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
  const familyCreateDTO = new FamilyCreateDTO(req.body);

  const userExists = await User.findOne({ userName: familyCreateDTO.userName });
  if (userExists) {
    res.status(400);
    throw new Error('User already exsits');
  }

  const user = await User.create({
   ...familyCreateDTO,
   role:'parent',
   active:true
  }) 
  const family = await Family.create({
    spaceName: familyCreateDTO.spaceName,
    familyMembers: [user._id]
  })

  await User.updateOne({ _id: user._id }, { $set: { family: family._id } });

  if (user) {
    generateToken(res, user._id);
    family.familyMembers = [user];
    const familyReadDto = new FamilyReadDTO(family);
    res.status(201).json(familyReadDto);
  }
  else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});


/**
* @desc Get family profile
* @route GET /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const getFamilyProfile = asyncHandler(async (req, res) => {
  const familyId = req.user.family;
  const familyReadDto = new FamilyReadDTO(await  Family.findOne({_id:familyId}).populate('familyMembers'));
  res.status(200).json(familyReadDto);
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
const addFamilyMember = asyncHandler(async (req, res) => {
  const userCreateDto = new UserCreateDTO(req.body);

  const userExists = await User.findOne({ userName: userCreateDto.userName });
  if (userExists) {
    res.status(400);
    throw new Error('User already exsits');
  }

  const isActive = userCreateDto.role === "child" || !userCreateDto.email
  const user = await User.create({
   ...userCreateDto,
   active:isActive,
   family:req.user.family
  }) 
 
  await Family.updateOne({ _id: user.family }, { $set: { family: family._id } });

  if (user) {
    generateToken(res, user._id);
    family.familyMembers = [user];
    const familyReadDto = new FamilyReadDTO(family);
    res.status(201).json(familyReadDto);
  }
  else {
    res.status(400);
    throw new Error("Invalid User Data");


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
  addFamilyMember
,
  getUserProfile,
  editUser,
  deleteUser,
  logoutUser
};