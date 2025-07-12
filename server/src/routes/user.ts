import express from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


const router = express.Router();
dotenv.config();

router.post('/register', async (req, res) => {
    if(!req.body || req.body == undefined)
    {
        res.status(400).json({error: "Invalid request. Empty body."});
        return;
    }
    const {username, email, password} = req.body;
    if(!username || !email || username.trim() == "" || email.trim() == "" || !password)
    {
        res.status(400).json({error: "Invalid request. No username or email."})
    }
    else{
        //create user
        try{
            let emailCheck = await UserModel.findOne({email});
            if(emailCheck)
            {
                res.status(409).json({error: "An account with that email already exists!"});
                return;
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            let user = await UserModel.create({username,email, hashedPassword});
            res.status(201).json({
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            });
        }catch(e)
        {
            res.status(400).json({error: "There was an error!" + e});

        }
    }
});


router.post('/login', async (req,res) =>{
    if(!req.body)
    {
        res.status(400).json({error: "Invalid request. Empty or non present body."});
        return;
    }
    const {email, password} = req.body;
    if(!email || email.trim() == "" || !password || password.trim() == "")
    {
        res.status(400).json({error: "email or password missing"});
    }else{
        try{
            let user = await UserModel.findOne({email});
            if(!user || !await bcrypt.compare(password, user.hashedPassword))
            {
                res.status(400).json({error: "Invalid credentials"});
                return;
            }
            //login succesfull
            const token = jwt.sign(
                {userId: user._id.toString(), tokenVersion: user.tokenVersion}, 
                process.env.JWT_SECRET!,
                {expiresIn: "7d"});
            res.status(200).json({
                token: token
            })

        }catch(e)
        {
            res.status(500).end();
            console.log("/user/login error: " + e);
        }
    }
});


export default router;