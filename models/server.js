const express = require('express')
const cors = require('cors');
const { dbconeccton } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar DB
        this.conectDB();

        // Midelwares //
        this.midelwares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectDB(){
        await dbconeccton();
    }

    midelwares(){

        //CORS //
        this.app.use( cors() );

        // lectura y paseo del body

        this.app.use( express.json() );

        // Directorio Publicos
        this.app.use( express.static('public'));
    }

    routes(){
       this.app.use(this.usuariosPath, require('../routes/user') );
    }

    start(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;