const Role = require('../models/role');
const Usuario = require('../models/usuario')

const isRoleValido = async(role = '' )  => {
    const existRole = await Role.findOne({ role });
    if(!existRole){
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const isEmailEsxist = async( correo = '' ) => {

    const existEmail = await Usuario.findOne({ correo });

    if( existEmail ){
        throw new Error(
            `El correo: ${ correo } ya existe.`
        )
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el id existe en la DB
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

    

module.exports = { 
    isRoleValido, 
    isEmailEsxist,
    existeUsuarioPorId
}