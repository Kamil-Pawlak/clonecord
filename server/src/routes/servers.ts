import express from 'express'
import { randomUUID } from 'crypto';
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
    res.status(201).json(mapped);
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

export default router;