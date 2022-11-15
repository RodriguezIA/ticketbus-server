const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt'); 

const router = Router();

//Crear un usuario
router.post('/register',[
    check('nombre', 'el nombre es obligatorio').isLength({min: 2}),
    check('apellido_paterno', 'el apellido paterno es obligatorio').isLength({min: 5}),
    check('apellido_materno', 'el apellido materno es obligatorio').isLength({min: 5}),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria y debe tener mas de 5 caracteres').isLength({min: 6}),
    validarCampos
], crearUsuario);


// Login de usuario
router.post('/login', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria y debe tener mas de 5 caracteres').isLength({min: 6}),
    validarCampos
], loginUsuario);

// Validar token
router.get('/renew', validarJWT, revalidarToken);




module.exports = router;