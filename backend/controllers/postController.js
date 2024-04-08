import asyncHandler from 'express-async-handler'
import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId
import Post from "../models/postModel.js"
import Comment from "../models/commentModel.js"
import { deleteMediaForPost, getPresignedUrl, uploadFileFromEndpoint } from '../utils/minioUtils.js'
import { getFormattedDate } from '../utils/generalUtils.js'
import { get } from 'http'
import Family from '../models/familyModel.js'

const newPost = asyncHandler( async (req, res) => {
    const {
        content, 
        takenWith, 
        createdAt,
        visibility
    } = req.body

    const file = req.file;

    if(!file){
        res.status(400);
        throw new Error("Video or image is required");
    }
    

    const post = {
        content,
        author: req.user.userName,
        userId: req.user.id,
        family: req.user.family,
        visibility
    }

   
    
        // TODO needs error checking and more implementaitons
    if (takenWith) {
        post.takenWith = takenWith
    }

    if (createdAt) {
        
        post.createdAt = new Date(createdAt)
    }
    const newPost = new Post(post)
    try {
        let mdb = await newPost.save()
        const fileOriginalName = file.originalname;
        const fileExtension = fileOriginalName.substring(fileOriginalName.lastIndexOf(".")+1);
        const fileName= `${getFormattedDate()}.${fileExtension}`;
        await uploadFileFromEndpoint(post.family,req.user.userName,mdb._id,fileName,file)

        mdb.media.push(fileName);
        await mdb.save();

        

            const postWithMediaUrls = async (mdb) => {
                const mediaUrls = await Promise.all(mdb.media.map(async (media) => {
                    return await getPresignedUrl(req.user.family, mdb.author, mdb._id.toString(), media);
                }));
            
                return { ...mdb.toObject(), mediaUrls };
            };
            
        

        res.json(await postWithMediaUrls(mdb))
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }

    
    
})

const deletePost = asyncHandler(async (req, res) =>{
    const {
        id
    } = req.body

    
    try {
        
        //let postDeletion = await Post.findOneAndDelete({id})
        const post = await Post.findOne({_id:id});
        const post_media = post.media;
        console.log(post_media);
        const postDeletion = await Post.findByIdAndDelete(id);
        const  commentDeletion = await Comment.deleteMany({
            postId: new ObjectId(id)
        })
        deleteMediaForPost(req.user.family,req.user.userName,id,post_media)
        
        
        res.json({
            postDeletion,
            commentDeletion
        })
    } catch (error) {
        res.status(500);
        throw new Error(error)
    }
})


const getPost = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Initialize the query object
    let query = {};

    // Check for 'userId' filter
    if (req.query.onlyMyPosts == 'true') {
        query.userId = req.user.id;
    }

    // Check for 'postId' filter
    if (req.query.postId) {
        query._id = req.query.postId;
    }

    // Check for 'type' filter
    if (req.query.type === 'all') {
        const userFamily = await  Family.findOne({_id:req.user.family})
        query.$or = [
            { family: userFamily._id },
            { family: { $in: userFamily.friends },  visibility: { $in: ['friends', 'public'] }  }
        ];
    } else {
        // Default to family
        query.family = req.user.family;
    }
   
    const posts = await Post.find(query)
                            .skip(skip)
                            .limit(limit)
                            .sort({ createdAt: -1 })
                            .populate('comments');
     console.log(posts)

    const postsWithMediaUrls = await Promise.all(posts.map(async (post) => {
        const mediaUrls = await Promise.all(post.media.map(async (media) => {
            console.log(req.user.family, post.author, post._id.toString(), media)

            return await getPresignedUrl(req.user.family, post.author, post._id.toString(), media);
        }));
        return { ...post.toObject(), mediaUrls };
    }));

    res.json(postsWithMediaUrls);
});


const editPost = asyncHandler(async (req, res)=> {
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
})

const minioUploadExample = asyncHandler(async (req, res) => {
    const file = req.file;
    console.log(file.buffer.length);
    await uploadFileFromEndpoint("my-bucket",file.originalname,file)
    res.send("done")

});


export {
    newPost,
    getPost,
    deletePost,
    editPost,
    minioUploadExample
}