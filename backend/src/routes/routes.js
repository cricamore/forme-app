const { Router } = require('express');
const { getTrabajador, createTrabajador, createCliente, addDescription } = require('../controllers/controllers.js')



const router = Router();

router.post('/login', getTrabajador)

router.post('/registrartrabajador', createTrabajador)
router.post('/registrarcliente', createCliente)
router.post('/adddescription', addDescription)


module.exports = router
