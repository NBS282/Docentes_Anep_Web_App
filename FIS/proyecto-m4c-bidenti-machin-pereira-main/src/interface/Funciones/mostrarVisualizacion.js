import { variables } from "../main.js";
import { cargarDatosBloque } from "./creacionBloquesPlanificaciones.js";

// Funciones de Mostrar / Visualización
export function showSection(sectionId) {
  // Oculta todas las secciones
  resetAllInputs();

  document
    .querySelectorAll(".contenido")
    .forEach((section) => (section.style.display = "none"));
  document
    .querySelectorAll(".content-section")
    .forEach((section) => (section.style.display = "none"));
  // Muestra solo la sección seleccionada
  document.getElementById(sectionId).style.display = "block";
}

export function resetAllInputs() {
  // Obtener todos los select
  let selects = document.querySelectorAll("select");

  // Iterar sobre cada select y resetearlo
  selects.forEach(function (select) {
    if (select.id != "searchTipo") {
      select.value = 0; // Deshabilita el select = 0; // Resetea al primer elemento (index 0)
    }
  });

  //resetear los inputs
  let inputs = document.querySelectorAll("input");
  inputs.forEach(function (input) {
    if (
      input.id != "claendar" &&
      input.id != "end-date" &&
      input.id != "start-date" &&
      input.id != "searchTitulo" &&
      input.id != "searchFecha"
    ) {
      input.value = "";
    }
  });

  //resetear los textareas
  let textareas = document.querySelectorAll("textarea");
  textareas.forEach(function (textarea) {
    if (
      textarea.id != "SemanalTec" &&
      textarea.id != "SemanalDevPerYConCor" &&
      textarea.id != "SemanalCreativoArtistico" &&
      textarea.id != "SemanalSyH" &&
      textarea.id != "SemanalComunicacion" &&
      textarea.id != "SemanalCientifico"
    ) {
      textarea.value = "";
    }
  });
}

export function openConfig() {
  document.getElementById("Config").style.width = "300px";
  document.getElementById("overlay").style.display = "block";
}

export function closeConfig() {
  document.getElementById("Config").style.width = "0";
  document.getElementById("overlay").style.display = "none";
}

export function noMostrarBarra() {
  $("#barraOpciones").slideUp("slow");
}

export function mostrarBarra() {
  $("#barraOpciones").slideDown("slow");
}

export function mostrarVolverAlert() {
  const alerta = document.getElementById("alertaDecidir");
  const confirmarBtn = document.getElementById("confirmarBtn");
  const cancelarBtn = document.getElementById("cancelarBtn");

  // Mostrar el cartel
  alerta.classList.remove("d-none");

  // Lógica para el botón "Continuar"
  confirmarBtn.onclick = function () {
    alerta.classList.add("d-none");
    // Navegar al div anterior (step3)
    showDiv("step3");
  };

  // Lógica para el botón "Cancelar"
  cancelarBtn.onclick = function () {
    alerta.classList.add("d-none");
  };
}

export function showDiv(divId) {
  // Oculta todas las secciones

  resetAllInputs();

  document
    .querySelectorAll(".content-section")
    .forEach((section) => (section.style.display = "none"));
  document
    .querySelectorAll(".contenido")
    .forEach((section) => (section.style.display = "none"));

  if (divId == "step4") {
    document.getElementById("espacio").selectedOptions.value = 0;
    if (
      variables.listaPlanificaciones[
        variables.largoListaPlanificaciones() - 1
      ].getEsDiaria() === "Diaria"
    ) {
      showDiv("step4Diaria");
    } else {
      showDiv("step4Semanal");
    }
    return;
  }

  if (divId == "step3") {
    variables.boolEditandoBloque = false;
    document.getElementById("crearBloque").style.display = "block";

    if (
      variables.listaPlanificaciones[
        variables.largoListaPlanificaciones() - 1
      ].getEsDiaria() === "Semanal"
    ) {
      document.getElementById("crearBloque").style.display = "none";
    }

    let cantBloques =
      variables.listaPlanificaciones[
        variables.largoListaPlanificaciones() - 1
      ].cantidadBloques();

    const listaBloques = document.getElementById("listaBloques");
    listaBloques.innerHTML = ""; // Limpiar la lista antes de agregar nuevos elementos

    // Iterar sobre los bloques y agregar el contenido formateado
    for (let i = 1; i <= cantBloques; i++) {
      let textoBloque = variables.listaPlanificaciones[
        variables.largoListaPlanificaciones() - 1
      ]
        .consultarBloque(i)
        .imprimirBloque();
      document.getElementById("guardar").textContent = "Crear Bloque";

      const elem = document.createElement("li");
      elem.classList.add("bloque-item"); // Añadir clase CSS para mejorar el formato

      // Usar un contenedor con formato si es necesario
      const textoContenido = document.createElement("span");
      textoContenido.textContent = textoBloque;

      // Añadir un formato visual adicional, por ejemplo, un número de bloque destacado
      const bloqueNumero = document.createElement("strong");
      bloqueNumero.textContent = `Bloque ${i} -> `;

      // Concatenar los elementos
      elem.appendChild(bloqueNumero);
      elem.appendChild(textoContenido);
      if (
        variables.listaPlanificaciones[
          variables.largoListaPlanificaciones() - 1
        ].getEsDiaria() === "Semanal"
      ) {
        elem.addEventListener("click", () => {
          document.getElementById("diaSemana").textContent =
            variables.listaPlanificaciones[
              variables.largoListaPlanificaciones() - 1
            ]
              .consultarBloque(i)
              .getTitulo();
          cargarDatosBloque(i);
          showDiv("step4Semanal");
          document.getElementById("guardar").textContent = "Guardar Cambios";
        });
      } else {
        elem.addEventListener("click", () => {
          cargarDatosBloque(i);
          showDiv("step4Diaria");
          document.getElementById("guardar").textContent = "Guardar Cambios";
        });
      }
      listaBloques.appendChild(elem);
    }
  }

  // Muestra solo la sección seleccionada
  document.getElementById(divId).style.display = "block";
}

// Muestra las categorías correspondientes basadas en la selección múltiple
export function toggleCategories() {
  event.preventDefault();
  // Obtiene el valor del select
  const selectEspacio = document.getElementById("espacio");
  const espacioSeleccionado = selectEspacio.value;

  // Oculta todos los divs de categorías
  document.querySelectorAll(".categories").forEach((div) => {
    div.style.display = "none";
  });

  // Muestra el div correspondiente al espacio seleccionado, si existe
  if (espacioSeleccionado !== "0") {
    const divSeleccionado = document.getElementById(espacioSeleccionado);
    if (divSeleccionado) {
      divSeleccionado.style.display = "block";
    }
  }
}

// Función para cargar las selecciones y cambiar el fondo de los seleccionados
export function loadSelection() {
  const espaciosSeleccionados = Array.from(
    document.getElementById("espacio").selectedOptions,
  ).map((option) => option.text);

  // Obtener unidades seleccionadas por espacio
  const categories = document.querySelectorAll(".categories");
  categories.forEach((category) => {
    if (category.style.display === "block") {
      const selectedOptions = Array.from(
        category.querySelectorAll("select option:checked"),
      );

      selectedOptions.forEach((option) => {
        // Cambiar el fondo del elemento seleccionado
        option.classList.add("selected");
      });
    }
  });
}

export function mostrarDivPlanificacion() {
  const estrPlanificacion = document.getElementById(
    "select_estructuraPlanificacion",
  ).value;
  if (estrPlanificacion == "1") {
    document.getElementById("textoPlanificacion").style.display = "block";
    document.getElementById("estructuradaPlanificacion").style.display = "none";
  } else {
    document.getElementById("estructuradaPlanificacion").style.display =
      "block";
    document.getElementById("textoPlanificacion").style.display = "none";
  }
}
