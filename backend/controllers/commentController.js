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
    const { content, commentId } = req.body;




    const commentUpdate = {
        content, // Assuming 'content' is the field to be updated
        edited: true
    };

    try {
        let updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId }, // Use '_id' to query by ID
            commentUpdate,
            { new: true } // Return the updated document
        );
        
        // Check if the comment was found and updated
        if (updatedComment) {
            if(updatedComment.author != req.user.userName){
                res.status(401);
                throw new Error("Cannot edit a comment that is not yours")
            }
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


// async function deleteComment(req, res) {
//     const {
//         id
//     } = req.body
//     try {
//         let mdb = await Comment.findOneAndDelete({id})
//         await Post.findOneAndUpdate(
//             { _id: postId },
//             { $pull: { comments: newComment._id } },
//         )
//         res.json(mdb)
//     } catch (error) {
//         res.json(error)
//     }
// }


async function deleteComment(req, res) {
    const { id } = req.body;  // Extracting `id` from `req.body`
    try {
        let deletedComment = await Comment.findOneAndDelete({ _id: id });
        if (deletedComment) {
            if(deletedComment.author != req.user.userName && req.user.role != 'parent'){
                res.status(401);
                throw new Error("You are not authorized to delete this comment")
            }
            await Post.findOneAndUpdate(
                { _id: deletedComment.postId },  // Assuming `postId` is stored on the comment
                { $pull: { comments: id } }
            );
            res.json({ message: "Comment deleted successfully" });
        } else {
            res.status(404)
            throw new Error("Comment not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500)
        throw new Error(error)
    }
}





export {
    addComment,
    editComment,
    deleteComment
}