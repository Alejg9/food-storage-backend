import { prisma } from "../prisma"
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

export async function createUser(req: Request, res: Response) {
    const SECRET = process.env.SECRET

    const { secret, name, email, lastname, password } = req.body

    if (secret !== SECRET) return res.status(401).json({ message: 'Unauthorized' })

    try {
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        await prisma.user.create({
            data: {
                name,
                email,
                lastname,
                password: hashedPassword
            }
        })

        return res.status(200).json({message: 'User created successfully', status: 200})
    } catch (error) {
        return res.status(400).json({ message: 'User already exists', status: 400})
    }
}