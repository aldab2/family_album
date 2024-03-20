import asyncHandler from 'express-async-handler'
import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId
import FriendReqest from "../models/friendRequestModel.js"
import { get } from 'http'
import Family from '../models/familyModel.js'
import { FamilyReadDTO } from '../DTOs/FamilyDTOs.js'
import { addFamilyMember } from './authController.js'



/**
* @desc Get friend requests 
* @route GET /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const getFriendRequests = asyncHandler(async (req, res) => {
  try{  
  const familyId = req.user.family;
    const receivedFriendRequests = await FriendReqest.find({ recipientFamily: familyId })
    .populate({
        path: 'senderFamily',
        populate: {
            path: 'familyMembers',
            model: 'User',
            select: 'firstName lastName role' // Select only the desired fields
        }
    });
    const sentFriendRequests = await FriendReqest.find({ senderFamily: familyId })
        .populate({
            path: 'recipientFamily',
            populate: {
                path: 'familyMembers',
                model: 'User',
                select: 'firstName lastName role'

            }
        });
  
    res.json({
      received: receivedFriendRequests,
      sent: sentFriendRequests
    }) 
  }
    catch(error){ 
    console.log(error)
      res.status(500);
      throw new Error("Error when trying to create friend request.");
    }
  
  });


// send friend request
const sendFriendRequest = asyncHandler(async (req, res) => {

    const senderFamilyId = req.user.family
    // const senderFirstName = req.user.firstNamec
    const senderFamily = await Family.findOne({ _id: senderFamilyId })
    
    // const senderSpaceName = senderFamily.spaceName
    const {
      recipientspaceName

    } = req.body
    const recipientFamily = await Family.findOne({ spaceName: recipientspaceName })
    const recipientFamilyId = recipientFamily._id
    
  
    if(!recipientFamilyId){
      res.status(404);
      throw new Error("Recipient Family not found")
    }
    // If trying to add self
    if (senderFamilyId.equals(recipientFamilyId)) {
      res.status(400);
      throw new Error("You can't add yourself as a friend.");
    }
    
    // If already friends
    console.log(senderFamily);
    if(senderFamily?.friends){
    let stringifiedFriendIds = senderFamily.friends.map(id => id.toString())
    if (stringifiedFriendIds.includes(recipientFamilyId.toString())) {
      res.status(400);
      throw new Error("This Family already a friend.");
    }
  }

    // gpt Check if there is already a pending or accepted friend request
  const existingRequest = await FriendReqest.findOne({
    $or: [
      { senderFamily: senderFamilyId, recipientFamily: recipientFamilyId },
      { senderFamily: recipientFamilyId, recipientFamily: senderFamilyId }
    ],
    status: { $in: ['pending', 'accepted'] }
  });

  if (existingRequest) {
    res.status(400);
    throw new Error("A friend request already exists.");
  }

    const newFriendRequest = new FriendReqest({
      senderFamily,
      recipientFamily
    })

    try {
      await newFriendRequest.save()
      res.send(newFriendRequest)
    } catch (error) {
      console.log(error)
      res.status(500);
      throw new Error("Error when trying to create friend request.");
    }
})

// delete friend request
const deleteFriendRequest = asyncHandler(async (req, res) => {
  const {
    id
  } = req.body

  try {
    const friendRequest = await FriendReqest.findOne({ _id: id })
    if (
      !friendRequest.senderFamily.equals(id) &&
      !friendRequest.recipientFamily.equals(id)
    ) {
      res.status(401)
      throw new Error("You are not authorized to delete this friend request.")
    }
    //delete Friend Request
    FriendReqest.deleteOne({ _id: id })
    res.send("Friend request deleted")
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
})


//accepts friend request
const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { id } = req.body.id; // ID of the friend request
  const recipientFamilyId = req.user.family; // The recipient's family ID, assumed to be the current user's family

  try {

    const friendRequest = await FriendReqest.findOne({ _id: id, recipientFamily: recipientFamilyId });
    if (!friendRequest) {
      res.status(404)
      throw new Error("Friend request not found or you are not authorized to accept the reqest.")
    }
   
    
    const [recipientFamily, senderFamily] = await Promise.all([
      Family.findOne({ _id: recipientFamilyId }),
      Family.findOne({ _id: friendRequest.senderFamily })
    ]);

    // Check for an existing friendship in both directions
    if (recipientFamily.friends.includes(friendRequest.senderFamily.toString()) && senderFamily.friends.includes(recipientFamily.toString())) {
      res.status(400);
      throw new Error("The friend request has already been accepted.");
    }
      // Add each other to their friends lists
    recipientFamily.friends.push(friendRequest.senderFamily);
    senderFamily.friends.push(recipientFamilyId);

    // Save both families and update the friend request status
    await Promise.all([
      recipientFamily.save(),
      senderFamily.save(),
      //FriendReqest.findOneAndUpdate({ _id: id }, { status: 'accepted' })
      //delete the friend request after it has been accepted
      FriendReqest.deleteOne({ _id: id })

    ]);

    res.send("Friend request accepted successfully.");
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500);
    throw new Error("Failed to accept friend request." );
  } 
});


const rejectFriendRequest  = asyncHandler(async (req, res) => {
  const { id } = req.body.id; // ID of the friend request to reject
  const recipientFamilyId = req.user.family; // The recipient's family ID, assumed to be the current user's family

  try {
    // Fetch the friend request to ensure it exists and is intended for the recipient
    const friendRequest = await FriendReqest.findOne({ _id: id, recipientFamily: recipientFamilyId });
    if (!friendRequest) {
      res.status(404);
      throw new Error("Friend request not found or you are not authorized to reject.");
    }


    // Update the friend request status to 'rejected'
    //await FriendReqest.findOneAndUpdate({ _id: id }, { status: 'rejected' });
    // Delete the friend request
    await FriendReqest.deleteOne({ _id: id });


    res.send("Friend request rejected and deleted successfully.");
  } catch (error) {
    console.error("Error rejecting and deleting friend request:", error);
    res.status(500);
    throw new Error(error);
  }
});

// const getFamilyFriends = async (req, res) => {
//   try {
//     const friends = await Family.find({ _id: req.user.family }).populate('friends').populate('familyMembers')
//     res.json(friends)
//   } catch (error) {
//     console.log(error)
//     res.status(500);
//     throw new Error(error);
//   }
// }

const getFamilyFriends = async (req, res) => {
  try {
    // Assuming req.user.family contains the ID of your family
    const yourFamily = await Family.findById(req.user.family);
    // Get the IDs of your friends
    const friendIds = yourFamily.friends;
 
    // Find the families of your friends and populate their family members
    const friendsWithFamilyMembers = await Family.find({ _id: { $in: friendIds } })
      .populate('familyMembers');
 
    res.json(friendsWithFamilyMembers);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error);
  }
}

const removeFamilyFriend = async (req, res) => {
  const {
    toRemoveId
  } = req.body.id

  try {
    const selfFamily = await Family.findOne({ _id: req.user.family });
    const removalFamily = await Family.findOne({ _id: toRemoveId });

  
    
    let selfTargetIndex = selfFamily.friends.indexOf(toRemoveId);
    if (selfTargetIndex >= 0) {
      selfFamily.friends.splice(selfTargetIndex, 1);
      await selfFamily.save();
    }
    let removalTargetIndex = removalFamily.friends.indexOf(req.user.family);
    if (removalTargetIndex >= 0) {
      removalFamily.friends.splice(removalTargetIndex, 1);
      await removalFamily.save();
    }

  
    res.status(200).json(removalFamily);

  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error);
  }
}

export {
    getFriendRequests,
    sendFriendRequest,
    deleteFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFamilyFriends,
    removeFamilyFriend
}




