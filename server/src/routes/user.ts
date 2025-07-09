import express from 'express';
import UserModel from '../models/user';

const router = express.Router();


router.post('/', async (req, res) => {
    if(!req.body || req.body == undefined)
    {
        res.status(400).json({error: "Invalid request. Empty body."});
        return;
    }
    const {username, email} = req.body;
    if(!username || !email || username.trim() == "" || email.trim() == "")
    {
        res.status(400).json({error: "Invalid request. No username or email."})
    }
    else{
        //create user
        let user = await UserModel.create({username,email});
        res.status(201).json({
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        });
    }
});

export default router;