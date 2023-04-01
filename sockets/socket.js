let io
const configuracionSocket = (server, banda) => {
    io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', client => {
        console.log('cliente conectado');
        client.on('disconnect', () => {
            console.log('cliente desconectado');
        })
        client.on('agregar-banda', (payload) => {
            const nombre = payload.nombre;
            if (nombre.length) {
                banda.create({ name: nombre, votes: 0 })
                    .then(resp => {
                        console.log('banda agregada', resp);
                        io.emit("nuevo-banda", resp)
                    })

            }
            // io.emit('chat message', msg);
        })
        client.on('eliminar-banda', (id) => {
            banda.findByIdAndDelete(id)
                .then((banda) => {
                    console.log('banda eliminada: ', banda.id)
                    io.emit('perro-loco', banda.id)
                })

        })
        client.on('agregar-voto', (msg) => {
            console.log('agregar votos a: ', msg);
        })
    });
}

module.exports = {
    configuracionSocket,
    io
}