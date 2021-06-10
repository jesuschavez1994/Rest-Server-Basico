const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'EL nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        estado: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { 
        type: String 
    },
    disponible: {
        type: Boolean,
        default: true 
    }
});
// Metodo para no mostrar el password en la respuesta del backend y la version: __v
ProductoSchema.methods.toJSON = function(){
    const { __v, estado, ...producto } = this.toObject();
    return producto;
}

module.exports = model('Producto', ProductoSchema);