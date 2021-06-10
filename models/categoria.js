const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
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
    }
});
// Metodo para no mostrar el password en la respuesta del backend y la version: __v
CategoriaSchema.methods.toJSON = function(){
    const { __v, estado, ...categoria } = this.toObject();
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);