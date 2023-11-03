import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: false
    },
    mobile:{
        type: String,
        required: false
    },
    gender:{
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    active:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['parent', 'adult', 'child'],
        required: true
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family'
    }
},{
    timestamps:true
});

userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
const User = mongoose.model('User',userSchema);








export  default User;