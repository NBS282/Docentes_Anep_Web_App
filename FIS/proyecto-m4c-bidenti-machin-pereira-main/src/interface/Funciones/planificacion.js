import Planificacion from "../../domain/planificaciones.js";
import { variables } from "../main.js";

export function startPlanificacion() {
  // Oculta todas las secciones
  const allSections = document.querySelectorAll(".contenido");
  allSections.forEach((section) => {
    section.style.display = "none";
  });

  document
    .querySelectorAll(".content-section")
    .forEach((section) => (section.style.display = "none"));
  // Muestra la primera sección del proceso de creación de planificación
  document.getElementById("step1").style.display = "block";

  // Si estamos en el paso de selección de curso, restablece el menú desplegable
  document.getElementById("curso").selectedIndex = 0; // Reinicia el menú a la opción "Seleccione un curso"
}

let ultimoCurso;
export function cambiarUltimoCurso() {
  ultimoCurso = document.getElementById("curso").value;
}

export function cambiarDiariaYCrearPlanificacion(boolEs) {
  let laPlanificacion = new Planificacion(ultimoCurso, boolEs);
  variables.listaPlanificaciones.push(laPlanificacion);
}

//Boton de confirmar en la primera seccion

export function confirmarP1() {
  let ok = false;
  let mensajeFin = document.getElementById("infoDeConfP1");
  let txt = "";
  let curso = document.getElementById("curso").value;

  if (curso === "0") {
    txt = "Seleccione un curso";
    mensajeFin.style.backgroundColor = "#ec1616";
    mensajeFin.classList.replace("alert-success", "alert-danger");
  } else {
    txt = "Curso seleccionado";
    mensajeFin.style.backgroundColor = "#218838";
    mensajeFin.classList.replace("alert-danger", "alert-success");
    ok = true;
  }

  mensajeFin.innerHTML = txt;
  mensajeFin.classList.remove("d-none");
  setTimeout(() => {
    mensajeFin.classList.add("d-none");
    if (ok) {
      cambiarUltimoCurso();
      showSection("step2");
    }
  }, 1000);
}
//Verificaciones dentro de Planificaciones y Bloques
export function verificacionDePlanificaciones() {
  for (let i = 0; i < variables.listaPlanificaciones.length; i++) {
    let unaPlanificacion = variables.listaPlanificaciones[i];
    let textoFecha = unaPlanificacion.getFecha() || "yyyy-mm-dd";
    if (textoFecha == "yyyy-mm-dd") {
      variables.listaPlanificaciones.splice(i, 1);
      i = 0; //reseteo para evitar problemas por el indice borrado, termina cuando ya no hay planificaciones sin fecha
    }
  }
}

export function verificacionDeBloques() {
  let mensajeFin = document.getElementById("infoDeBloques");
  let calendarioDiaria = document.getElementById("claendar").value;
  let claendarioSemanal = document.getElementById("start-date").value;
  let txt = "";
  let ok = false;

  // Verificar que haya al menos un bloque y en caso de ser semanal fijarse que al menos un día no sea vacío
  if (
    variables.listaPlanificaciones[
      largoListaPlanificaciones() - 1
    ].getEsDiaria() === "Semanal"
  ) {
    if (!variables.seEditoAlMenosUnBloqueSemanal) {
      txt = "Edita al menos un bloque";
      mensajeFin.style.backgroundColor = "#ec1616";
      mensajeFin.classList.replace("alert-success", "alert-danger");
    } else if (claendarioSemanal === "") {
      txt = "Selecciona una fecha";
      mensajeFin.style.backgroundColor = "#ec1616";
      mensajeFin.classList.replace("alert-success", "alert-danger");
    } else {
      ok = true;
      txt = "Planificación creada exitosamente";
      mensajeFin.style.backgroundColor = "#218838";
      mensajeFin.classList.replace("alert-danger", "alert-success");
    }
    variables.seEditoAlMenosUnBloqueSemanal = false;
  } else {
    if (
      variables.listaPlanificaciones[
        largoListaPlanificaciones() - 1
      ].cantidadBloques() === 0
    ) {
      txt = "Agrega al menos un bloque";
      mensajeFin.style.backgroundColor = "#ec1616";
      mensajeFin.classList.replace("alert-success", "alert-danger");
    } else if (calendarioDiaria === "") {
      txt = "Selecciona una fecha";
      mensajeFin.style.backgroundColor = "#ec1616";
      mensajeFin.classList.replace("alert-success", "alert-danger");
    } else {
      txt = "Planificación creada exitosamente";
      mensajeFin.style.backgroundColor = "#218838";
      mensajeFin.classList.replace("alert-danger", "alert-success");
      ok = true;
    }
  }

  mensajeFin.innerHTML = txt;
  mensajeFin.classList.remove("d-none");

  // Ocultar el mensaje después de 5 segundos
  setTimeout(() => {
    mensajeFin.classList.add("d-none");
    if (ok) {
      modificarPlanificacion(largoListaPlanificaciones() - 1);
      mostrarPlanificaciones();
      showSection("misPlanificaciones1");
      mostrarBarra();
    }
  }, 1000);
}

export function verificacionCreacionDeBloque(semanal) {
  // Seleccionar todos los elementos con la clase "infoDeBloquesAlCrear"
  const mensajes = document.querySelectorAll(".infoDeBloquesAlCrear");
  let txt = "";
  let ok = false;

  let estructurada =
    document.getElementById("select_estructuraPlanificacion").value == "2";
  if (semanal) {
    if (
      document.getElementById("SemanalCientifico").value === "" &&
      document.getElementById("SemanalComunicacion").value === "" &&
      document.getElementById("SemanalSyH").value === "" &&
      document.getElementById("SemanalCreativoArtistico").value === "" &&
      document.getElementById("SemanalDevPerYConCor").value === "" &&
      document.getElementById("SemanalTec").value === ""
    ) {
      txt = "Completa al menos un campo";
      mensajes.forEach((mensaje) => {
        mensaje.classList.replace("alert-success", "alert-danger");
        mensaje.style.backgroundColor = "#ec1616";
      });
    } else {
      txt = "Bloque creado exitosamente";
      mensajes.forEach((mensaje) => {
        mensaje.classList.replace("alert-danger", "alert-success");
        mensaje.style.backgroundColor = "#218838";
      });
      ok = true;
    }
  } else {
    if (estructurada) {
      // Verificar que los campos de la planificación estructurada no estén vacíos
      if (
        document.getElementById("competenciasGenerales").value === "" ||
        document.getElementById("competenciasEspecificas").value === "" ||
        document.getElementById("contenido").value === "" ||
        document.getElementById("criteriosLogro").value === "" ||
        document.getElementById("metaAprendizaje").value === "" ||
        document.getElementById("planAprendizaje").value === "" ||
        document.getElementById("fundamentacionDisciplinar").value === "" ||
        document.getElementById("fundamentacionDidactica").value === "" ||
        document.getElementById("observaciones").value === "" ||
        document.getElementById("tituloEstructurada").value === "" ||
        document.getElementById("espacio").value === "0" ||
        document.getElementById(
          "unidad" + document.getElementById("espacio").value,
        ).value === "0" ||
        document.getElementById("select_estructuraPlanificacion").value === "0"
      ) {
        txt = "Completa todos los campos";
        mensajes.forEach((mensaje) => {
          mensaje.classList.replace("alert-success", "alert-danger");
          mensaje.style.backgroundColor = "#ec1616";
        });
      } else {
        txt = "Bloque creado exitosamente";
        mensajes.forEach((mensaje) => {
          mensaje.classList.replace("alert-danger", "alert-success");
          mensaje.style.backgroundColor = "#218838";
        });
        ok = true;
      }
    } else {
      // Verificar que los campos de la planificación libre no estén vacíos
      if (
        document.getElementById("planificacion").value === "" ||
        document.getElementById("tituloLibre").value === "" ||
        document.getElementById("espacio").value === "0" ||
        document.getElementById(
          "unidad" + document.getElementById("espacio").value,
        ).value === "0"
      ) {
        txt = "Completa todos los campos";
        mensajes.forEach((mensaje) => {
          mensaje.classList.replace("alert-success", "alert-danger");
          mensaje.style.backgroundColor = "#ec1616";
        });
      } else {
        txt = "Bloque creado exitosamente";
        mensajes.forEach((mensaje) => {
          mensaje.classList.replace("alert-danger", "alert-success");
          mensaje.style.backgroundColor = "#218838";
        });
        ok = true;
      }
    }
  }

  // Actualizar el contenido y mostrar los mensajes
  mensajes.forEach((mensaje) => {
    mensaje.textContent = txt;
    mensaje.classList.remove("d-none");
  });

  // Ocultar los mensajes después de un tiempo
  setTimeout(() => {
    mensajes.forEach((mensaje) => {
      mensaje.classList.add("d-none");
    });
    if (ok) {
      if (semanal) {
        savePlanSemanal();
      } else {
        savePlan();
      }
    }
  }, 1000);
}
