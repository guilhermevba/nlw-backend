import knex from "../database/connection";
import { Point } from "../entitites/Point";

export const create = async ({
  name,
  email,
  whatsapp,
  latitude,
  longitude,
  city,
  uf,
  items,
}: Point) => {
  const trx = await knex.transaction();
  try {

    const point = {
      image: "fake image",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }
    const [firstInsertedId] = await trx("points").insert(point);

    const point_id = firstInsertedId;

    const point_items = items.map((item_id: number) => ({
      item_id,
      point_id,
    }));

    await trx("points_items").insert(point_items);
    return {id: point_id, ...point}
  } catch (err) {
    return { message: "Something went wrong creating Poin", innerMessage: err };
  }
};
