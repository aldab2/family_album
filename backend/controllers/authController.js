import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Family from '../models/familyModel.js'
import Post from '../models/postModel.js'
import { generateToken, releaseToken } from '../utils/jwtUtils.js';
import { FamilyCreateDTO, FamilyReadDTO } from '../DTOs/FamilyDTOs.js';
import { UserCreateDTO, UserReadDTO, UserUpdateDTO } from '../DTOs/UserDTOs.js';
import changePasswordAndSave from '../utils/authUtils.js';
import { getRandomActivationCode } from '../utils/util.js';
import { sendVerificationEmail } from '../utils/emailUtils.js';

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
  
  try {
    
    const familyCreateDTO = new FamilyCreateDTO(req.body);
  
    const userExists = await User.findOne({ userName: familyCreateDTO.userName });
    if (userExists) {
      res.status(400);
      throw new Error('User already exsits');
    }
    const familyExists = await Family.findOne({spaceName: familyCreateDTO.spaceName})
    if (familyExists) {
      res.status(400);
      throw new Error('Family already exsits');
    }
  
    const user = await User.create({
      ...familyCreateDTO,
      role: 'parent',
      //avtive false in log in check if active or not 
      active: false,
      activationCode: getRandomActivationCode()
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
     req.user = user;
      //await sendVerificationEmail(req, res);
      res.status(201).json(familyReadDto);
    }
    else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
    
  }
});


/**
* @desc Get family profile
* @route GET /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const getFamilyProfile = asyncHandler(async (req, res) => {
  const familyId = req.query.familyId || req.user.family;
  const familyObject = await Family.findOne({ _id: familyId }).populate('familyMembers');
  if(familyObject){

    const familyReadDto = new FamilyReadDTO(familyObject);
    res.status(200).json(familyReadDto);
  }
  else {
    res.status(400)
    throw new Error("Family not found")
  }
});

/**
* @desc update family profile
* @route PUT /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const editFamilyProfile = asyncHandler(async (req, res) => {
  const familyId = req.user.family;
  try {
    const editedFamily = await Family.findOneAndUpdate(
      { _id: familyId },
      { spaceName: req.body.spaceName },
      { new: true }
    )
    res.status(200).json(new FamilyReadDTO(editedFamily))
  } catch (error) {
    res.status(400);
    throw new Error("Couldn't update family profile");
  }
});


/**
* @desc delete family profile
* @route DELETE /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const deleteFamilyProfile = asyncHandler(async (req, res) => {
  //still needs finilizing
  try {
    // find posts
    const posts = await Post.find(
      { family: req.user.family }
    )
    // delete posts
    const postDeletion = await Promise.all(posts.map(async post => {
      const res = await fetch('/api/post', {
        method: 'DELETE',
        body: JSON.stringify({id: post._id})
      })
      const data = await res.json()
      return data
    }))
    // delete family
    const familyDeletion = await Family.deleteOne(
      { _id: req.user.family }
    )
    res.status(200).json({familyDeletion, postDeletion})
  } catch (error) {
    res.status(400);
    throw new Error("Couldn't update family profile");
  }
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
        throw new Error('A family cannot have more than two parents.');
      }
    }


    // User is active if its a child or the user's email is not provided.
    const isActive = userCreateDto.role === "child" || !userCreateDto.email
    const user = await User.create({
      ...userCreateDto,
      active: isActive,
      family: req.user.family,
      activationCode: getRandomActivationCode()
    })


    if (user) {
      await Family.updateOne({ _id: req.user.family }, { $addToSet: { familyMembers: user._id } });

      if (!isActive) {
      req.user = user;
      await sendVerificationEmail(req, res);
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
  const userId = req.query.userId || req.user.id
  const userReadDTO = new UserReadDTO(await User.findOne({ _id: userId }));
  res.status(200).json(userReadDTO);

});


/**
 * @desc Edit a user 
 * @route PUT /api/auth/user
 * @access Private
 *  @type {import("express").RequestHandler} */
const editFamilyMember = asyncHandler(async (req, res) => {
  const userUpdateDTO = new UserUpdateDTO(req.body);

  const user = await User.findOne({ userName: userUpdateDTO.currentUserName, family: req.user.family });
  if (user) {
    if (user.role === userUpdateDTO.role) {
      // Role provided but it's the same as the current one, so no error should be thrown.
      delete userUpdateDTO.role; // Ignore the role in the update as it's unchanged.
    }

    // if the role was provided and the user is initially a perent throw error because parent role cannot be changed
    if (user.role === 'parent' && userUpdateDTO.role) {
      res.status(400);
      throw new Error(`parent role cannot be changed`);
    }
    
    // child and adult roles cannot be changed to parent role
    if ((user.role === 'child' || user.role === 'adult') && userUpdateDTO.role === 'parent') {
      res.status(400);
      throw new Error(`childs and adults cannot become parents`);
    }

    // if the password was provided and it is diffirent from the current password change is and change the user active status
    if (userUpdateDTO.password) {
      const passwordMatches = await user.matchPassword(userUpdateDTO.password);
      if (!passwordMatches) {
        user.password = userUpdateDTO.password;
        // The user is active if it is a child role or it does not have an email, else its inactive
        user.active = user.role === "child" || !user.email || userUpdateDTO.role === "child" || !userUpdateDTO.email
        if (user.active === false) {
          req.user = user;
          await sendVerificationEmail(req, res);
        }

      }
      else {
        res.status(403)
        throw new Error(`provided password cannot be the same as current password `);
     
      }

    }
    

    // remove the passowrd from the DTO
    delete userUpdateDTO.password;

    //update the user 
    Object.assign(user, userUpdateDTO);

    //save the user
    await user.save();


    const userReadDTO = new UserReadDTO(user);
    res.status(200).json(userReadDTO);




  }
  else {
    res.status(404);
    throw new Error(`User ${userUpdateDTO.currentUserName} was not found in your family`);
  }


});


/**
 * @desc Delete user
 * @route DELETE /api/auth/user
 * @access Private
 * @type {import("express").RequestHandler} */
// const deleteFamilyMember = asyncHandler(async (req, res) => {
//   const { userName } = req.body;

//   const user = await User.findOne({ userName: userName, family: req.user.family });
//   if(user){
//     if(user.userName === userName){
//       res.status(400);
//       throw new Error("Cannot delete your account");
//     }
//     if(user.role === 'parent'){

//       res.status(400);
//       throw new Error("Cannot delete another parent");
//     }

//     const family = await Family.findOneAndUpdate({ _id: req.user.family }, { $pull: { familyMembers: user._id } },
//       { new: true } // Ensure you get the updated family document
//     ).populate('familyMembers');
//     const familyReadDTO = new FamilyReadDTO(family);
//     await User.deleteOne({ userName });

//     res.status(204).json(familyReadDTO)

//   }
//   else {
//     res.status(400);
//     throw new Error(`User ${userName} was not found in your family`);
//   }

// });
const deleteFamilyMember = asyncHandler(async (req, res) => {
  const { userName } = req.body; // userName of the user to delete
  const currentUser = req.user; // Assuming `req.user` contains the current user's info

  // Prevent users from deleting their own account via this route
  if (userName === currentUser.userName) {
    return res.status(400).json({ message: "Cannot delete your own account" });
  }

  const userToDelete = await User.findOne({ userName: userName, family: currentUser.family });

  if (!userToDelete) {
    return res.status(404).json({ message: `User ${userName} not found in your family` });
  }

  // Additional checks, e.g., prevent deleting other parents, if applicable
  if (userToDelete.role === 'parent' && currentUser.role !== 'admin') {
    return res.status(403).json({ message: "Cannot delete another parent" });
  }

  // Proceed with user deletion
  await Family.updateOne({ _id: currentUser.family }, { $pull: { familyMembers: userToDelete._id } });
  await User.deleteOne({ _id: userToDelete._id });

  res.status(204).send(); // No content to send back
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
  if (!user.active) {
    user.active = true;
  }

  await changePasswordAndSave(res, currentPassword, newPassword, user);

  // Logout the user by clearing the JWT token cookie
  releaseToken(res)
  res.status(200).send({ message: "Password changed." })
});

const verifyCode = asyncHandler(async (req, res) => {
  const { code } = req.body
  if(req.user.active){
    res.status(400);
    throw new Error("User is already activated");
  }
  const user = await User.findOne({_id:req.user.id})
  if (code == user.activationCode) {
  
    const user = await User.findOne({userName: req.user.userName});
    user.active = true;
    await user.save();
    res.status(200).json(new UserReadDTO(user))
  } else {
    res.status(400)
    throw new Error(`VerificationCode does not match.` )
  }
})


/**
 * @desc Get new verification code
 * @route GET /api/auth/getVerificationCode
 * 
 */
const getNewVerificationCode = asyncHandler(async (req, res) => {
  try {
    const newCode = getRandomActivationCode()
    const updatedUser = User.findOneAndUpdate(
      { _id: req.user._id },
      { activationCode: newCode },
      { new: true }
    )
    req.user.activationCode = newCode
    await sendVerificationEmail(req, res);
    res.status(200).json({ code: newCode })
  } catch (error) {
    res.status(400)
    throw new Error("Something went wrong")
  }
})


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
  changePassword,
  verifyCode,
  getNewVerificationCode
};