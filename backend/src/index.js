// Archivo que arranca server
// Correr server con Npm run dev

const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/routes.js')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})
app.listen(4000)
console.log('Server estoy en port 4000')