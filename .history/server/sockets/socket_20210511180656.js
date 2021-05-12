const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios'); 
const { crearMensaje } = require('../utilidades/utilizades');

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

        // Evento escuchado por todas las personas cuando entra o sale del chad
        client.broadcast.emit('listaPersona', usuarios.getPersonas() );
        

        callback( personas );
    
    });
    
    client.on('disconnect', () => {
        
        let personaBorrada = usuarios.borrarPersona( client.id );

        //Informar a todos los usuarios
        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`) );
        client.broadcast.emit('listaPersona', usuarios.getPersonas() );
    });

});