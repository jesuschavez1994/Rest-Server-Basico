const { request, response } = require("express");
const path = require('path');
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require('../models')

const cargarArchivo = async(req = request, res = response) => {

    if (!req.file || Object.keys(req.file).length === 0 || !req.file.fieldname) {
        res.status(400).json({
            msg: 'No hay archivo que subir'
        });
        return;
    }else{
        try{
            const arvhivo = await subirArchivo(req.file, ['jpg', 'jpeg', 'png', 'gif'], 'avatar');
            console.log(arvhivo)
            res.json({
                path: req.file.path
            });
        }catch(error){
            return res.status(400).json({error});
        }
    }
}


const ActualizarImagen = async(req = request, res = response) => {

    const {coleccion, id} = req.params;

    let modelo;

    switch(coleccion){

        case 'usuarios':
            modelo = await Usuario.findById( id );
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe usuario con el id: ${id}`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById( id );
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${id}`
                });
            }
        break;

        default: 
        return res.status(500).json({
            msg: 'Se me olvido hacer esta validación para esta coleccion'
        });

    }

    try{
        const arvhivo = await subirArchivo(req.file, ['jpg', 'jpeg', 'png', 'gif'], 'avatar');
        modelo.img = arvhivo;
        await modelo.save()
        res.json({
            modelo,
            msg:'Ok'
        });
    }catch(error){
        return res.status(400).json({error});
    }

    
}

module.exports = {
    cargarArchivo, ActualizarImagen
}