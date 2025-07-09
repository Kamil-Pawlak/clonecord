import express from 'express'
import ServerModel from '../models/server';
import {Server} from '../types/server';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) =>{
    const servers = await ServerModel.find();
    const mapped = servers.map((server) =>{
        return {
            id: server._id.toString(),
            name: server.name,
            ownerId: server.ownerId,
            createdAt: server.createdAt
        };
    })
    res.status(200).json(mapped);
});


router.post('/', async (req, res) =>{
    if(!req.body || req.body == undefined)
    {
        res.status(400).json();
        return;
    }
    const {name, ownerId} = req.body;
    if(!name || !ownerId || name.trim() == "" || ownerId.trim() == "" || typeof ownerId != 'string' || typeof name != 'string')
    {
        res.status(400).json();
    }
    else{
        let server = await ServerModel.create({
            name: name,
            ownerId: new mongoose.Types.ObjectId(ownerId)
        });
        res.status(201).json({id: server._id.toString(),
                              name: server.name,
                              ownerId: ownerId,
                              createdAt: server.createdAt} as Server);
    }
});

router.get('/:id/members', async (req,res) =>{
    const serverId = req.params.id
    if(!serverId || !mongoose.Types.ObjectId.isValid(serverId))
    {
        res.status(400).json({error: "Invalid or empty request"})
        return;
    }
    const server = await ServerModel.findById(serverId).populate('members');
    if(!server)
    {
        res.status(404).json({error: "Server with given id does not exist"});
    }
    else
        res.status(200).json(server?.members);
});

router.post('/:id/join', async (req,res) =>{
    const serverId = req.params.id
    if(!serverId || !mongoose.Types.ObjectId.isValid(serverId) || !req.body)
    {
        res.status(400).json({error: "Invalid or empty request"})
        return;
    }
    const {userId} = req.body;
    if(!userId || userId.trim() == "" || typeof userId != 'string' || !mongoose.Types.ObjectId.isValid(userId))
    {
        res.status(400).json({error: "Invalid request"});
        return;
    }
    const server = await ServerModel.findById(serverId);
    if(!server)
    {
        res.status(404).json("Could not find server with given id");
        return;
    }
    server?.members.addToSet(new mongoose.Types.ObjectId(userId));
    await server.save();
    res.status(204).end();

});

export default router;