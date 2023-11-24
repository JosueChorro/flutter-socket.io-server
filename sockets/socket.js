const { io } = require('../index')

io.on('connection', client => {
    console.log("C conecto");

    client.on('disconnect', () => {
        console.log("Desconectado");
    });

    client.on('mensaje', (payload) => {
        console.log("Mensaje");

        io.emit('mensaje', {ædmin: 'nuevo mensaje'})
    })
});