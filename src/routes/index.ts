import express, { request } from 'express'
import itemsRoutes from './items' 
import pointsRoutes from './points'
const routes = express()

routes.use('/items', itemsRoutes)
routes.use('/points', pointsRoutes)

export default routes