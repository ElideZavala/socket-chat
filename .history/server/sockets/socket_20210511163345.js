const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios'); 

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', ( usuario, callback ) => {

        if( !data.nombre ){
            return callback({
                error: true,
                menasje: 'El nombre es necesario'
            });
        }

        usuarios.agregarPersona()

        console.log(usuario);
    })



});