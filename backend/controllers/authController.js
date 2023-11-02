import asyncHandler from 'express-async-handler'

/**
 * @desc Auth user/set token
 * @route POST /api/auth/authUser
 * @access Public
 *  @type {import("express").RequestHandler} */
const authUser = asyncHandler((req,res) => {
 res.status(200).send({message : "auth user endpoint"})
});


  /**
 * @desc Create a new Family Space 
 * @route POST /api/auth/family
 * @access Public
 *  @type {import("express").RequestHandler} */
  const registerFamily = asyncHandler((req,res) => {
    res.status(200).send({message : "Register Family"})
   });


 /**
 * @desc Get family profile
 * @route GET /api/auth/family
 * @access Private
 *  @type {import("express").RequestHandler} */
const getFamilyProfile = asyncHandler((req,res) => {
    res.status(200).send({message : "Logout User"})
   }); 
   
    /**
 * @desc update family profile
 * @route PUT /api/auth/family
 * @access Private
 *  @type {import("express").RequestHandler} */
const editFamilyProfile = asyncHandler((req,res) => {
    res.status(200).send({message : "Edit Family"})
   }); 

 
       /**
 * @desc delete family profile
 * @route DELETE /api/auth/family
 * @access Private
 *  @type {import("express").RequestHandler} */
const deleteFamilyProfile = asyncHandler((req,res) => {
    res.status(200).send({message : "Delete Family"})
   }); 



   /**
 * @desc Create a new user to the family 
 * @route POST /api/auth/user
 * @access Private
 *  @type {import("express").RequestHandler} */
const createUser = asyncHandler((req,res) => {
    res.status(200).send({message : "Create User"})
   });

   /**
 * @desc Get user profile
 * @route GET /api/auth/user
 * @access Private
 *  @type {import("express").RequestHandler} */
const getUserProfile = asyncHandler((req,res) => {
    res.status(200).send({message : "Get User"})
   }); 


/**
 * @desc Edit a user 
 * @route PUT /api/auth/user
 * @access Private
 *  @type {import("express").RequestHandler} */
const editUser = asyncHandler((req,res) => {
    res.status(200).send({message : "Edit User"})
   });


/**
 * @desc Delete user
 * @route DELETE /api/auth/user
 * @access Private
 *  @type {import("express").RequestHandler} */
const deleteUser = asyncHandler((req,res) => {
    res.status(200).send({message : "Delete User"})
   });


 /**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Public
 *  @type {import("express").RequestHandler} */
const logoutUser = asyncHandler((req,res) => {
    res.status(200).send({message : "Logout User"})
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