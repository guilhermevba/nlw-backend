import express from 'express'

const routes = express()

routes.get('/', (request, response) => {
  response.send('points routes')
})

export default routes