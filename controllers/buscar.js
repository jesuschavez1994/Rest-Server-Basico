const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models')

const colesccionesPermitidas = [
    'categorias',
    'categoriasPorId',
    'productos',
    'roles',
    'usuarios',
]

const buscarCategorias = async( termino = '', res = response) => {

    const isMongoId = ObjectId.isValid( termino ) // Devuelve true || false si es un id valido 

    if(isMongoId){
        const categoria = await Categoria.findById( termino );
        res.json({
            results: (categoria) ? [ categoria ] : [] 
        })
    }else{
        const regex = new RegExp( termino, 'i'); // Una buscqueda insensible
        const categoria = await Categoria.find({ nombre: regex, estado: true  });
        res.json({
            results: categoria
        });
    }
}


const buscarProductos = async( termino = '', res = response) => {

    const isMongoId = ObjectId.isValid( termino ) // Devuelve true || false si es un id valido 

    if(isMongoId){
        const producto = await Categoria.findById( termino ).populate('categoria', 'nombre');
        res.json({
            results: (producto) ? [ producto ] : [] 
        })
    }else{
        const regex = new RegExp( termino, 'i'); // Una buscqueda insensible
        const producto = await Categoria.find({ nombre: regex, estado: true  }).populate('categoria', 'nombre');
        res.json({
            results: producto
        });
    }
}

const productsByCategory = async( termino = '', res = response) => {

    const isMongoId = ObjectId.isValid( termino ) // Devuelve true || false si es un id valido 

    if(isMongoId){
        const categoria = await Categoria.findById( termino ).populate('categoria', 'nombre');
        res.json({
            results: (categoria) ? [ categoria ] : [] 
        });
    }else{
        const regex = new RegExp( termino, 'i'); // Una buscqueda insensible

        const categoria = await Categoria.find({   nombre: regex, estado: true  }).populate('categoria', 'nombre');

        if(!categoria[0] ){
            return res.status(400).json({
                msg: `La categoria ${termino} no existe`
            })
        }

        if(categoria){
            //Filtramos el producto por categoria y además que el producto se encuentre disponible
            const producto = await Producto.find({ categoria: categoria[0]._id, disponible: true }).populate('categoria', 'nombre');

            if(!producto[0] ){
                return res.status(400).json({
                    msg: 'No se encontraron productos'
                })
            }

            res.json({
                results: producto
            });
        }
    }
}

    

const buscarUsuario = async( termino = '', res = response) => {

    const isMongoId = ObjectId.isValid( termino ) // Devuelve true || false si es un id valido 

    if(isMongoId){
        const usuario = await Usuario.findById( termino );
        res.json({
            results: (usuario) ? [ usuario ] : [] 
        })
    }else{
        const regex = new RegExp( termino, 'i'); // Una buscqueda insensible
        const usuario = await Usuario.find({ 
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [{estado:true}]
        });
        res.json({
            results: usuario
        });
    }
}



const buscar = async( req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if(  !colesccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ colesccionesPermitidas }`
        });
    }

    switch(coleccion){

        case 'categorias':
        buscarCategorias(termino, res)
        break;

        case 'productos':
        buscarProductos(termino, res)
        break;

        case 'usuarios':
        buscarUsuario(termino, res);
        break;

        case 'categoriasPorId':
        productsByCategory(termino, res)
        break;

        default: 
        res.status(500).json({
            msg: 'Se me olvido está búsqueda'
        })
    }

}

module.exports = {
    buscar
}