var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'navgurukul',
      database: 'salesTax'
    },
    pool: { min: 0, max: 7 }
  })
knex.schema.createTable('products', (table) => {
    table.increments('no')
    table.string('product')
    table.string("country")
    table.string("stages")
    table.float("price")
    table.float("Tax")
    table.float("Total")

})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
