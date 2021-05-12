var socket = io();


var paras = new URLSearchParams( window.location.search );

socket.on('connect', function() {
    console.log('Conectado al servidor');
    
    socket.emit('entrarChat', { usuario: 'Elide' })
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
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});