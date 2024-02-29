const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "Alish2004",
    host: "localhost",
    port: 5432,
    database: "finalMinkenova",
});
module.exports = pool;