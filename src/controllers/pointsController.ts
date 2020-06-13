import knex from "../database/connection";
import { Point } from "../entitites/Point";

export const show = async (id: number, address: string) => {
  const point = await knex("points").where("id", id).first();
  if (!point) {
    throw new Error("Point not found");
  }
  const items = await knex("items")
    .join("points_items", "items.id", "=", "points_items.item_id")
    .where("points_items.point_id", id)
    .select("items.title");
  return {
    point: {
      ...point,
      image_url: `${address}tmp/${point.image}`
    },
    items
  };
};

export const list = async (query: any, address: string) => {
  const { city, uf, items } = query;
  const parsedItems = String(items)
    .split(",")
    .map((item) => Number(item.trim()));

  const points = await knex("points")
    .join("points_items", "points.id", "points_items.point_id")
    .whereIn("points_items.item_id", parsedItems)
    .where("city", String(city))
    .where("uf", String(uf))
    .distinct()
    .select("points.*");
  const serializedPoints = points.map(point => ({
    ...point,
    image_url: `${address}tmp/${point.image}`
  }))
  return serializedPoints;
};

export const create = async (
  image: any,
  { name, whatsapp, email, city, uf, latitude, longitude, items }: Point
) => {
  const trx = await knex.transaction();
  try {
    const formatedPoint = {
      name,
      whatsapp,
      email,
      city,
      uf,
      latitude: Number(latitude),
      longitude: Number(longitude),
      image: image ? image.filename : "no-image",

    };
    const insertedIds = await trx("points").insert(formatedPoint);
    const point_id = insertedIds[0];

    const point_items = items.map((item_id: number) => ({
      item_id,
      point_id,
    }));

    await trx("points_items").insert(point_items);
    await trx.commit();
    return { id: point_id, ...formatedPoint };
  } catch (err) {
    trx.rollback();
    return { message: "Something went wrong creating Poin", innerMessage: err };
  }
};
