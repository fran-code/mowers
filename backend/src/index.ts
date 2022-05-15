import express from 'express'
import env from './env'
import cors from 'cors'

import mower from './routes/mower'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/mower', mower)

app.listen(env.port, () => console.log(`App listening on port: ${env.port}`))

export default app