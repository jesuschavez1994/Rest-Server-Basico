const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const   validarJWT = async( req = request, res = response, next) => {

    const token = req.header('Authorization');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token'
        })
    }
    
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        const usuario = await Usuario.findById( uid );
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido | Usuario no existe en la DB'
            });
        }
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido | Usuario con estado: false'
            });
        }
        req.usuario = usuario;
        next();
    }catch(error){
        return res.status(401).json({
            msg: 'Token invalido'
        })
    }

}

module.exports = {
    validarJWT
}