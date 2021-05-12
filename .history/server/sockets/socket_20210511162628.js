const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios'); 

io.on('connection', (client) => {

    client.on('entrarChat', (usuario) => {

        console.log(usuario);

    })


});