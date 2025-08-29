export default class Bloque {
  constructor(espacio, unidad) {
    this.setEspacio(espacio);
    this.setUnidad(unidad);
  }

  imprimirBloque() {
    return (
      "Espacio Curricular: " +
      this.getEspacio() +
      " - Unidad Curricular: " +
      this.getUnidad()
    );
  }

  toString() {
    return this.imprimirBloque();
  }

  esEstructurado() {
    return false;
  }

  setEspacio(espacio) {
    this.espacio = espacio;
  }

  getEspacio() {
    return this.espacio;
  }

  setUnidad(unidad) {
    this.unidad = unidad;
  }

  getUnidad() {
    return this.unidad;
  }

  setTitulo(unTitulo) {
    this.titulo = unTitulo;
  }

  getTitulo() {
    return this.titulo;
  }

  setCuerpo(cuerpo) {
    this.cuerpo = cuerpo;
  }

  getCuerpo() {
    return this.cuerpo;
  }

  /*agregarArchivo(archivo) {
    //la clase debe contener los archivos (o sus direcciones)
    //posiblemente fijandose si existe un archivo con ese nombre, de ser asi lo sobrescribe
  }

  listarArchivos() {
    //posiblemente retorne donde se encuentran los archivos
  }*/
}
