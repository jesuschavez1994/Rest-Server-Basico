const { Schema, model } = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
// Metodo para no mostrar el password en la respuesta del backend y la version: __v
usuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}
module.exports = model('Usuario', usuarioSchema);