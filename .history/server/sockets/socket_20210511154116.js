const { io } = require('../server');


io.on('connection', (client) => {

    ClientRect.on('entrarChat', (usuario) => {

        console.log(usuario);
    })


});