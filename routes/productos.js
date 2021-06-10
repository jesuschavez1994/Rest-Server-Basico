const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto,
        obtenerProductos,
        obtenerProductoPorId, 
        actualizarProducto,
        borrarProducto
} = require('../controllers/productos');
const { existeproductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

/** {{url}}/api/productos*/

// Obtener todas los productos - público
router.get('/', obtenerProductos);

// Obtener producto por - id
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeproductoPorId ),
    validarCampos
], obtenerProductoPorId);

// crear producto - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id válido de Mongo').isMongoId(),
    validarCampos
], crearProducto );

// Actualizar un producto - se debe tenr el Token
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id válido de Mongo').isMongoId(),
    validarCampos
],  actualizarProducto);

// Borrar un producto - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeproductoPorId ),
    validarCampos
], borrarProducto);



module.exports = router;