import { prisma } from "../prisma"
import { Request, Response } from 'express'

export async function getGroups(req: Request, res: Response) {
    const { userId } = req.body

    try {
        const groups = await prisma.group.findMany({
            where: {
                ownerId: userId
            }
        })
        res.status(200).json({groups, status: 200})
    } catch (error) {
        res.status(400).json({ message: 'groups not found', status: 400})
    }
}

export async function getGroup(req: Request, res: Response) {
    const { id } = req.params
    try {
        const group = await prisma.group.findUnique({
            where: {
                id: id
            }
        })
        res.json({group, status: 200})
    } catch (error) {
        res.status(400).json({ message: 'group not found', status: 400})
    }
}

export async function saveGroup(req: Request, res: Response) {
    const { name, ownerId, description } = req.body

    try {
        const group = await prisma.group.create({
            data: {
                name,
                ownerId,
                description
            }
        })

        await prisma.usersOnGroup.create({
            data: {
                userId: ownerId,
                groupId: group.id
            }
        })
        res.status(200).json({group, status: 200})
    } catch (error) {
        res.status(400).json({ message: 'group not created', status: 400 })
    }
}

export async function updateGroup(req: Request, res: Response) {
    const { id } = req.params
    const { name, description } = req.body

    try {
        const group = await prisma.group.update({
            where: {
                id: id
            },
            data: {
                name,
                description
            }
        })
        res.status(200).json({group, status: 200})
    } catch (error) {
        res.status(400).json({ message: 'group not updated', status: 400})
    }
}

export async function deleteGroup(req: Request, res: Response) {
    const { id } = req.params

    try {
        await prisma.group.delete({
            where: {
                id: id
            }
        })
        res.status(200).json({ message: 'group deleted', status: 200 })
    } catch (error) {
        res.status(400).json({ message: 'group not deleted', status: 400 })
    }
}