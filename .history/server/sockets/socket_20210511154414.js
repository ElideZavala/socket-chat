const { io } = require('../server');


io.on('connection', (client) => {

    socket.on('entrarChat', (usuario) => {

        console.log(usuario);

    })


});