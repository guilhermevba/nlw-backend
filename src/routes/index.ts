import express, { request } from 'express'

const routes = express()

routes.get('/', (request, response) => {
  console.log('someone is calling me')
  response.send('hi')
})

export default routes