const { Router } = require('express');
const { getTrabajador, createTrabajador } = require('../controllers/controllers.js')


const router = Router();

router.post('/login', getTrabajador)
router.post('/registrartrabajador', createTrabajador)

module.exports = router