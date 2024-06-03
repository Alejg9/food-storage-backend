import { prisma } from "../prisma"
import { Request, Response } from 'express'

export async function getUsersFromGroup(req: Request, res: Response) {
    const { groupId } = req.params
    try {
        const relations = await prisma.usersOnGroup.findMany({
            where: {
                groupId: groupId
            }
        })

        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: relations.map(relation => relation.userId)
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                lastname: true
            }
        })
        res.json(users)
    }
    catch (error) {
        res.status(400).json({ message: 'users not found', status: 400})
    }
}

export async function getGroupsFromUser(req: Request, res: Response) {
    const { userId } = req.params
    try {
        const relations = await prisma.usersOnGroup.findMany({
            where: {
                userId: userId
            }
        })

        const groups = await prisma.group.findMany({
            where: {
                id: {
                    in: relations.map(relation => relation.groupId)
                }
            }
        
        })
        
        res.status(200).json({groups, status: 200})
    }
    catch (error) {
        res.status(400).json({ message: 'groups not found', status: 400})
    }
}

export async function deleteUsersFromGroup(req: Request, res: Response) {
    const { userId, groupId } = req.params
    try {

        const userOn = await prisma.usersOnGroup.findMany({
            where: {
                userId: userId,
                groupId: groupId
            }
        })

        if (!userOn || userOn.length === 0) {
            res.status(400).json({ message: 'user not found in group', status: 400})
            return
        }
        else if (userOn.length > 1) {
            res.status(400).json({ message: 'multiple users found in group', status: 400})
            return
        }
        const data = await prisma.usersOnGroup.deleteMany({
            where: {
                id: userOn[0].id
            }
        })

        console.log(userOn, data)
        res.status(200).json({ message: 'user removed from group', status: 200})
    }
    catch (error) {
        res.status(400).json({ message: 'user not removed from group', status: 400})
    }
}