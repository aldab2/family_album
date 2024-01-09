import mongoose from "mongoose"
import asyncHandler from 'express-async-handler'
import Post from "../models/postModel.js"
import Comment from "../models/commentModel.js"
import expressAsyncHandler from "express-async-handler"

async function addComment(req, res) {
    const {
        content,
        postId
    } = req.body
    const comment = {
        content,
        postId,         //check if needs auth changes
        author: req.user.userName,
        userId: req.user.id,
        family: req.user.family,
    }
    const newComment = new Comment(comment)
    try {
        let mdb = await newComment.save()
        await Post.findOneAndUpdate(
            { _id: postId },
            { $push: { comments: newComment._id } },
        )
        res.json(mdb)
    } catch (error) {
        res.json(error)
    }
}

const  editComment = asyncHandler(async(req, res) => {
    const { content, Id } = req.body;

    const commentUpdate = {
        content, // Assuming 'content' is the field to be updated
        edited: true
    };

    try {
        let updatedComment = await Comment.findOneAndUpdate(
            { _id: Id }, // Use '_id' to query by ID
            commentUpdate,
            { new: true } // Return the updated document
        );

        // Check if the comment was found and updated
        if (updatedComment) {
            res.json(updatedComment);
        } else {
            res.status(404);
            throw new Error("Comment not found");
        }
    } catch (error) {
        res.status(500);
        throw new Error(error)
    }
})


async function deleteComment(req, res) {
    const {
        id
    } = req.body
    try {
        let mdb = await Comment.findOneAndDelete({id})
        await Post.findOneAndUpdate(
            { _id: postId },
            { $pull: { comments: newComment._id } },
        )
        res.json(mdb)
    } catch (error) {
        res.json(error)
    }
}


export {
    addComment,
    editComment,
    deleteComment
}