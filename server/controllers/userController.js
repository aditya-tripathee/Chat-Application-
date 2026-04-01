// user register , login , logout

import { User } from "../models/userModels.js";
import bcrypt from "bcryptjs";


export const register = async(req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body;
        if(!fullName || !username || !password ||!confirmPassword || !gender){
            return res.status(400).json({message:"All fields required!"});
        };

        if(password !== confirmPassword){
            return res.status(400).json({message:"Password don't matched"})
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"User already exists, try others "});
        };
        
        // hashed password 
        const hashedPassword = await bcrypt.hash(password,10);

        // profile photo
        const profilePhoto =  `https://robohash.org/${username}.png`

        await User.create({
            fullName,
            username,
            password : hashedPassword,
            profilePhoto : profilePhoto,
            gender
        });

        return res.status(201).json({message:"User resgiter successfully", success:true})

    } catch (error) {
        console.error("Register error ",error);
        return res.status(500).json({message:"Internal server error"})
    }
};

