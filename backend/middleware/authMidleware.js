import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req,res,next)=>{
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            //Adding the user object to the request to be used later upon needs.
            req.user = await User.findById(decoded.userId)
            // remove hashed passwod from the user 
            .select('-password');

            next();
            
        } catch (error) {
            res.status(401);
            throw new Error(`Not authorized, Invalid Token ${error}`);
        }

    }else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})

export {protect}