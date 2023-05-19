const { Router } = require('express');
const { getTrabajador, createTrabajador, createCliente, addDescription, loginCliente, loginTrabajador, getTrabajadores, getReview, createReview} = require('../controllers/controllers.js')



const router = Router();

router.post('/login', getTrabajador)
router.post('/registrartrabajador', createTrabajador)
router.post('/registrarcliente', createCliente)
router.post('/adddescription', addDescription)
router.post('/logincliente',loginCliente)
router.post('/logintrabajador',loginTrabajador)
router.get('/trabajadores', getTrabajadores)
router.get('/review',getReview)
router.post('/review', createReview)

module.exports = router
