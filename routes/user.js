const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuarioPost, 
        usuarioPut, 
        usuarioPatch, 
        usuarioDelete 
        } = require('../controllers/usuarios');
const { isRoleValido, isEmailEsxist, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/** CRUD
* @author: Jesús Chávez
* @description Rutas para realizar los metodos de GET, POST, PUT and DELETE
* */ 

router.get('/',  usuariosGet);

router.post('/',
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        check('password', 'El password es obligatorio y debe de tener más de 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( isEmailEsxist ),
        // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isRoleValido ),
        validarCampos,
        usuarioPost);

router.put('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('role').custom( isRoleValido ),
        validarCampos,
        ], usuarioPut);

router.patch('/', usuarioPatch);

router.delete('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos,
        ],
usuarioDelete);

module.exports = router;
