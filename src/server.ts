import * as express from "express";

const app = express();

app.get('/users', (request, response) => {
    console.log('listagem de usuários')

    response.json([
        'Dimi',
        'Nany',
        'Mallu',
        'Kelly',
        'Diogo',
        'Davi',
        'Raissa',
        'Lucas'
    ])
});

app.listen(3333);
