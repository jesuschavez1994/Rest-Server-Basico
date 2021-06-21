const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, ActualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { upload } = require('../helpers/subir-archivo');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', upload, cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El id debe de ser un id valido de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], ActualizarImagen)


module.exports = router;