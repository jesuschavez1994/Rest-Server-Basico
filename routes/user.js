const { Router } = require('express');
const { usuariosGet, 
        usuarioPost, 
        usuarioPut, 
        usuarioPatch, 
        usuarioDelete 
        } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', usuarioPost);

router.put('/:id', usuarioPut);

router.patch('/', usuarioPatch);

router.delete('/', usuarioDelete);



module.exports = router;
