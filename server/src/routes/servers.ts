import express from 'express'
import { randomUUID } from 'crypto';
import ServerModel from '../models/server';
import {Server} from '../types/server';

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
    if(!name || !ownerId || name.trim() == "" || ownerId.trim() == "")
    {
        res.status(400).json();
    }
    else{
        let server = await ServerModel.create({name: name,
            ownerId: ownerId});
        res.status(201).json({id: server._id.toString(),
                              name: server.name,
                              ownerId: server.ownerId,
                              createdAt: server.createdAt} as Server);
    }
});

export default router;