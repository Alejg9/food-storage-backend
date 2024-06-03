import { prisma } from "../prisma"
import { Request, Response } from 'express'

export async function getProducts(req: Request, res: Response) {
    const { groupId } = req.params
    try {
        const products = await prisma.product.findMany({
            where: {
                groupId: groupId
            }
        })
        res.status(200).json({products, message: 'products found', status: 200})
    }
    catch (error) {
        res.status(400).json({ message: 'products not found', status: 400})
    }
}

export async function getProduct(req: Request, res: Response) {
    const { id } = req.params
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json({product, message: 'product found', status: 200})
    }
    catch (error) {
        res.status(400).json({ message: 'product not found', status: 400})
    }
}

export async function saveProduct(req: Request, res: Response) {

    const { name, pieces, quantity, units } = req.body

    const { groupId } = req.params

    try {
        const product = await prisma.product.create({
            data: {
                name,
                pieces,
                quantity,
                units,
                groupId
            }
        })
        res.status(200).json({product, message: 'product created', status: 200})
    }
    catch (error) {
        res.status(400).json({ message: 'product not created' })
    }
}

export async function updateProduct(req: Request, res: Response) {
    const { id } = req.params
    const { name, pieces, quantity, units } = req.body

    try {
        const product = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name,
                pieces,
                quantity,
                units
            }
        })
        res.status(200).json({product, message: 'product updated', status: 200})
    }
    catch (error) {
        res.status(400).json({ message: 'product not updated', status: 400})
    }
}

export async function deleteProduct(req: Request, res: Response) {
    const { id } = req.params
    try {
        await prisma.product.delete({
            where: {
                id: id
            }
        })
        res.status(200).json({ message: 'product deleted', status: 200})
    }
    catch (error) {
        res.status(400).json({ message: 'product not found', status: 400 })
    }
}