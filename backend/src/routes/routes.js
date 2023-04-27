const { Router } = require('express');
const { getTrabajador, createTrabajador, createCliente } = require('../controllers/controllers.js')


const router = Router();

router.post('/login', getTrabajador)
router.post('/registrartrabajador', createTrabajador)
router.post('/registrarcliente', createCliente)

module.exports = router