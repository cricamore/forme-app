const { Router } = require('express');
const { getTrabajador } = require('../controllers/controllers.js')


const router = Router();

router.post('/login', getTrabajador)

module.exports = router