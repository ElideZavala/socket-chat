var socket = io();


var params = new URLSearchParams( window.location.search );

if ( !params.has('nombre') ) {
    window.location = 'index.html'
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    
    socket.emit('entrarChat', usuario, ( resp ) => {
        console.log( 'Usuarios conectados', resp );

    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    console.log('Servidor:', mensaje);
});