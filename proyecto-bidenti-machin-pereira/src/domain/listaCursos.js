export default class ListaCursos {
  constructor() {
    this.laLista = [];
  }

  getLista() {
    return this.laLista;
  }

  setLista(listaNueva) {
    this.laLista = listaNueva;
  }

  agregarCurso(curso) {
    this.laLista.push(curso);
  }

  consultarCurso(nroCurso) {
    return this.laLista[nroCurso - 1]; // Devuelve el curso en el índice correcto
  }

  eliminarCurso(cursoEliminar) {
    for (let i = 1; i <= this.cantidadCursos(); i++) {
      if (this.consultarCurso(i) == cursoEliminar) {
        this.laLista.splice(i - 1, 1);
      }
    }
  }

  modificarCurso(cursoModifico, nombreNuevo, anoNuevo) {
    for (let i = 1; i <= this.cantidadCursos(); i++) {
      if (this.consultarCurso(i) == cursoModifico) {
        this.consultarCurso(i).setAno(anoNuevo);
        this.consultarCurso(i).setColegio(nombreNuevo);
      }
    }
  }

  cantidadCursos() {
    return this.laLista.length;
  }

  toString() {
    return "test";
  }
}

//Hola
