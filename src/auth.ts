import jwt from 'jsonwebtoken'
import { Request as ExpressRequest, Response, NextFunction } from 'express'

interface Request extends ExpressRequest {
    user?: jwt.JwtPayload
}

export default module.exports = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = await request.headers.authorization?.split(' ')[1]

        if (!token) return response.status(401).json({ error: new Error('Unauthorized') })

        const decodedToken = await jwt.verify(
            token,
            'RANDOM-TOKEN'
        )
        
        const user = decodedToken as jwt.JwtPayload;

        if (!user) return response.status(401).json({ error: new Error('Unauthorized') });
        
        request.user = user;

        next()

    } catch (error) {
        return response.status(401).json({ 
            error: new Error('Invalid request!')
         })
    }
}