import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId
import Post from "../models/postModel.js"
import Comment from "../models/commentModel.js"

async function newPost(req, res, next) {
    const {
        content, 
        takenWith, 
        createdAt
    } = req.body
    // const newPost = new Post(userDTO(req.user))
    const post = {
        content,
        author: req.user.userName,
        userId: req.user.id,
        family: req.user.family,
    }
    if (takenWith) {
        post.takenWith = takenWith
    }
    if (createdAt) {
        
        post.createdAt = new Date(createdAt)
    }
    const newPost = new Post(post)
    try {
        let mdb = await newPost.save()
        res.json(mdb)
    } catch (error) {
        res.json(error)
    }
}

async function deletePost(req, res, next) {
    const {
        id
    } = req.body

    // console.log(new mongoose.Types.ObjectId(id))
    
    try {
        
        let postDeletion = await Post.findOneAndDelete({id})
        let commentDeletion = await Comment.deleteMany({
            postId: ObjectId(id)
        })
        
        res.json({
            postDeletion,
            commentDeletion
        })
    } catch (error) {
        res.json(error)
    }
}


async function getPost(req, res, next) {
    const familyPosts = await Post.find({
        family: req.user.family
    })
    res.json(familyPosts)
}

async function editPost(req, res) {
    const {
        content,
        id
    } = req.body
    const post = {
        content, //check if needs auth changes
        edited: true
    }
    try {
        let mdb = await Post.findOneAndUpdate({_id: id},
        {
            ...post
        }, {includeResultMetadata: true})
        res.json({mdb})
    } catch (error) {
        res.json({error})
    }
}


export {
    newPost,
    getPost,
    deletePost,
    editPost
}