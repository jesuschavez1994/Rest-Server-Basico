const express = require('express')
const cors = require('cors');
const { dbconeccton } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:                       '/api/auth',
            buscar:                     '/api/buscar',
            categorias:                 '/api/categorias',
            productos:                  '/api/productos',
            usuarios:                   '/api/usuarios'
        }

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
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.buscar, require('../routes/buscar'));
        this.app.use(this.path.categorias, require('../routes/categorias'));
        this.app.use(this.path.productos, require('../routes/productos'));
        this.app.use(this.path.usuarios, require('../routes/user'));
    }

    start(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;