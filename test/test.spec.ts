import request from 'supertest'
import { execSync } from 'child_process'
import app from '../src/server'

beforeEach(() => {
    // Reset the database before each test
    execSync('npx prisma migrate reset --force')
})

describe('API Tests', () => {
    it('Get all rows of data from the users table', async () => {
        const response = await request(app).get('/users')
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    it('Get all posts that belong to the user with ID 2', async () => {
        const response = await request(app).get('/user/2/posts')
        expect(response.status).toBe(200)
        expect(response.body.posts).toBeInstanceOf(Array)
    })

    it('Get the user with ID 1 and include their profile in the response', async () => {
        const response = await request(app).get('/user/1/profile')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('profile')
    })

    it('Update the post with ID 1 so that its text/content is different from what was created in the seed file', async () => {
        const updatedData = {
            title: 'Updated Title',
            content: 'Updated Content',
        }
        const response = await request(app).patch('/post/1').send(updatedData)
        expect(response.status).toBe(200)
        expect(response.body.title).toBe('Updated Title')
        expect(response.body.content).toBe('Updated Content')
    })

    it('Delete the post with ID 3', async () => {
        const response = await request(app).delete('/post/3')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id', 3)
    })
})
