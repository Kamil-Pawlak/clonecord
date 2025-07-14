import express from 'express'
import ChannelModel from '../models/channel';
import mongoose from 'mongoose';
import authenticate from '../middleware/auth';
import validateServerMembership from '../middleware/validateServerMembership';

const router = express.Router();


router.get('/', authenticate, validateServerMembership, async (req,res) =>{
    const { serverId } = req.query;
    if(typeof serverId !== 'string'){
        res.status(400).json({error: "Missing or invalid serverId"});
        return;
    }
    try{
        const channels = await ChannelModel.find({serverId});

        res.status(200).json(channels.map(channel =>({
        id: channel._id.toString(),
        name: channel.name,
        serverId: channel.serverId.toString()
    })));
    }catch{
        res.status(500).end();
    }
});

router.post('/', authenticate, validateServerMembership, async (req, res) => {
    if(!req.body)
    {
        res.status(400).json({error: "Invalid request"});
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