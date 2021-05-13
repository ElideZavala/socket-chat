var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// Referencias de Jquery
var divUsuarios = $('#divUsuarios');
var formEnviar  = $('#formEnviar');
var txtMensaje  = $('#txtMensaje');
var divChatbox  = $('#divChatbox');

// Funciones para renderizar usuarios
function renderizarUsuarios(personas) {
  // [{}, {}, {}]

  console.log(personas);

  let html = '';

		html += 
		`<li>
			<a href="javascript:void(0)" class="active">
				Chat de <span> ${ params.get('sala') }</span>
			</a>
		</li>`;


 	personas.forEach( persona => {
		html +=
			`<li>
				<a data-id="'${ persona.id}'" href="javascript:void(0)">
					<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle" /> 
					<span> ${ persona.nombre }<small class="text-success">online</small></span>
				</a>
			</li>`
	});	
	
	divUsuarios.html(html);

}

function renderizarMensajes( mensaje, yo ) {

	let html = '';
	let fecha = new Date( mensaje.fecha );
	let minutos = fecha.getMinutes()<10?'0':'' + fecha.getMinutes() 
	let hora = ` ${fecha.getHours()} : ${ minutos }`
	
	if( yo ){
		html +=`
			<li class="reverse">
				<div class="chat-content">
					<h5>${ mensaje.nombre }</h5>
				<div class="box bg-light-inverse">${ mensaje.mensaje }</div>
				</div>
					<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
				<div class="chat-time">${ hora }</div>
			</li>`
	} else {
		html += `
			<li class="animated fadeIn">
				<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
					<div class="chat-content">
						<h5>${ mensaje.nombre }</h5>
						<div class="box bg-light-info">${ mensaje.mensaje }</div>
					</div>
				<div class="chat-time">${ hora }</div>
			</li>
		`	
	}



		divChatbox.append(html);
		
}


// Listeners
divUsuarios.on('click', 'a', function() {

	var id = $(this).data('id');

	if( id ) {
		console.log(id);
	}

});


formEnviar.on('submit', function(e) {

	e.preventDefault();

	if( txtMensaje.val().trim().length === 0 ) {
		return;
	}

	// Enviar información
	socket.emit('crearMensaje', {
		nombre: nombre,
		mensaje: txtMensaje.val()
	 }, function(mensaje) {
		txtMensaje.val('').focus();
		renderizarMensajes(mensaje, true);
	 });
});
