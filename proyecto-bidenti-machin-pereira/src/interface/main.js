import ListaCursos from "../domain/listaCursos.js";

//Funcion usada en index
export function largoListaPlanificaciones() {
  return variables.listaPlanificaciones.length;
}

//Variables Globales

export let variables = {
  listaPlanificaciones: [],
  boolEditandoBloque: false,
  bloqueSiendoEditado: null,
  seEditoAlMenosUnBloqueSemanal: false,
  largoListaPlanificaciones: function () {
    return this.listaPlanificaciones.length;
  },
  laListaDeCursos: new ListaCursos(),
  startDateInput: document.getElementById("start-date"),
};

// Llamar a la función al cargar la página para mostrar el mensaje inicial
//document.addEventListener("DOMContentLoaded", showSection('misPlanificaciones1'));

//Comienzo Funciones de Mostrar / Visualizacion
import {
  closeConfig,
  mostrarBarra,
  mostrarDivPlanificacion,
  mostrarVolverAlert,
  noMostrarBarra,
  openConfig,
  showDiv,
  showSection,
  toggleCategories,
} from "./Funciones/mostrarVisualizacion.js";

// Cominenzo de Funciones de Calendario

import { cambiarCalendario } from "./Funciones/calendario.js";

//Funciones de Planificacion

import {
  cambiarDiariaYCrearPlanificacion,
  cambiarUltimoCurso,
  confirmarP1,
  startPlanificacion,
  verificacionCreacionDeBloque,
  verificacionDeBloques,
  verificacionDePlanificaciones,
} from "./Funciones/planificacion.js";

//Funciones de Creeacion de Bloques y Planificaciones

import {
  modificarPlanificacion,
  savePlan,
  savePlanSemanal,
} from "./Funciones/creacionBloquesPlanificaciones.js";

//Funciones de Configuracion de Cursos

import {
  agregarCurso,
  eliminarCurso,
  modificarCurso,
} from "./Funciones/configuracionCursos.js";

//Vista de Planificaciones ( Pagina Principal )

import {
  cerrarModal,
  editarBloque,
  guardarCambios,
  mostrarDetalles,
  mostrarPlanificaciones,
} from "./Funciones/vistaPlanificaciones.js";

//Busqueda de Planificaciones

import { buscarPlanificaciones } from "./Funciones/busquedaDePlanificaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  showSection("misPlanificaciones1");
});
//exportar a index.html
export {
  agregarCurso,
  buscarPlanificaciones,
  cambiarCalendario,
  cambiarDiariaYCrearPlanificacion,
  cambiarUltimoCurso,
  cerrarModal,
  closeConfig,
  confirmarP1,
  editarBloque,
  eliminarCurso,
  guardarCambios,
  modificarCurso,
  modificarPlanificacion,
  mostrarBarra,
  mostrarDetalles,
  mostrarDivPlanificacion,
  mostrarPlanificaciones,
  mostrarVolverAlert,
  noMostrarBarra,
  openConfig,
  savePlan,
  savePlanSemanal,
  showDiv,
  showSection,
  startPlanificacion,
  toggleCategories,
  verificacionCreacionDeBloque,
  verificacionDeBloques,
  verificacionDePlanificaciones
};
