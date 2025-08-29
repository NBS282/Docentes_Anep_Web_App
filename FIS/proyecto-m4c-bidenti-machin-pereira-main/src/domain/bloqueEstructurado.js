export default class BloqueEstructurado {
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

  setEspacio(espacio) {
    this.espacio = espacio;
  }

  getEspacio() {
    return this.espacio;
  }

  toString() {
    return this.imprimirBloque();
  }

  esEstructurado() {
    return true;
  }

  setTitulo(unTitulo) {
    this.titulo = unTitulo;
  }

  getTitulo() {
    return this.titulo;
  }

  setUnidad(unidad) {
    this.unidad = unidad;
  }

  getUnidad() {
    return this.unidad;
  }

  getCompetenciasGenerales() {
    return this.competenciasGenerales;
  }

  setCompetenciasGenerales(valorCampoTexto) {
    this.competenciasGenerales = valorCampoTexto;
  }

  getCompetenciasEspecificas() {
    return this.competenciasEspecificas;
  }

  setCompetenciasEspecificas(valorCampoTexto) {
    this.competenciasEspecificas = valorCampoTexto;
  }

  getContenido() {
    return this.contenido;
  }

  setContenido(valorCampoTexto) {
    this.contenido = valorCampoTexto;
  }

  getCriteriosLogro() {
    return this.criteriosLogro;
  }

  setCriteriosLogro(valorCampoTexto) {
    this.criteriosLogro = valorCampoTexto;
  }

  getMetaAprendizaje() {
    return this.metaAprendizaje;
  }

  setMetaAprendizaje(valorCampoTexto) {
    this.metaAprendizaje = valorCampoTexto;
  }

  getPlanAprendizaje() {
    return this.planAprendizaje;
  }

  setPlanAprendizaje(valorCampoTexto) {
    this.planAprendizaje = valorCampoTexto;
  }

  getFundamentacionDisciplinar() {
    return this.fundamentacionDisciplinar;
  }

  setFundamentacionDisciplinar(valorCampoTexto) {
    this.fundamentacionDisciplinar = valorCampoTexto;
  }

  getFundamentacionDidactica() {
    return this.fundamentacionDidactica;
  }

  setFundamentacionDidactica(valorCampoTexto) {
    this.fundamentacionDidactica = valorCampoTexto;
  }

  getObservaciones() {
    return this.observaciones;
  }

  setObservaciones(valorCampoTexto) {
    this.observaciones = valorCampoTexto;
  }

  /*agregarArchivo(archivo) {
      //la clase debe contener los archivos (o sus direcciones)
      //posiblemente fijandose si existe un archivo con ese nombre, de ser asi lo sobrescribe
    }
  
    listarArchivos() {
      //posiblemente retorne donde se encuentran los archivos
    }*/
}
