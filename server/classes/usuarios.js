

class Usuarios {

	constructor() {
		this.personas = [];
	}

	agregarPersona( id, nombre, sala ) {

		let persona = { id, nombre, sala };
	
		this.personas.push( persona );
		
		return this.personas;

	}

	getPersona( id ) {
		let persona = this.personas.filter( persona => persona.id === id )[0];       // <== Regresar siempre la primera posicion, es decir solo quiero un registro
		return persona; // si encuentra una persona voy a obtener un objeto si no un null o undefing 
	}

	// Regresar todas las persona que tienes en el chat
	getPersonas() {
		return this.personas; 
	}

	getPersonasPorSala( sala ) {
		let personasEnSala = this.personas.filter( persona => persona.sala === sala );
		return personasEnSala;
	}

	// Eliminar una persona que se fue de la sala
	borrarPersona( id ) {

		let personaBorrada = this.getPersona( id );

		this.personas = this.personas.filter( persona => persona.id != id );   // Nuevo arreglo sin la persona con el id que le estamos pasando. 

		return personaBorrada;
	}	


}


module.exports = {
	Usuarios
}