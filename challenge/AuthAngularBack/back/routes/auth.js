const { Router } = require('express');
const { addUser, userLogin, renewToken } = require('../controllers/auth');
const {check} = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');


const r = Router();

//Crea usuario
r.post('/new', [
    check('name', 'name es obligatorio').notEmpty(),
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'password debe contener minimo 6 caracteres').isLength({min:6}),
    validarCampos
], addUser)

//Login usuario
//ruta, middleware(lo que tiene que ocurrir y aceptar la ruta para mostrar lo de la func)
r.post('/', [
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'password debe contener minimo 6 caracteres').isLength({min:6}),
    validarCampos
], userLogin)

//Validar y revalidar token
r.get('/renew', [validarJWT], renewToken)


// r.get
// r.delete
// r.put


module.exports = r;