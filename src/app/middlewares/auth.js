// Middleware of autentication

import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    // Receive   header authorization
    const authHeader = req.headers.authorization;
    // if not header
    if (!authHeader) {
        // return error

        return res.status(401).json({ error: 'Token not provided' });
    }
    // split of array,  receive only the second parameter
    const [, token] = authHeader.split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = decoded.id;
        return next();
    } catch (err) {
        // if error return status 401
        return res
            .status(401)
            .json({ error: 'Token is not valid or not exists.' });
    }
};
