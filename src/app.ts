import express from 'express'
import { router } from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json())
app.use(cors())
app.use(router)

export { app }