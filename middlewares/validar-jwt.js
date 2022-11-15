const { response, request } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el'
        });
    }

    try {

        const { uid, nombre} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.nombre = nombre;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }

    //todo ok!
    next();
}

module.exports = {
    validarJWT
}