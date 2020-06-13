import knex from '../database/connection'

export const list = async (address: string) => {
  const items = await knex('items').select('*')
  return items.map(item => ({
    ...item,
    image_url: `${address}/uploads/${item.image}`
  }))
}