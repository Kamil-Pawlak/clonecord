import express from 'express'
import {Channel} from '../types/channel';
import { randomUUID } from 'crypto';
import ChannelModel from '../models/channel';

const router = express.Router();


router.get('/', async (req,res) =>{
    const channels = await ChannelModel.find({});
    res.json(channels);
});

router.post('/', async (req, res) => {
    if(!req.body)
    {
        res.status(400).json();
        return;
    }
    const {name} = req.body;
    if(typeof name != 'string' || !name || name.trim() === "")
    {
       res.status(400).json({error: "Invalid channel name"});
    }
    else{
        const channelData = {
            serverId: "default",
            name: name.trim()
        };
        await ChannelModel.create(channelData);
        res.status(201).json();
    }
   
});

export default router;