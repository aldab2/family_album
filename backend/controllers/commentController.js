import mongoose from "mongoose"
import Post from "../models/postModel.js"
import Comment from "../models/commentModel.js"

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
        res.json(mdb)
    } catch (error) {
        res.json(error)
    }
}

async function editComment(req, res) {
    const {
        content,
        id
    } = req.body
    const comment = {
        content, //check if needs auth changes
        edited: true
    }
    try {
        let mdb = await Comment.findOneAndUpdate({id},
        {
            ...comment
        })
        res.json(mdb)
    } catch (error) {
        res.json(error)
    }
}

async function deleteComment(req, res) {
    const {
        id
    } = req.body
    try {
        let mdb = await Comment.findOneAndDelete({id})
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