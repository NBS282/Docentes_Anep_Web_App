import { variables } from "../main.js";
import { formatearFechaDDMMYYYY } from "./vistaPlanificaciones.js";

export function buscarPlanificaciones() {
  const titulo = document.getElementById("searchTitulo").value.toLowerCase();
  const tipo = document.getElementById("searchTipo").value;
  const fechaInput = document.getElementById("searchFecha").value;

  if (variables.largoListaPlanificaciones() === 0) {
    return;
  }

  // Filtrar las planificaciones por los criterios seleccionados
  const resultados = variables.listaPlanificaciones.filter((planificacion) => {
    // Filtrar por tipo de planificación
    const coincideTipo = tipo === "0" || planificacion.getEsDiaria() === tipo;

    // Filtrar por fecha, pero solo en el caso de las planificaciones semanales
    const coincideFecha =
      fechaInput === "" || verificarFecha(planificacion, fechaInput);

    // Filtrar por título en los bloques
    const bloquesCoinciden = recorrerBloques(
      planificacion,
      titulo,
      tipo,
      fechaInput,
    );

    const fechaValida = planificacion.getFecha() !== undefined;

    // Incluir planificaciones que coincidan con los filtros
    return fechaValida && coincideTipo && coincideFecha && bloquesCoinciden;
  });

  // Llamar a la función para mostrar las planificaciones filtradas
  mostrarPlanificacionesFiltradas(resultados);
}

// Función para verificar si una fecha está dentro de la semana para planificaciones semanales
function verificarFecha(planificacion, fechaInput) {
  if (planificacion.getEsDiaria() === "Diaria") {
    // Si es diaria, se compara la fecha exacta
    return planificacion.getFecha() === fechaInput;
  }

  if (planificacion.getEsDiaria() === "Semanal") {
    return verificarFechaSemanal(planificacion, fechaInput);
  }
}

// Función para verificar la fecha en una planificación semanal
function verificarFechaSemanal(planificacion, fechaInput) {
  // Convertir fechaInput al formato DD/MM/YYYY
  let partesFecha = fechaInput.split("-");

  // Crear un objeto Date a partir de la fecha en formato YYYY-MM-DD
  const fecha = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);

  // Normalizamos la fecha a medianoche (00:00:00)
  const fechaBuscada = normalizarFecha(fecha);

  // Fecha de la planificación (domingo de la semana)
  const textoFechaPlanificacion = planificacion.getFecha(); // En formato DD/MM/YYYY
  const rangoSemana = calcularInicioYFinSemana(textoFechaPlanificacion);

  // Convertir rango a Date para comparar, normalizando también las fechas
  const inicioSemana = normalizarFecha(
    convertirFechaADate(rangoSemana.inicioSemana),
  );
  const finSemana = normalizarFecha(convertirFechaADate(rangoSemana.finSemana));

  // Verificar si la fecha buscada está dentro del rango [inicioSemana, finSemana]
  return fechaBuscada >= inicioSemana && fechaBuscada <= finSemana;
}

function conseguirNumPlanificacion(planificacion){
  for(let i = 0; i<variables.listaPlanificaciones.length; i++){
    if(variables.listaPlanificaciones[i] === planificacion){
      return i;
    }
  }

  return -1;
}

// Función para normalizar la fecha (eliminar la hora y establecerla a medianoche)
function normalizarFecha(fecha) {
  // Establecemos la hora a medianoche para que solo compare las fechas
  fecha.setHours(0, 0, 0, 0);
  return fecha;
}

// Función auxiliar para calcular inicio y fin de semana (para planificaciones semanales)
function calcularInicioYFinSemana(fecha) {
  const partesFecha = fecha.split("/"); // Suponiendo formato DD/MM/YYYY
  const fechaBase = new Date(
    partesFecha[2],
    partesFecha[1] - 1,
    partesFecha[0],
  );

  // Día de la semana actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  const diaSemana = fechaBase.getDay();

  // Ajuste para asegurar que calculamos correctamente el domingo y el sábado
  // Si la fecha base es domingo (díaSemana = 0), la misma es el inicio de la semana
  const inicioSemana = new Date(fechaBase);
  inicioSemana.setDate(fechaBase.getDate() - diaSemana); // Domingo de la misma semana

  // Calculamos el sábado siguiente (día 6 de la semana)
  const finSemana = new Date(inicioSemana);
  finSemana.setDate(inicioSemana.getDate() + 6); // El sábado

  // Formatear fechas como DD/MM/YYYY
  const formatoFecha = (fecha) => {
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  return {
    inicioSemana: formatoFecha(inicioSemana),
    finSemana: formatoFecha(finSemana),
  };
}

// Función auxiliar para convertir una fecha en formato DD/MM/YYYY a un objeto Date
function convertirFechaADate(fechaTexto) {
  const partes = fechaTexto.split("/");
  return new Date(partes[2], partes[1] - 1, partes[0]);
}

// Función para recorrer los bloques de una planificación y verificar los filtros
function recorrerBloques(planificacion, titulo, tipo, fecha) {
  if (planificacion.getEsDiaria() === "Semanal") return true;

  let bloquesCoinciden = false;

  for (let i = 1; i <= planificacion.cantidadBloques(); i++) {
    const bloque = planificacion.consultarBloque(i); // Obtener el bloque en el índice i

    // Verificamos si el bloque cumple con los criterios de búsqueda
    const coincideTitulo = bloque.getTitulo().toLowerCase().includes(titulo);
    const coincideTipoBloque =
      tipo === "0" || planificacion.getEsDiaria() === tipo;
    const coincideFechaBloque =
      fecha === "" || planificacion.getFecha() === fecha;

    // Si el bloque cumple con todos los criterios, marcamos que los bloques coinciden
    if (coincideTitulo && coincideTipoBloque && coincideFechaBloque) {
      bloquesCoinciden = true;
      break; // Si encontramos al menos un bloque que coincide, podemos salir del bucle
    }
  }
  return bloquesCoinciden;
}

export function mostrarPlanificacionesFiltradas(planificacionesFiltradas) {
  const planificacionesContainer = document.getElementById(
    "planificacionesContainer",
  );
  const noPlanificacionesDiv = document.getElementById("noPlanificaciones");

  planificacionesContainer.innerHTML = ""; // Limpiar el contenedor

  if (planificacionesFiltradas.length === 0) {
    planificacionesContainer.style.display = "none"; // Ocultar contenedor de planificaciones
    noPlanificacionesDiv.innerHTML = `
        <div class="alert alert-info d-flex align-items-center justify-content-center" role="alert" style="border-radius: 10px; font-size: 1.3rem; padding: 14px; background-color: #d1ecf1; border: 1px solid #bee5eb;">
          <i class="bi bi-search" style="font-size: 0.5rem; margin-right: 5px;"></i>
          <span><strong>¡Vaya!</strong> No encontramos planificaciones que coincidan con tu búsqueda.</span>
        </div>
      `;
    noPlanificacionesDiv.style.display = "block"; // Mostrar mensaje de no encontrados
  } else {
    planificacionesContainer.style.display = "block"; // Mostrar contenedor de planificaciones
    noPlanificacionesDiv.style.display = "none"; // Ocultar el mensaje de no encontrados

    
    planificacionesFiltradas.forEach((planificacion) => {
      if (
        planificacion.cantidadBloques() > 0 &&
        planificacion.getFecha() !== undefined &&
        conseguirNumPlanificacion(planificacion) != -1
      ) {
        let numPlanificacion = conseguirNumPlanificacion(planificacion);
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col-12", "col-sm-6", "col-md-4", "mb-4"); // Responsive, con márgenes

        let textoFecha = planificacion.getFecha() || "dd/mm/yyyy"; // Fecha de la planificación
        let partesFecha;
        let fecha;

        if (planificacion.getEsDiaria() !== "Semanal") {
          // Si es diaria, procesamos la fecha en formato YYYY-MM-DD
          partesFecha = textoFecha.split("-");

          // Crear un objeto Date a partir de la fecha en formato YYYY-MM-DD
          fecha = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);
          textoFecha = formatearFechaDDMMYYYY(fecha); // Convertir a formato DD/MM/YYYY
        } else {
          // Para planificaciones semanales: calcular fecha final (sumar 6 días)
          partesFecha = textoFecha.split("/");

          // Crear un objeto Date a partir de la fecha en formato DD/MM/YYYY
          fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

          let fechaFin = new Date(fecha);
          fechaFin.setDate(fechaFin.getDate() + 6);

          // Formatear ambas fechas en formato DD/MM/YYYY
          let fechaInicio = formatearFechaDDMMYYYY(fecha);
          let fechaFinal = formatearFechaDDMMYYYY(fechaFin);

          // Mostrar el rango de fechas (inicio - fin)
          textoFecha = `${fechaInicio} - ${fechaFinal}`;
        }

        let textoCurso =
          planificacion.getCurso().toString() || "Grupo no especificado";
        let tipoPlanificacion =
          planificacion.getEsDiaria() || "Tipo no especificado";

        cardDiv.innerHTML = `
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <span class="card-title" style="font-size: 1.25rem;">${textoFecha}</span>
                <p class="card-text"><strong>Curso:</strong> ${textoCurso}</p>
                <p class="card-text"><strong>Tipo:</strong> ${tipoPlanificacion}</p>
                <button class="btn btn-primary w-100 mt-3" onclick="mostrarDetalles('${tipoPlanificacion.toLowerCase()}', 'misPlanificaciones1', ${numPlanificacion})">
                  Mostrar detalles
                </button>
              </div>
            </div>
          `;
        planificacionesContainer.appendChild(cardDiv);
      }
    });
  }
}
