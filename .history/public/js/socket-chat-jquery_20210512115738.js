let params = new URLSearchParams(window.location.search);

// Referencias de Jquery
const divUsuarios = $('#divUsuarios');

// Funciones para renderizar usuarios
function renderizarUsuarios(personas) {
  // [{}, {}, {}]

  console.log(personas);

  let html = '';

		html += 
		`<li>
			<a href="javascript:void(0)" class="active">
				Chat de <span> ${ params .get('sala') }</span>
			</a>
		</li>`;


 	personas.forEach( persona => {
		html +=
			`<li>
				<a data-id"' ${ persona[1].id}'" href="javascript:void(0)">
					<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle" /> 
					<span> ${ persona.nombre }<small class="text-success">online</small></span>
				</a>
			</li>`
	});	


	// for( let i = 0; i < personas.length; i++ ) {
	// 	html +=
	// 		`<li>
	// 			<a data-id"' ${ personas[i].id }'" href="javascript:void(0)">
	// 				<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle" /> 
	// 				<span> ${ persona.nombre }<small class="text-success">online</small></span>
	// 			</a>
	// 		</li>`
	// }
	
	divUsuarios.html(html);
}
