import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import UserModel from '../models/user';
import dotenv from 'dotenv'


dotenv.config();

export default async function authenticate(req: Request, res: Response, next: NextFunction)
{
    if(!req.headers.authorization || req.headers.authorization.split(' ')[0] != "Bearer")
    {
        res.status(401).end();
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded || typeof decoded === 'string' || !decoded.userId) {
            res.status(401).end();
            return;
        }
        const {userId, tokenVersion} = decoded;
        if(!userId || typeof tokenVersion != 'number')
        {
            res.status(401).end();
            return;
        }
        try{
            let user = await UserModel.findById(userId);
            if(!user || user.tokenVersion != tokenVersion)
            {
                res.status(401).end();
                return;
            }
            (req as any).userId = userId;
            next();
        }catch(e){
            res.status(401).end();
            console.log("Authentication error: " + e);
        }
    }catch
    {
        res.status(401).end();
        return;
    }

    
    
}