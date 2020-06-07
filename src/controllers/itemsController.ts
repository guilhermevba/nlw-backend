import knex from '../database/connection'

export const list = async () => {
  const items = await knex('items').select('*')
  return items.map(item => ({
    ...item,
    image_url: `http://localhost:3333/uploads/${item.image}`
  }))
}