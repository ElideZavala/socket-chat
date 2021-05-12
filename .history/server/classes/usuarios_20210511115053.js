

class Usuarios {

	constructor() {
		this.personas = [];
	}

	agregarPersona( id, nombre ) {

		let persona = { id, nombre };
	
		this.personas.push( persona ); 
	}

}


module.exports = {
	Usuarios
}