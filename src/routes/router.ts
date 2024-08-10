import { Router, Request, Response } from 'express'
import prisma from '../utils/db'

const router = Router()

// Get all rows of data from the users table
router.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.findMany({
            include: {
                profile: true,
                posts: true,
                comments: true,
            },
        })
        res.json(result)
    } catch (err) {
        res.json({ error: 'could not fetch users: ', err })
    }
})

// Get all posts that belong to the user with ID 2
router.get('/user/:id/posts', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    try {
        const result = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                posts: true,
            },
        })
        res.json(result)
    } catch (err) {
        res.json({
            error: `could not fetch user with id ${id}'s posts': `,
            err,
        })
    }
})

// Get the user with ID 1 and include their profile in the response
router.get('/user/:id/profile', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    try {
        const result = await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                profile: true,
            },
        })
        res.json(result)
    } catch (err) {
        res.json({
            error: `could not fetch user with id ${id}'s profile: `,
            err,
        })
    }
})

// Update the post with ID 1 so that its text/content is different from what was created in the seed file
router.patch('/post/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)
    const { title, content, ...updatedPost } = req.body

    try {
        const result = await prisma.post.update({
            data: {
                title: title,
                content: content,
                ...updatedPost,
            },
            where: {
                id: id,
            },
        })
        res.json(result)
    } catch (err) {
        res.json({
            error: `could not update post with id ${id}: `,
            err,
        })
    }
})

// Delete the post with ID 3
router.delete('/post/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)

    try {
        const result = await prisma.post.delete({
            where: {
                id: id,
            },
        })
        res.json(result)
    } catch (err) {
        res.json({
            error: `could not delete post with id ${id}: `,
            err,
        })
    }
})

export default router
