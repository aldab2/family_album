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
const addFriendRequest = asyncHandler(async (req, res) => {

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
      res.status(400).send("Already friends")
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

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const {
    id
  } = req.body
  const recipientFamilyId = req.user.family;
  
  try {
    const friendRequest = await FriendReqest.findOne({_id: id})
    const recipientFamily = await Family.findOne({_id: recipientFamilyId})
    const senderFamily = await Family.findOne({_id: friendRequest.senderFamilyId})
    const {senderFamilyId} = senderFamily
    
   

    if (!recipientFamilyId.equals(friendRequest.recipientFamilyId)) {
      res.status(401).json({
        message: "This friend request is not for you",
        senderFamilyId,
        recipientFamilyId
      })
      return
    }

    recipientFamily.friends.push(friendRequest.senderFamilyId)
    senderFamily.friends.push(recipientFamilyId)
    await recipientFamily.save()
    await senderFamily.save()
    await FriendReqest.findOneAndUpdate({_id: id}, {status: 'accepted'})
    res.send("Success")
  } catch (error) {
    console.log(error)
    res.status(404).json(error) 
  }  
});


const rejectFriendrequest = asyncHandler(async (req, res) => {
  const {
    id
  } = req.body
  const recipientFamilyId = req.user.family;
  
  try {
    const friendRequest = await FriendReqest.findOne({_id: id})
    const recipientFamily = await Family.findOne({_id: recipientFamilyId})
    
    

   

    if (!recipientFamilyId.equals(friendRequest.recipientFamilyId)) {
      res.status(401).json({
        message: "This friend request is not for you",
        recipientFamilyId
      })
      return
    }

    await FriendReqest.findOneAndUpdate({_id: id}, {status: 'rejected'})
    res.send("Friend request rejected")
  } catch (error) {
    console.log(error)
    res.status(404).json(error) 
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
    addFriendRequest,
    deleteFriendRequest,
    acceptFriendRequest,
    rejectFriendrequest,
    getFamilyFriends,
    removeFamilyFriend
}




