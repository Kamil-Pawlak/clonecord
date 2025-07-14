import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import ServerModel from '../models/server';


dotenv.config();

export default async function validateServerMembership(req: Request, res: Response, next: NextFunction)
{
    const serverId = req.query?.serverId || req.params?.id || req.body?.serverId;
    const userId = req.userId;
    
    if (!serverId || typeof serverId !== 'string' || serverId == null) {
        res.status(400).json({ error: "Missing or invalid serverId." });
        return;
    }
    if (!userId) {
        res.status(401).json({ error: "Unauthorized. Missing userId." });
        return;
    }
    try{
        const server = await ServerModel.findById(serverId);
        if(!server || !server.members.some(member => member.toString() === userId))
        {
            res.status(403).json({ error: "Access denied. You are not a member of this server." });
            return;
        }
        next();

    }catch(e){
        console.error("validateServerMembership error", e);
        res.status(500).end();
    }
    
    
}