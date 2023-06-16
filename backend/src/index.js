// Archivo principal (index.js)

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes.js');
const app = express();
const cors = require('cors');

app.get("/", (req, res) => {res.send("Server is running on port")})
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});

let server; // Variable para almacenar el servidor

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(4000, () => {
    console.log('Server estoy en port 4000');
  });
}

module.exports = server ? server : app;
