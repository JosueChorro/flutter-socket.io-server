const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Hardwell'))
bands.addBand(new Band('Martin Garrix'))
bands.addBand(new Band('Timmy Trumpet'))
bands.addBand(new Band('Steve Aoki'))

io.on('connection', client => {
    console.log("C conecto");
    
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log("Desconectado");
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    })

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })

    // client.on('mensaje', (payload) => {
    //     console.log("Mensaje");

    //     io.emit('mensaje', {admin: 'nuevo mensaje'})
    // })

    // client.on('enviar-mensaje', (payload) => {
    //     client.broadcast.emit('nuevo-mensaje', payload)
    // })
});