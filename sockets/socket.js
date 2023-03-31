

const configuracionSocket = (server) =>{

    const io = require('socket.io')(server, {
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
        client.on('chat message', (msg) => {
            console.log('mensaje enviado: ', msg);
            io.emit('chat message', msg);
        })
    });
}

module.exports= {
    configuracionSocket
}