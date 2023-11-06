import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Family from '../models/familyModel.js'
import {generateToken , releaseToken} from '../utils/jwtUtils.js';
import { FamilyCreateDTO, FamilyReadDTO } from '../DTOs/FamilyDTOs.js';
import { UserCreateDTO, UserReadDTO } from '../DTOs/UserDTOs.js';
import { sendActivationEmail } from '../utils/emailUtils.js';
import changePasswordAndSave from '../utils/authUtils.js';

/**
 * @desc Auth user/set token
 * @route POST /api/auth/authUser
 * @access Public
 *  @type {import("express").RequestHandler} */
const login = asyncHandler(async (req, res) => {
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
    role: 'parent',
    active: true
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
  const familyReadDto = new FamilyReadDTO(await Family.findOne({ _id: familyId }).populate('familyMembers'));
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

  try {
    const userCreateDto = new UserCreateDTO(req.body);

  
    // If the created user is a parent, validate that there is only 1 parent
   // Check if the user is set to be a parent and validate the number of parents
   if (userCreateDto.role === 'parent') {
    const parentsCount = await User.countDocuments({ 
      family: req.user.family, 
      role: 'parent' 
    });

    if (parentsCount >= 2) {
      res.status(400)
      throw new Error('A family cannot have more than two parents.' );
    }
  }


    // User is active if its a child or the user's email is not provided.
    const isActive = userCreateDto.role === "child" || !userCreateDto.email
    const user = await User.create({
      ...userCreateDto,
      active: isActive,
      family: req.user.family
    })


    if (user) {
      await Family.updateOne({ _id: req.user.family }, { $addToSet: { familyMembers: user._id } });

      if (!isActive) {
        await sendActivationEmail(user);
      }

      // Populate the family members and format the response with the FamilyReadDTO
      const family = await Family.findOne({ _id: req.user.family }).populate('familyMembers');
      const updatedFamilyDTO = new FamilyReadDTO(family);
      res.status(201).json(updatedFamilyDTO);
    }
    else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    if (error.code === 11000) {
      // Attempt to parse the error message
      const field = Object.keys(error.keyPattern)[0]; // The field name
      const value = error.keyValue[field]; // The value that caused the duplicate key error
      const message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' is already used`;
      res.status(400);
      console.log(JSON.stringify(error.keyValue))
      throw new Error(message)
    } else {

      console.error(error); // Log the error for debugging purposes.
      throw new Error(error)
    }
  }

});

/**
* @desc Get user profile
* @route GET /api/auth/user
* @access Private
*  @type {import("express").RequestHandler} */
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).send(req.user);
});


/**
 * @desc Edit a user 
 * @route PUT /api/auth/user
 * @access Private
 *  @type {import("express").RequestHandler} */
const editFamilyMember = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "Edit User" })
});


/**
 * @desc Delete user
 * @route DELETE /api/auth/user
 * @access Private
 * @type {import("express").RequestHandler} */
const deleteFamilyMember = asyncHandler(async (req, res) => {
  const {userName} = req.body;

  if(req.user.userName === userName){
    res.status(400);
    throw new Error("Cannot delete your account");
  }

  const user = await User.findOne({userName});
  if(user){
    
    if(user.role === 'parent'){
      res.status(400);
      throw new Error("Cannot delete another parent");
    }

    const family = await Family.findOneAndUpdate({ _id: req.user.family }, { $pull: { familyMembers: user._id } },
      { new: true } // Ensure you get the updated family document
      ).populate('familyMembers');
    const familyReadDTO = new FamilyReadDTO(family);
    await User.deleteOne({userName});

    res.status(204).json(familyReadDTO)

  }
  else {
    throw new Error(`User ${userName} not found`);
  }

});


/**
* @desc Logout user
* @route POST /api/auth/logout
* @access Public
*  @type {import("express").RequestHandler} */
const logoutUser = asyncHandler(async (req, res) => {
  releaseToken(res);
  res.status(200).send({ message: "User logged out" });
});


/**
* @desc Change Password
* @route PUT /api/auth/change-password
* @access Private
*  @type {import("express").RequestHandler} */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  // change password

  //get the user to use save and matchPasword functions (not in the DTO)
  const user = await User.findById(req.user.id);
  // if user was not active, activate the user since the password was changed
  if(!user.active){
    user.active = true;
  }

  await changePasswordAndSave(res,currentPassword,newPassword,user);
  
  // Logout the user by clearing the JWT token cookie
  releaseToken(res)
  res.status(200).send({ message: "Password changed." })
});


export {
  login,
  registerFamily,
  getFamilyProfile,
  editFamilyProfile,
  deleteFamilyProfile,
  addFamilyMember,
  getUserProfile,
  editFamilyMember,
  deleteFamilyMember,
  logoutUser,
  changePassword
};