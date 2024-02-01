import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const friendRequestSchema = mongoose.Schema({
    senderFirstName:{
        type: String,
        required: true
    },
    senderSpaceName:{
        type: String,
        required: true
    },
    senderFamilyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family'
    },
    recipientFamilyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family'
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        required: true,
        default: 'pending'
    }
},{
    timestamps:true
});




const FriendRequest = mongoose.model('FriendRequest',friendRequestSchema);




export  default FriendRequest;