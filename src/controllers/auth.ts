import { prisma } from "../prisma"
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function signIn(req: Request, res: Response){
    const SECRET = process.env.SECRET

    const { secret, email, password } = req.body

    if (secret !== SECRET) return res.status(401).json({ message: 'Unauthorized', status: 401 })

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) return res.status(400).json({ message: 'Invalid credentials', status: 400})
    

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) return res.status(400).json({ message: 'Invalid credentials', status: 400 })

    const token = jwt.sign({
        id: user.id,
        email: user.email
    },
    "RANDOM-TOKEN",
    {
        expiresIn: '24h'
    })

    return res.status(200).json({ 
        message: 'User logged in',
        email: user.email,
        id: user.id,
        token,
        status: 200
     })
}