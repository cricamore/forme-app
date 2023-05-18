const { Router } = require('express');
const { getTrabajador, createTrabajador, createCliente, addDescription, loginCliente, loginTrabajador, createReview, getReview  } = require('../controllers/controllers.js')



const router = Router();

router.post('/login', getTrabajador)

router.post('/registrartrabajador', createTrabajador)
router.post('/registrarcliente', createCliente)
router.post('/adddescription', addDescription)
router.post('/logincliente',loginCliente)
router.post('/logintrabajador',loginTrabajador)
router.post('/review',createReview)
router.get('/review',getReview)


module.exports = router
