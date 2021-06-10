const { Router } = require('express');
const { buscar } = require('../controllers/buscar');


const router = Router();

/** {{url}}/api/buscar/:coleccion/termino*/

// Obtener todas las busquedas
router.get('/:coleccion/:termino', buscar);




module.exports = router;