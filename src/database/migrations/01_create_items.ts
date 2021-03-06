import Knex from "Knex";

export async function up(Knex: Knex) {
    return Knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image').notNullable();
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('items');
}