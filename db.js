const { Pool } = require('pg');
const pool = new Pool({
    user: "inkar_finalweb_user",
    password: "2CleSi522CNx0mxN70m0N3tnv4QOxkJD",
    host: "cnggc0f79t8c73a8clag-a.oregon-postgres.render.com",
    port: 5432,
    database: "inkar_finalweb",
});
module.exports = pool;
