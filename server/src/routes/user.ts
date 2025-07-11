import express from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

const router = express.Router();


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

export default router;