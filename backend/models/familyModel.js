import mongoose from "mongoose";

const familySchema = mongoose.Schema({
    familyName:{
        type: String,
        required: true
    },
    familyMembers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
},{
    timestamps:true
});

const Family = mongoose.model('Family',familySchema);

export default Family;