const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mv = require('mv');


const subirArchivo = (file, extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'], carpeta) => {
    
    return new Promise((resolve, reject) => {
        const { originalname } = file;
        // Capturamos el tipo de extension del archivo
        const nameFile = originalname.split('.');
        const extension = nameFile[ nameFile.length -1 ];
        // Si la extension es valida:
        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es permitida, las extensiones validas son: ${extensionesValidas}`);
        }else{
           resolve(storage(carpeta))
        }
    });
}

const storage = (carpeta = '') => {

    let upload;

    fs.mkdirSync(`./uploads/${carpeta}`,{recursive:true});
    // let uploadPath = path.join(__dirname, `../uploads/${carpeta}`)

    upload = path.join(__dirname + '/uploads/' + carpeta);
    console.log(upload)
    
    return filesStorageEngine = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, `./uploads/${carpeta}`)
         },
        filename: function (req, file, callback) {
           callback(null, Date.now() + '-' + file.originalname)
        }
   });
}

const upload =  multer({ 
    storage: storage(),
    limits: 1000000 , // 1 Mb como máximo permitido
}).single('image');

module.exports = {
    subirArchivo, upload
}