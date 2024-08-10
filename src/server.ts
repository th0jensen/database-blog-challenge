import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app: Application = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
import router from './routes/router'
app.use('/', router)

export default app
