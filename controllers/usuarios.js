const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const  usuariosGet = async(req = request, res = response ) => {

    const { limite = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.count( query ),
        Usuario.find( query )
        .skip( Number(from) )
        .limit( Number(limite) )
    ])

    res.json({
        msg: 'Get API - Controller',
        total,
        usuarios
    })
}

const usuarioPost = async(req = request, res = response) => {
    
    const {nombre, correo, password, role} = req.body;
    // const body = req.body;
    const usuario = new Usuario( { nombre, correo, password, role } );
    // Encriptar la contraseña //
    const salt = bcrypt.genSaltSync(); // => Numeros de vueltas por defecto 10
    usuario.password = bcrypt.hashSync(password, salt) // Encriptar en una sola via

    await usuario.save();

    res.json({
        msg: 'Post API - Controller',
        usuario
    });

}

const usuarioPut = async(req = request, res = response) => {

    // Obtenemos el id del request
    const { id } = req.params;
    /** Validar contra base de datos
     * @description Extraemos lo que no necesitamos manipular como el password y autenticación por google
     * extraemos el _id, ya que no podemos actualizar el id de un usuario
     * */ 
    const { _id, password, google, correo, ...resto } = req.body;
    /** Validar contra base de datos
     * @description si viene el password es porque el usuario desea actualizar su password 
     * */ 

    if( password ){
        // Encriptar la contraseña //
        const salt = bcrypt.genSaltSync(); // => Numeros de vueltas por defecto 10
        resto.password = bcrypt.hashSync(password, salt) // Encriptar en una sola via
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto, {new:true});

    res.json({
        msg: 'Put API - Controller',
        usuario
    });
}

const usuarioPatch = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Patch  API - Controller'
    });
}

const usuarioDelete = async(req = request, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario

    res.json({
        msg: 'Delete  API - Controller',
        usuario,
        usuarioAutenticado
    });
}

module.exports = {
    usuariosGet, usuarioPost,
    usuarioPut, usuarioPatch,
    usuarioDelete
}