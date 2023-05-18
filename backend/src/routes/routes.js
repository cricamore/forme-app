const { Router } = require('express');
const {
    getTrabajador,
    createTrabajador,
    createCliente,
    addDescription,
    loginCliente,
    loginTrabajador,
    getTrabajadorFullInfo,
    getTrabajadorInfo
} = require('../controllers/controllers.js')



const router = Router();

router.post('/login', getTrabajador)

router.post('/registrartrabajador', createTrabajador)
router.post('/registrarcliente', createCliente)
router.post('/adddescription', addDescription)
router.post('/logincliente', loginCliente)
router.post('/logintrabajador', loginTrabajador)
router.get('/trabajadores', getTrabajadorFullInfo)
router.post('/trabajadores/:cedula', getTrabajadorInfo)


module.exports = router
