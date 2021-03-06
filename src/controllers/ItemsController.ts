import { Request, Response } from 'express';
import knex from "../database/connection";

class ItemsController {
  async index(request: Request, response: Response) {
    console.log('get items');
    const items = await knex('items').select('*');

    const serializedItems = items.map( item => {
        return {
            id: item.id,
            title: item.title,
            image: `http://localhost:3333/uploads/${item.image}`
        }
    })
    return response.json(serializedItems);
  }
}

export default ItemsController;