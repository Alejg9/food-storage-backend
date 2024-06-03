import { prisma } from "../prisma"
import { Request, Response } from 'express'


export async function inviteUser(req: Request, res: Response) {
    const { email } = req.params
    const { groupId } = req.body

    if (!email || !groupId) {
        res.status(400).json({ message: 'Email and groupId are required', status: 400 })
        return
    }

    const group = await prisma.group.findUnique({
        where: {
            id: groupId
        }
    })

    if (!group) {
        res.status(404).json({ message: 'Group not found', status: 400 })
        return
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        res.status(404).json({ message: 'User not found', status: 400 })
        return
    }

    const userOnGroup = await prisma.usersOnGroup.findFirst({
        where: {
            userId: user.id,
            groupId
        }
    })

    if (userOnGroup) {
        res.status(400).json({ message: 'User already in group', status: 400})
        return
    }

    const invite = await prisma.usersOnGroup.create({
        data: {
            userId: user.id,
            groupId
        }
    })

    res.status(200).json({invite, status: 200})
}