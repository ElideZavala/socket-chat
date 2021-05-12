const { io } = require('../server');


io.on('connection', (client) => {

    client.on('entrarChat', (usuario) => {

        console.log(usuario);

    })


});