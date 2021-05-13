var params = new URLSearchParams(window.location.search);

let nombre = params.get('nombre');
let sala = params.get('sala');

// Referencias de Jquery
const divUsuarios = $('#divUsuarios');
const formEnviar = $('#formEnviar');
const txtMensaje = $('#txtMensaje');

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
	 }, function(resp) {
		console.log('respuesta server: ', resp);
	 });
});
