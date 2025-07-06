import express from 'express'
import {Channel} from '../types/channel';
import { randomUUID } from 'crypto';

const router = express.Router();

let channels: Array<Channel> = [];

router.get('/', (req,res) =>{
    res.json(
        channels
    );
});

router.post('/', (req, res) => {
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
        channels.push({id: `${randomUUID()}`, name: req.body.name});
        res.status(201).json();
    }
   
});

export default router;