import mongoose from "mongoose";
import { commentSchema } from "./commentModel.js";

const postSchema = mongoose.Schema({
    author:{
        type: String,
        // ref: 'User',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date().now,
    },
    takenWith: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    family: {
        type: mongoose.Types.ObjectId,
        ref: 'Family',
        required: true
    },
    media:[{
        type: String,
        ref: 'User',
        required: true
    }],
    comments: [{
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    }],
    edited: {
        type: Boolean,
        default: false
    },
    visibility: {
        type: String,
        enum: ['public', 'private',"friends"],
        default: 'private'
    }
},
{
    timestamps:true
});



const Post = mongoose.model('Post',postSchema);
export default Post