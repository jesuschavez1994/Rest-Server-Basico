const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login = async( req = request, res = response) => {

    const { correo, password } = req.body;

    try{

        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario | Password no son correctos - correo'
            });
        }

        // verificar si el usuario esta activo
        if( usuario.estado === false ){
            return res.status(400).json({
                msg: 'Usuario | Password no son correctos - estado: false'
            });
        }

        // verificar la contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password );

        if( !validarPassword){
            return res.status(400).json({
                msg: 'Usuario | Password no son correctos - password'
            });
        }

        // generar jwt

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    }catch( error ){
        console.log(error);
        return res.status(500).json({
            msg: 'Ha ocurrido un error'
        })
    }

   

}

module.exports = {
    login
}