import * as express from "express";
import knex from "./database/connection"


const routes = express.Router();

routes.get('/items', async (request, response) => {
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
});

routes.post('/points', async (request, response) => {
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

    await knex('points').insert({
        image : "image-fake",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    return response.json({ success: true });
});

export default routes;