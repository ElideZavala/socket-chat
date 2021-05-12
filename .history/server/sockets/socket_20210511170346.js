const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios'); 

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', ( data, callback ) => {

        if( !data.nombre ){
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona( client.id, data.nombre );

        callback( personas );
    
    });
    
    client.on('disconnect', () => {
        
        let personaBorrada = usuarios.borrarPersona( client.id );

        //Informar a todos los usuarios
        client.broadcast.emit('crearMensaje');

    });



});