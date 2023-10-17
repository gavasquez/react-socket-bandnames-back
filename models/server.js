//* Servidor de Express
const express = require('express');
const http = require('http');
const sockeIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //* Http Server
        this.server = http.createServer(this.app);
        //* Configuraciones de Sockets
        this.io = sockeIo(this.server, {/* Configuraciones */ });
    }

    middlewares() {
        //* Desplegar el Directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        //* CORS
        this.app.use(cors());
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        //* Inicializar middlewares
        this.middlewares();
        //* Inicializar Sockets
        this.configurarSockets();
        //* Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto :', this.port);
        });
    }
}

module.exports = Server;