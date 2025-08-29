export default class BloqueSemanal {
  constructor(diaSemana) {
    this.setTitulo(diaSemana);
    this.setCuerpoCientifico("");
    this.setCuerpoComunicacion("");
    this.setCuerpoSyH("");
    this.setCuerpoCreativoArtistico("");
    this.setCuerpoDevPerYConCor("");
    this.setCuerpoTec("");
  }

  imprimirBloque() {
    return this.getTitulo();
  }

  toString() {
    return this.imprimirBloque();
  }

  setTitulo(unTitulo) {
    this.titulo = unTitulo;
  }

  getTitulo() {
    return this.titulo;
  }

  setCuerpoCientifico(cuerpoTexto) {
    this.cuerpoCientifico = cuerpoTexto;
  }

  getCuerpoCientifico() {
    return this.cuerpoCientifico;
  }

  setCuerpoComunicacion(cuerpoTexto) {
    this.cuerpoComunicacion = cuerpoTexto;
  }

  getCuerpoComunicacion() {
    return this.cuerpoComunicacion;
  }

  setCuerpoSyH(cuerpoTexto) {
    this.cuerpoSyH = cuerpoTexto;
  }

  getCuerpoSyH() {
    return this.cuerpoSyH;
  }

  setCuerpoCreativoArtistico(cuerpoTexto) {
    this.cuerpoCreativoArtistico = cuerpoTexto;
  }

  getCuerpoCreativoArtistico() {
    return this.cuerpoCreativoArtistico;
  }

  setCuerpoDevPerYConCor(cuerpoTexto) {
    this.cuerpoDevPerYConCor = cuerpoTexto;
  }

  getCuerpoDevPerYConCor() {
    return this.cuerpoDevPerYConCor;
  }

  setCuerpoTec(cuerpoTexto) {
    this.cuerpoTec = cuerpoTexto;
  }

  getCuerpoTec() {
    return this.cuerpoTec;
  }

  /*agregarArchivo(archivo) {
      //la clase debe contener los archivos (o sus direcciones)
      //posiblemente fijandose si existe un archivo con ese nombre, de ser asi lo sobrescribe
    }
  
    listarArchivos() {
      //posiblemente retorne donde se encuentran los archivos
    }*/
}
