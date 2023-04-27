const { Router } = require('express');
const { getTrabajador, updateEstrellas } = require('../controllers/controllers.js')



const router = Router();

router.post('/login', getTrabajador)
router.put('/1005965561/estrellas', updateEstrellas)

module.exports = router
