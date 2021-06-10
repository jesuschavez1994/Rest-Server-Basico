
const { Producto, Categoria, Role, Usuario } = require('../models')


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

const existeCategoriaPorId = async( id ) => {
    // Verificar si el id existe en la DB
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeproductoPorId = async( id ) => {
    // Verificar si el id existe en la DB
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

    

module.exports = { 
    isRoleValido, 
    isEmailEsxist,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeproductoPorId
}