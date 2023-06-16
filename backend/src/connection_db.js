const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: '0u0mJTZ44I7YAeJ70igN',
    // host: 'postgres',
    host: 'containers-us-west-2.railway.app',
    port: 5940,
    database: 'railway'
})

module.exports = pool
