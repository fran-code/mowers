import { calculateRoutes } from '../controllers/mower'
import express from 'express'

const mower = express.Router()

mower.route('/calculateRoutes')
    .post(calculateRoutes)

export default mower