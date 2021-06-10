const { response, request } = require("express");
const { Producto } = require('../models');

const crearProducto = async( req = request, res = response) => {
 
    const { estado, usuario, ...body } = req.body;
    nombre = body.nombre
    // Chequeamo si existe el producto con ese nombre
    const ProductoDB = await Producto.findOne({ nombre });
    // Si existe entoces enviamos un error 400
    if( ProductoDB ){
        return res.status(400).json({
            msg: `La categoria ${ProductoDB.nombre} ya existe`
        });
    }
     // Generar la data a guardar
     const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    // Generamos una nueva instancia
    const producto = new Producto( data );
    // Guardamos en la base de datos
    await producto.save();

    res.status(201).json(
        producto
    );
}

// Get - Obtener todos los productos existentes
const obtenerProductos = async(req = request, res = response) => {

    const { limite = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.count( query ),
        Producto.find( query )
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip( Number(from) )
        .limit( Number(limite) )
    ])
    res.json({
        msg: 'Get API - Controller',
        total,
        productos
    });
}

// Get - Obtener producto especifico por :id
const obtenerProductoPorId = async(req = request, res = response) =>{
    // Estxreamos el id
    const { id } = req.params;
    //Validamos que el id sea valido
    const producto =  await Producto.findById( id );

    res.json( producto );
}

// Actualizar producto por id
const actualizarProducto = async(req= request, res = response) => {
    // Estxreamos el id
    const { id } = req.params;
    // Sacamos los valores del estado y los datos del usuario por seguridad
    const { estado, usuario, ...data } = req.body;
    //Convertimos el nombre a mayusculas
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json( 
        producto
    );
}

// Borrar un producto
const borrarProducto  = async(req= request, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, {new: true});

    res.json( 
        productoBorrado
    );
}



module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
}