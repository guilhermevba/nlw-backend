import knex from "../database/connection";
import { Point } from "../entitites/Point";

export const show = async (id: number) => {
  const point = await knex("points").where("id", id).first();
  if (!point) {
    throw new Error("Point not found");
  }
  const items = await knex("items")
    .join("points_items", "items.id", "=", "points_items.item_id")
    .where("points_items.point_id", id)
    .select("items.title");
  return { point, items };
};

export const list = async (query: any) => {
  const { city, uf, items } = query;
  const parsedItems = String(items)
    .split(",")
    .map((item) => Number(item.trim()));

  const points = await knex("points")
    .join("points_items", "points.id", "points_items.point_id")
    .whereIn("points_items.item_id", parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*');

  return points;
};

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
      image: "https://images.unsplash.com/photo-1554486855-60050042cd53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };
    const insertedIds = await trx("points").insert(point);
    console.log(insertedIds);
    const point_id = insertedIds[0];

    const point_items = items.map((item_id: number) => ({
      item_id,
      point_id,
    }));

    await trx("points_items").insert(point_items);
    await trx.commit();
    return { id: point_id, ...point };
  } catch (err) {
    return { message: "Something went wrong creating Poin", innerMessage: err };
  }
};
