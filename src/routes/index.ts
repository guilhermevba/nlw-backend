import express, { request } from 'express'
import itemsRoutes from './items' 
import pointsRoutes from './points'

const routesRoot = (address: string) => {
  const routes = express()
  routes.use('/points', pointsRoutes(address))
  routes.use('/items', itemsRoutes(address))
  return routes
}


export default routesRoot