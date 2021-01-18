const express    = require('express');
const http       = require('http');
const path       = require('path');
const cors       = require('cors');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer( this.app );


    }

    middlewares(){
        
        //Desplegar el directorio público
        this.app.use(express.static( path.resolve(__dirname, '../public')));

        //Cors
        this.app.use( cors() );
    }

    execute(){

        //Inicializar middlewares
        this.middlewares();

        //Inicializar Servidor
        this.server.listen( this.port, () =>{
            console.log('Server corriendo en el puerto:', this.port );
        });
    }
    

}

module.exports = Server