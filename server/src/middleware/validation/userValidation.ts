import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import {body, validationResult} from 'express-validator';


dotenv.config();

export const registerValidator = [
    body('email').isEmail()
    .withMessage('Invalid email address'),
    body('password').notEmpty()
    .withMessage('Password can not be empty'),
    body('password').isLength({min: 6})
    .withMessage('password should be at least 6 characters long'),
    body('username').notEmpty()
    .withMessage('username can not by empty')
];

export const loginValidator = [
    body('email').isEmail()
    .withMessage('Invalid email address'),
    body('password').notEmpty()
    .withMessage('Password can not be empty'),
];

export function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const firstError = errors.array()[0].msg;
        res.status(400).json({error: firstError});
        return;
    }
    next();
}