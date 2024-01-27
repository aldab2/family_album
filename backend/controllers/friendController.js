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
    const receivedFriendRequests = await FriendReqest.find({ recipientFamilyId: familyId })
    const sentFriendRequests = await FriendReqest.find({ senderFamilyId: familyId })
    res.json({
      received: receivedFriendRequests,
      sent: sentFriendRequests
    })
  });


// send friend request
const sendFriendRequest = asyncHandler(async (req, res) => {

    const senderFamilyId = req.user.family
    const senderFirstName = req.user.firstName
    const senderFamily = await Family.findOne({ _id: senderFamilyId })
    const senderSpaceName = senderFamily.spaceName
    const {
      recipientFamilyId
    } = req.body
  
    // If trying to add self
    if (senderFamilyId.equals(recipientFamilyId)) {
      res.status(400).send("You can't add yourself as a friend.")
      return
    }

    // If already friends
    let stringifiedFriendIds = senderFamily.friends.map(id => id.toString())
    if (stringifiedFriendIds.includes(recipientFamilyId.toString())) {
      res.status(400).send("This Family already a friend.")
      return
    }

    const newFriendRequest = new FriendReqest({
      senderFamilyId,
      senderFirstName,
      senderSpaceName,
      recipientFamilyId
    })

    try {
      await newFriendRequest.save()
      res.send("Success")
    } catch (error) {
      console.log(error)
      res.status(500).send("Error when trying to create friend request.")
    }
})

// delete friend request
const deleteFriendRequest = asyncHandler(async (req, res) => {
  const {
    id
  } = req.body

  try {
    await FriendReqest.findOneAndDelete({ _id: id })
    res.send("")
  } catch (error) {
    res.status(404).end()
  }
})


//accepts friend request
const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { id } = req.body; // ID of the friend request
  const recipientFamilyId = req.user.family; // The recipient's family ID, assumed to be the current user's family

  try {
    // Fetch the friend request, recipient family, and sender family in one go to reduce database calls
    const friendRequest = await FriendReqest.findOne({ _id: id });
    if (!friendRequest) {
      return res.status(404).send("Friend request not found.");
    }

    const [recipientFamily, senderFamily] = await Promise.all([
      Family.findOne({ _id: recipientFamilyId }),
      Family.findOne({ _id: friendRequest.senderFamilyId })
    ]);

    // Check if the friend request is intended for the recipient
    if (!recipientFamilyId.equals(friendRequest.recipientFamilyId)) {
      return res.status(401).json({
        message: "This friend request is not for you",
        recipientFamilyId,
        senderFamilyId: friendRequest.senderFamilyId
      });
    }

    // Check for an existing friendship in both directions
    if (recipientFamily.friends.includes(friendRequest.senderFamilyId.toString()) && senderFamily.friends.includes(recipientFamilyId.toString())) {
      return res.status(400).send("The friend request has already been accepted.");
    }

    // Start a session for a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Add each other to their friends lists
      recipientFamily.friends.push(friendRequest.senderFamilyId);
      senderFamily.friends.push(recipientFamilyId);

      // Save both families and update the friend request status within the transaction
      await Promise.all([
        recipientFamily.save({ session }),
        senderFamily.save({ session }),
        FriendReqest.findOneAndUpdate({ _id: id }, { status: 'accepted' }, { session })
      ]);

      // Commit the transaction
      await session.commitTransaction();
      res.send("Friend request accepted successfully.");
    } catch (error) {
      // Abort the transaction in case of error
      await session.abortTransaction();
      console.error("Error accepting friend request:", error);
      res.status(500).json({ message: "Failed to accept friend request." });
    } finally {
      // End the session
      session.endSession();
    }
  } catch (error) {
    console.error("Error finding documents:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});


const rejectFriendRequest  = asyncHandler(async (req, res) => {
  const { id } = req.body; // ID of the friend request to reject
  const recipientFamilyId = req.user.family; // The recipient's family ID, assumed to be the current user's family

  try {
    // Fetch the friend request to ensure it exists and is intended for the recipient
    const friendRequest = await FriendReqest.findOne({ _id: id });
    if (!friendRequest) {
      return res.status(404).send("Friend request not found.");
    }

    // Check if the friend request is intended for the recipient
    if (!recipientFamilyId.equals(friendRequest.recipientFamilyId)) {
      return res.status(401).json({
        message: "This friend request is not for you",
        recipientFamilyId
      });
    }

    // Update the friend request status to 'rejected'
    await FriendReqest.findOneAndUpdate({ _id: id }, { status: 'rejected' });

    res.send("Friend request rejected successfully.");
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    res.status(500).json({ message: "An error occurred while rejecting the friend request." });
  }
});

const getFamilyFriends = async (req, res) => {
  try {
    const friends = await Family.find({ _id: req.user.family }).populate('friends')
    res.json(friends)
  } catch (error) {
    console.log(error)
    res.send("something went wrong")
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


    res.send("No errors")

  } catch (error) {
    console.log(error)
    res.send("something went wrong")
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




