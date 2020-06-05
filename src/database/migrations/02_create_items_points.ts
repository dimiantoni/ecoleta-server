import Knex from "Knex";

export async function up(Knex: Knex) {
    return Knex.schema.createTable('items_points', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('items_points');
}