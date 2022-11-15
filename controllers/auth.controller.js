const { response, request, json } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/User');

const crearUsuario = async(req = request, res = response) => {
    const {nombre, apellido_paterno, apellido_materno,email, password} = req.body;

    try {
        //verificar email
        const usuario = await Usuario.findOne({email});

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'el usuario ya existe'
            });
        }
        // Crear el usuario con el modelo
        const dbUser = new Usuario( req.body );

        //hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);
        //generar jwt

        const token = await generarJWT(dbUser.id, nombre);

        //crear usuario en db
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            nombre,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrados'
        })
        
    }
}

const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;
    
    try {

        const dbUser = await Usuario.findOne({email: email});

        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                mesg: 'El correo no existe'
            });
        }

        //confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contrasena no es valida'
            });
        }

        //Generar token
        const token = await generarJWT(dbUser.id, dbUser.nombre);

        //respesta
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            nombre: dbUser.nombre,
            token
        });

        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const revalidarToken = async(req = request, res= response) => {

    const { uid, nombre } = req;
    const token = await generarJWT(uid, nombre);

    return res.json({
        ok: true,
        uid,
        nombre,
        token
    })

}




module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}