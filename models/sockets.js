const BandList = require("./band-list");

class Sockets {
    constructor(io) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        //* On Connetion
        this.io.on('connection', (socket) => {
            //*
            console.log('cliente conectado');
            //* Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            //TODO: VOTAR POR LA BANDA
            socket.on('votar-banda', (id) => {
                //* Se ejecuta
                this.bandList.increaseVotes(id);
                //* Pero se debe emitir nuevamente la lista de las bandas, se pone el io para que emita a todos los clientes conectados
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //TODO: BORRAR BANDA
            socket.on('borrar-banda', (id) => {
                //* Se ejecuta el metodo de borrar la banda
                this.bandList.removeBand(id);
                //* Se emite nuevamente todas las bandas a todos los clientes para que visualicen los cambios
                this.io.emit('current-bands', this.bandList.getBands());
            });

            //TODO: CAMBIAR NOMBRE DE LA BANDA
            socket.on('cambiar-nombre-banda', ({ id, nombre }) => {
                //* Se ejecuta el metodo de cambiar nombre de la banda
                this.bandList.changeBandName(id, nombre);
                //* Se emite nuevamente todas las bandas a todos los clientes para que visualicen los cambios
                this.io.emit('current-bands', this.bandList.getBands());
            });


            //TODO: CREAR BANDA
            socket.on('crear-banda', (nombre) => {
                //* Se ejecuta el metodo para crear una nueva banda
                this.bandList.addBand(nombre);
                //* Se emite nuevamente todas las bandas a todos los clientes para que visualicen los cambios
                this.io.emit('current-bands', this.bandList.getBands());
            });
        });

    }
}

module.exports = Sockets;