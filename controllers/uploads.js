const { request, response } = require("express");
const path = require('path');

const cargarArchivo = async(req = request, res = response) => {

    console.log(req.files)

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg: 'No hay archivo que subir'
        })
        return;
    }

    const { archivo } = req.files;

    const uploadPath = path.join( __dirname, '../uploads/' + archivo.name );

    archivo.mv(uploadPath, (err) => {
        if (err) {
        return res.status(500).json({err});
    }

        res.json({msg: 'El archivo se subio a' + uploadPath});
    });



}

module.exports = {
    cargarArchivo
}