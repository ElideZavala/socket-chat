let params = new URLSearchParams(window.location.search);


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
}
