const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios'); 
const { crearMensaje } = require('../utilidades/utilizades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', ( data, callback ) => {

        console.log(data);

        if( !data.nombre || !data.sala ){
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        // Conectar un usuario a una sala
        client.join( data.sala );

        let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala );

        // Evento escuchado por todas las personas cuando entra o sale del chad
        client.broadcast.emit('listaPersona', usuarios.getPersonas() );

        callback( personas );
    
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.emit( 'crearMensaje', mensaje );
    });
    
    client.on('disconnect', () => {
        
        let personaBorrada = usuarios.borrarPersona( client.id );

        //Informar a todos los usuarios
        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`) );
        client.broadcast.emit('listaPersona', usuarios.getPersonas() );

    });

    // Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona( client.id );
        // Enviar un mensaje a un id en especifico  (para => id de la persona que yo quiero enviar)
        client.broadcast.to(data.para).emit( 'mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );
        
    });

});