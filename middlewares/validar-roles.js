const { request, response } = require("express");

const esAdminRole = (req = request, res = response , next ) => {

    if(!req.usuario){
        return res.status(501).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { role, nombre } = req.usuario;

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El rol de ${ nombre } no es administrador.`
        });
    }

    next();
}

const tieneRole = ( ...roles ) =>{

    return (req = request, res = response , next) => {
        // console.log(roles, req.usuario.role)
        if(!req.usuario){
            return res.status(501).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if( !roles.includes(req.usuario.role) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos ${ roles } .`
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}