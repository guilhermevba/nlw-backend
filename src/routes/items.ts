import express from 'express'
import knex from '../database/connection'

const routes = express()

routes.get('/', async(request, response) => {
  const items = await knex('items').select('*')
  response.send(items.map(item => ({
    ...item,
    image_url: `http://localhost:3333/uploads/${item.image}`
  })))
})

export default routes