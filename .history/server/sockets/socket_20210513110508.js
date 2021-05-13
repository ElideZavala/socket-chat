const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios'); 
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', ( data, callback ) => {

        if( !data.nombre || !data.sala ){
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        // Conectar un usuario a una sala
        client.join( data.sala );

        usuarios.agregarPersona( client.id, data.nombre, data.sala );
        // Evento escuchado por todas las personas cuando entra o sale del chad
        client.broadcast.to( data.sala ).emit('listaPersona', usuarios.getPersonasPorSala( data.sala ) );
        client.broadcast.to( persona.sala ).emit('crearMensaje', crearMensaje('Administrador', `${ persona.nombre } se unio`) );

        callback( usuarios.getPersonasPorSala( data.sala ) );
    
    });

    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit( 'crearMensaje', mensaje );

        callback(mensaje);
    });
    
    client.on('disconnect', () => {
        
        let personaBorrada = usuarios.borrarPersona( client.id );

        //Informar a todos los usuarios
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`) );
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala( personaBorrada.sala ) );

    });

    // Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona( client.id );
        // Enviar un mensaje a un id en especifico  (para => id de la persona que yo quiero enviar)
        client.broadcast.to(data.para).emit( 'mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );
        
    });

});