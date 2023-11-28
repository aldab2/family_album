import mongoose from "mongoose";
// Comment Schema
export const commentSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    family: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Family'
    },
    postId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    content: {
        type: String,
        required: true
    },
    edited: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

export default mongoose.model('Comment', commentSchema)

