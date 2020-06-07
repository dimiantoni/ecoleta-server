import { Request, Response } from 'express';
import knex from "../database/connection";

class PointsController {

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items).split(',').map(item => Number(item.trim()));

    const points = await knex('points')
      .join('items_points', 'points.id', '=', 'items_points.point_id')
      .whereIn('items_points.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if(!point) {
      return response.status(400).json({'message': 'point not found'});
    }

    /**
     * SELECT * FROM items
     *    JOIN items_points on items.id = items_points.item_id
     *  WHERE items_points.point_id = { id }
     */

    const items = await knex('items')
      .join('items_points', 'items.id', '=', 'items_points.item_id')
      .where('items_points.point_id', '=', id);

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {

      console.log('create point');

      const {
          image,
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          uf,
          items
      } = request.body;

      const point = {
        image : "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      }

      const trx = await knex.transaction();

      const insertedPointId  = await trx('points').insert(point);

      const point_id = insertedPointId[0];

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id
        };
      });

      await trx('items_points').insert(pointItems);

      await trx.commit();

      return response.json({ 
        id: point_id,
        ...point 
      });
  }

}

export default PointsController;