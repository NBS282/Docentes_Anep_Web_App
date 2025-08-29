import Bloque from "../../domain/bloque.js";
import BloqueEstructurado from "../../domain/bloqueEstructurado.js";
import { variables } from "../main.js";

export function cargarDatosBloque(nroBloque) {
  variables.boolEditandoBloque = true;
  let laPlanificacion =
    variables.listaPlanificaciones[variables.listaPlanificaciones.length - 1];
  let elBloque = laPlanificacion.consultarBloque(nroBloque);
  variables.bloqueSiendoEditado = elBloque;

  // Planificación semanal
  if (laPlanificacion.getEsDiaria() === "Semanal") {
    document.getElementById("SemanalCientifico").value =
      elBloque.getCuerpoCientifico();
    document.getElementById("SemanalComunicacion").value =
      elBloque.getCuerpoComunicacion();
    document.getElementById("SemanalSyH").value = elBloque.getCuerpoSyH();
    document.getElementById("SemanalCreativoArtistico").value =
      elBloque.getCuerpoCreativoArtistico();
    document.getElementById("SemanalDevPerYConCor").value =
      elBloque.getCuerpoDevPerYConCor();
    document.getElementById("SemanalTec").value = elBloque.getCuerpoTec();
    return;
  }

  // Planificación diaria
  document.getElementById("espacio").selected = elBloque.getEspacio();
  document.getElementById("unidad" + elBloque.getEspacio()).selected =
    elBloque.getUnidad();
  document.getElementById("titulo").value = elBloque.getTitulo();

  // Bloque libre
  if (!elBloque.esEstructurado()) {
    document.getElementById("planificacion").value = elBloque.getCuerpo();
    return;
  }

  // Bloque estructurado
  if (elBloque.esEstructurado()) {
    document.getElementById("competenciasGenerales").value =
      elBloque.getCompetenciasGenerales();
    document.getElementById("competenciasEspecificas").value =
      elBloque.getCompetenciasEspecificas();
    document.getElementById("contenido").value = elBloque.getContenido();
    document.getElementById("criteriosLogro").value =
      elBloque.getCriteriosLogro();
    document.getElementById("metaAprendizaje").value =
      elBloque.getMetaAprendizaje();
    document.getElementById("titplanAprendizajeulo").value =
      elBloque.getPlanAprendizaje();
    document.getElementById("fundamentacionDisciplinar").value =
      elBloque.getFundamentacionDisciplinar();
    document.getElementById("fundamentacionDidactica").value =
      elBloque.getFundamentacionDidactica();
    document.getElementById("observaciones").value =
      elBloque.getObservaciones();
    return;
  }
}

export function createBlock() {
  const bloquesList = document.getElementById("listaBloques");
  const newBlock = document.createElement("li");
  newBlock.textContent = `Bloque ${bloquesList.children.length + 1}`;
  bloquesList.appendChild(newBlock);
}

export function modificarPlanificacion(idPlanificacion) {
  let fecha;
  if (
    variables.listaPlanificaciones[idPlanificacion].getEsDiaria() == "Semanal"
  ) {
    fecha = variables.startDateInput.value;
  } else {
    fecha = document.getElementById("claendar").value;
  }
  variables.listaPlanificaciones[idPlanificacion].setFecha(fecha);
  verificacionDePlanificaciones();
}

// Función para obtener el texto de la opción seleccionada en el <select> de unidades
export function getUnidadSeleccionada(espacioId) {
  const selectUnidad = document.getElementById("unidad" + espacioId);
  if (selectUnidad && selectUnidad.selectedOptions.length > 0) {
    return selectUnidad.selectedOptions[0].textContent;
  }
  return "Unidad Invalida"; // Retorna vacío si no hay selección válida
}

// Función savePlan refactorizada
export function savePlan() {
  let estructuradaOLibre = document.getElementById(
    "select_estructuraPlanificacion",
  ).value;
  if (estructuradaOLibre == "1") {
    guardarEditarBloqueLibre();
  } else {
    guardarEditarBloqueEstructurado();
  }
}

export function savePlanSemanal() {
  let listaCheck = [];
  let txtCientifico = document.getElementById("SemanalCientifico").value;
  listaCheck.push(txtCientifico);
  let txtComunicacion = document.getElementById("SemanalComunicacion").value;
  listaCheck.push(txtComunicacion);
  let txtSyH = document.getElementById("SemanalSyH").value;
  listaCheck.push(txtSyH);
  let txtArtistico = document.getElementById("SemanalCreativoArtistico").value;
  listaCheck.push(txtArtistico);
  let txtDev = document.getElementById("SemanalDevPerYConCor").value;
  listaCheck.push(txtDev);
  let txtTec = document.getElementById("SemanalTec").value;
  listaCheck.push(txtTec);
  variables.bloqueSiendoEditado.setCuerpoCientifico(txtCientifico);
  variables.bloqueSiendoEditado.setCuerpoComunicacion(txtComunicacion);
  variables.bloqueSiendoEditado.setCuerpoSyH(txtSyH);
  variables.bloqueSiendoEditado.setCuerpoCreativoArtistico(txtArtistico);
  variables.bloqueSiendoEditado.setCuerpoDevPerYConCor(txtDev);
  variables.bloqueSiendoEditado.setCuerpoTec(txtTec);
  for (let i = 0; i < listaCheck.length; i++) {
    if (listaCheck[i] !== "") {
      variables.seEditoAlMenosUnBloqueSemanal = true;
    }
  }
  showDiv("step3");
}

function guardarEditarBloqueLibre() {
  let espacioId = document.getElementById("espacio").value;
  let indEspacio = document.getElementById("espacio").selectedIndex;
  let espaciotxt =
    document.getElementById("espacio").options[indEspacio].textContent;
  let elCuerpo = document.getElementById("planificacion").value;
  let elTitulo = document.getElementById("tituloLibre").value;
  const unidad = getUnidadSeleccionada(espacioId);
  if (!unidad) {
    alert("Por favor, selecciona una unidad.");
    return;
  }

  let laPlanificacion =
    variables.listaPlanificaciones[variables.listaPlanificaciones.length - 1];
  if (variables.boolEditandoBloque) {
    variables.bloqueSiendoEditado.setEspacio(espaciotxt);
    variables.bloqueSiendoEditado.setUnidad(unidad);
    variables.bloqueSiendoEditado.setCuerpo(elCuerpo);
    variables.bloqueSiendoEditado.setTitulo(elTitulo);
  } else {
    const bloqueNuevo = new Bloque(espaciotxt, unidad);
    bloqueNuevo.setCuerpo(elCuerpo);
    bloqueNuevo.setTitulo(elTitulo);
    laPlanificacion.agregarBloque(bloqueNuevo);
    createBlock();
  }
  showDiv("step3");
}

function guardarEditarBloqueEstructurado() {
  let espacioId = document.getElementById("espacio").value;
  const unidad = getUnidadSeleccionada(espacioId);
  let indEspacio = document.getElementById("espacio").selectedIndex;
  let espaciotxt =
    document.getElementById("espacio").options[indEspacio].textContent;
  let elTitulo = document.getElementById("tituloEstructurada").value;
  let competenciasGenerales = document.getElementById(
    "competenciasGenerales",
  ).value;
  let competenciasEspecificas = document.getElementById(
    "competenciasEspecificas",
  ).value;
  let contenido = document.getElementById("contenido").value;
  let criteriosLogro = document.getElementById("criteriosLogro").value;
  let metaAprendizaje = document.getElementById("metaAprendizaje").value;
  let planAprendizaje = document.getElementById("planAprendizaje").value;
  let fundamentacionDisciplinar = document.getElementById(
    "fundamentacionDisciplinar",
  ).value;
  let fundamentacionDidactica = document.getElementById(
    "fundamentacionDidactica",
  ).value;
  let observaciones = document.getElementById("observaciones").value;

  if (!unidad) {
    alert("Por favor, selecciona una unidad.");
    return;
  }

  if (variables.boolEditandoBloque) {
    variables.bloqueSiendoEditado.setEspacio(espaciotxt);
    variables.bloqueSiendoEditado.setUnidad(unidad);
    variables.bloqueSiendoEditado.setTitulo(elTitulo);
    variables.bloqueSiendoEditado.setCompetenciasGenerales(
      competenciasGenerales,
    );
    variables.bloqueSiendoEditado.setCompetenciasEspecificas(
      competenciasEspecificas,
    );
    variables.bloqueSiendoEditado.setContenido(contenido);
    variables.bloqueSiendoEditado.setCriteriosLogro(criteriosLogro);
    variables.bloqueSiendoEditado.setMetaAprendizaje(metaAprendizaje);
    variables.bloqueSiendoEditado.setPlanAprendizaje(planAprendizaje);
    variables.bloqueSiendoEditado.setFundamentacionDisciplinar(
      fundamentacionDisciplinar,
    );
    variables.bloqueSiendoEditado.setFundamentacionDidactica(
      fundamentacionDidactica,
    );
    variables.bloqueSiendoEditado.setObservaciones(observaciones);
  } else {
    const bloqueNuevo = new BloqueEstructurado(espaciotxt, unidad);
    bloqueNuevo.setTitulo(elTitulo);
    bloqueNuevo.setCompetenciasGenerales(competenciasGenerales);
    bloqueNuevo.setCompetenciasEspecificas(competenciasEspecificas);
    bloqueNuevo.setContenido(contenido);
    bloqueNuevo.setCriteriosLogro(criteriosLogro);
    bloqueNuevo.setMetaAprendizaje(metaAprendizaje);
    bloqueNuevo.setPlanAprendizaje(planAprendizaje);
    bloqueNuevo.setFundamentacionDisciplinar(fundamentacionDisciplinar);
    bloqueNuevo.setFundamentacionDidactica(fundamentacionDidactica);
    bloqueNuevo.setObservaciones(observaciones);

    let laPlanificacion =
      variables.listaPlanificaciones[variables.listaPlanificaciones.length - 1];
    laPlanificacion.agregarBloque(bloqueNuevo);
    createBlock(); // Crear un nuevo bloque en la lista
  }

  // Vuelve al menú anterior
  showDiv("step3");
}
