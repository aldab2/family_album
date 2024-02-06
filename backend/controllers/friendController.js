import asyncHandler from 'express-async-handler'
import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId
import FriendReqest from "../models/friendRequestModel.js"
import { get } from 'http'
import Family from '../models/familyModel.js'
import { FamilyReadDTO } from '../DTOs/FamilyDTOs.js'

/**
* @desc Get friend requests 
* @route GET /api/auth/family
* @access Private
*  @type {import("express").RequestHandler} */
const getFriendRequests = asyncHandler(async (req, res) => {
    const familyId = req.user.family;
    const receivedFriendRequests = await FriendReqest.find({ recipientFamily: familyId })
    const sentFriendRequests = await FriendReqest.find({ senderFamily: familyId })
    res.json({
      received: receivedFriendRequests,
      sent: sentFriendRequests
    })
  });


// send friend request
const sendFriendRequest = asyncHandler(async (req, res) => {

    const senderFamilyId = req.user.family
    // const senderFirstName = req.user.firstName
    const senderFamily = await Family.findOne({ _id: senderFamilyId })
    // const senderSpaceName = senderFamily.spaceName
    const {
      recipientFamilyId
    } = req.body
  
    // If trying to add self
    if (senderFamilyId.equals(recipientFamilyId)) {
      res.status(400);
      throw new Error("You can't add yourself as a friend.");
    }

    // If already friends
    let stringifiedFriendIds = senderFamily.friends.map(id => id.toString())
    if (stringifiedFriendIds.includes(recipientFamilyId.toString())) {
      res.status(400);
      throw new Error("This Family already a friend.");
    }

    const newFriendRequest = new FriendReqest({
      senderFamily,
      // senderFirstName,
      // senderSpaceName,
      recipientFamily: recipientFamilyId
    })

    try {
      await newFriendRequest.save()
      res.send("Success")
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
    res.send("Friend request deleted")
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
})


//accepts friend request
const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { id } = req.body; // ID of the friend request
  const recipientFamilyId = req.user.family; // The recipient's family ID, assumed to be the current user's family

  try {

    const friendRequest = await FriendReqest.findOne({ _id: id, recipientFamily: recipientFamilyId });
    if (!friendRequest) {
      res.status(404)
      throw new Error("Friend request not found.")
    }
    // error source will unknow if removed 
    // Check if the friend request is intended for the recipient
    // if (!recipientFamilyId.equals(friendRequest.recipientFamily)) {
    //   return res.status(401).json({
    //     message: "This friend request is not for you",
    //     recipientFamilyId
    //   });
    // }
    
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
      FriendReqest.findOneAndUpdate({ _id: id }, { status: 'accepted' })
    ]);

    res.send("Friend request accepted successfully.");
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500);
    throw new Error("Failed to accept friend request." );
  } 
});


const rejectFriendRequest  = asyncHandler(async (req, res) => {
  const { id } = req.body; // ID of the friend request to reject
  const recipientFamilyId = req.user.family; // The recipient's family ID, assumed to be the current user's family

  try {
    // Fetch the friend request to ensure it exists and is intended for the recipient
    const friendRequest = await FriendReqest.findOne({ _id: id, recipientFamily: recipientFamilyId });
    if (!friendRequest) {
      res.status(404);
      throw new Error("Friend request not found.");
    }

    // Removing this is only efficient in terms of there being less lines of code, but now we don't get as useful error messages.
    // Check if the friend request is intended for the recipient
    // if (!recipientFamilyId.equals(friendRequest.recipientFamilyId)) {
    //   return res.status(401).json({
    //     message: "This friend request is not for you",
    //     recipientFamilyId
    //   });
    // }

    // Update the friend request status to 'rejected'
    await FriendReqest.findOneAndUpdate({ _id: id }, { status: 'rejected' });

    res.send("Friend request rejected successfully.");
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    res.status(500);
    throw new Error(error);
  }
});

const getFamilyFriends = async (req, res) => {
  try {
    const friends = await Family.find({ _id: req.user.family }).populate('friends')
    res.json(friends)
  } catch (error) {
    console.log(error)
    res.status(500);
    throw new Error(error);
  }
}

const removeFamilyFriend = async (req, res) => {
  const {
    toRemoveId
  } = req.body

  try {
    const selfFamily = await Family.findOne({ _id: req.user.family })
    const removalFamily = await Family.findOne({ _id: toRemoveId })

  
    
    let selfTargetIndex = selfFamily.friends.indexOf(toRemoveId)
    if (selfTargetIndex >= 0) {
      selfFamily.friends.splice(selfTargetIndex, 1)
      await selfFamily.save()
    }
    let removalTargetIndex = removalFamily.friends.indexOf(req.user.family)
    if (removalTargetIndex >= 0) {
      removalFamily.friends.splice(removalTargetIndex, 1)
      await removalFamily.save()
    }

    //CORRECT?
  
    res.json(removalFamily)

  } catch (error) {
    console.log(error)
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




