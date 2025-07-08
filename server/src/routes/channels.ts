import express from 'express'
import {Channel} from '../types/channel';
import { randomUUID } from 'crypto';
import ChannelModel from '../models/channel';
import mongoose from 'mongoose';

const router = express.Router();


router.get('/', async (req,res) =>{
    const { serverId } = req.query;
    if(typeof serverId !== 'string'){
        res.status(400).json({error: "Missing or invalid serverId"});
        return;
    }
    const channels = await ChannelModel.find({serverId});
    res.status(201).json(channels.map(channel =>({
        id: channel._id.toString(),
        name: channel.name,
        serverId: channel.serverId.toString()
    })));
});

router.post('/', async (req, res) => {
    if(!req.body)
    {
        res.status(400).json();
        return;
    }
    const {name, serverId} = req.body;
    if(typeof name != 'string' || !name || name.trim() === "" || !serverId || serverId.trim() == "" || typeof serverId != 'string')
    {
       res.status(400).json({error: "Invalid channel name"});
    }
    else{
        const channelData = {
            serverId: new mongoose.Types.ObjectId(serverId),
            name: name.trim()
        };
        await ChannelModel.create(channelData);
        res.status(201).json();
    }
   
});

export default router;