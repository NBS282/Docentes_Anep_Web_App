import { variables } from "../main.js";

export function actualizarVistaPlanificaciones() {
  const noPlanificaciones = document.getElementById("noPlanificaciones");
  const planificacionesContainer = document.getElementById(
    "planificacionesContainer",
  );

  //document.getElementById("busquedas").style.display = "none";

  // Si hay planificaciones en el contenedor, muestra el contenedor y oculta el mensaje de advertencia
  if (largoListaPlanificaciones() > 0) {
    document.getElementById("busquedas").style.display = "block";
    noPlanificaciones.style.display = "none";
    planificacionesContainer.style.display = "flex";
  } else {
    // Si no hay planificaciones, muestra el mensaje de advertencia
    document.getElementById("busquedas").style.display = "none";
    noPlanificaciones.style.display = "block";
    planificacionesContainer.style.display = "none";
  }
}

export function mostrarPlanificaciones() {
  const container = document.getElementById("planificacionesContainer");
  const noPlanificaciones = document.getElementById("noPlanificaciones");

  container.innerHTML = "";

  if (variables.listaPlanificaciones.length === 0) {
    container.style.display = "none";
    noPlanificaciones.style.display = "block";
  } else {
    container.style.display = "block";
    noPlanificaciones.style.display = "none";

    let numPlanificacion = 0;
    variables.listaPlanificaciones.forEach((planificacion) => {
      if (planificacion.cantidadBloques() > 0) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col-12", "col-sm-6", "col-md-4", "mb-4"); // Responsive, con márgenes

        let textoFecha = planificacion.getFecha() || "dd/mm/yyyy"; // Fecha de la planificación
        let partesFecha;
        let fecha;
        if (planificacion.getEsDiaria() !== "Semanal") {
          partesFecha = textoFecha.split("-");

          // Crear un objeto Date a partir de la fecha en formato YYYY-MM-DD
          fecha = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);
          textoFecha = formatearFechaDDMMYYYY(fecha);
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
        // Para planificaciones diarias: mostrar solo la fecha de inicio formateada

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
        numPlanificacion++;
        container.appendChild(cardDiv);
      }
    });
  }
}

// Función para formatear fecha en DD/MM/YYYY
export function formatearFechaDDMMYYYY(fecha) {
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

export function cerrarModal() {
  document.getElementById("planificacionModal").style.display = "none";
}

export function mostrarDetalles(tipo, donde, nroPlanificacion) {
  let planificacion = variables.listaPlanificaciones[nroPlanificacion];
  let lista = document.getElementById("listaBloquesVisualizador");
  // Limpiar la lista antes de agregar nuevos elementos
  lista.innerHTML = "";

  // Iterar sobre los bloques de la planificación
  for (let i = 1; i <= planificacion.cantidadBloques(); i++) {
    let bloque = planificacion.consultarBloque(i);
    let li = document.createElement("li");
    li.textContent = bloque.getTitulo(); // Agregar el título del bloque
    // Agregar el evento de clic al bloque
    li.onclick = () =>
      seleccionarBloque(li, bloque, planificacion, nroPlanificacion);

    // Agregar el bloque a la lista
    lista.appendChild(li);
  }

  // Mostrar los detalles de la planificación
  document.getElementById("BloqueContent").style.display = "block";
  document.getElementById("planificacionModal").style.display = "block";
  document.getElementById("accionesBloque").style.display = "none"; // Ocultar las acciones inicialmente
}

// Función para manejar la selección de un bloque
export function seleccionarBloque(li, bloque, planificacion, nroPlanificacion) {
  // Cambiar el color de fondo del bloque seleccionado
  const lista = document.getElementById("listaBloquesVisualizador");
  const items = lista.getElementsByTagName("li");

  // Resetear el color de todos los elementos
  for (let item of items) {
    item.style.backgroundColor = ""; // Resetear color de fondo
  }

  // Establecer un color para el bloque seleccionado
  li.style.backgroundColor = "#e0e0e0"; // Puedes cambiar el color aquí

  // Mostrar las acciones para el bloque seleccionado
  document.getElementById("accionesBloque").style.display = "block";

  // Establecer los eventos para los botones según el bloque seleccionado
  const verBloqueBtn = document.getElementById("verBloqueBtn");
  const editarBloqueBtn = document.getElementById("editarBloqueBtn");
  const eliminarBloqueBtn = document.getElementById("eliminarBloqueBtn");

  // Establecer las funciones para los botones
  verBloqueBtn.onclick = () =>
    verBloque(bloque, false, planificacion.getEsDiaria() === "Semanal");
  editarBloqueBtn.onclick = () => editarBloque(bloque, planificacion);
  eliminarBloqueBtn.onclick = () =>
    eliminarBloque(bloque, planificacion, nroPlanificacion);
}

function verBloque(bloque, editar, semanal) {
  // Ocultar secciones generales
  document.getElementById("misPlanificaciones1").style.display = "none";

  if (!semanal && bloque.esEstructurado()) {
    verBloqueEstructurado(bloque, editar);
  }
  if (!semanal && !bloque.esEstructurado()) {
    verBloqueLibre(bloque, editar);
  }
  if (semanal) {
    verBloqueSemanal(bloque, editar);
  }
}

function verBloqueLibre(bloque, editar) {
  document.getElementById("guardarLibre").style.display = "none";

  // Texto a mostrar en los labels
  let espacio = "Espacio Curricular: ";
  let titulo = "Título: ";
  let unidad = "Unidad Curricular: ";

  let colorTexto = "#007bff"; // Color azul

  // Mostrar el bloque libre y ocultar el estructurado
  document.getElementById("bloqueLibre").style.display = "block";
  document.getElementById("bloqueEstructurado").style.display = "none";

  // Seleccionar los elementos de los labels específicos
  let espacioLabel = document.getElementById("espacioCurrL");
  let tituloLabel = document.getElementById("tituloL");
  let unidadLabel = document.getElementById("unidadCurrL");

  // Cambiar el texto y el color de los labels
  espacioLabel.textContent = espacio + bloque.getEspacio();
  tituloLabel.textContent = titulo + bloque.getTitulo();
  unidadLabel.textContent = unidad + bloque.getUnidad();

  espacioLabel.style.color = colorTexto;
  tituloLabel.style.color = colorTexto;
  unidadLabel.style.color = colorTexto;

  // Llenar el cuerpo de planificación
  document.getElementById("TxtPlanificacionL").value = bloque.getCuerpo();
  if (editar) {
    document.getElementById("guardarLibre").style.display = "block";
    document.getElementById("TxtPlanificacionL").readOnly = false;
  } else {
    document.getElementById("TxtPlanificacionL").readOnly = true;
  }
}

function verBloqueEstructurado(bloque, editar) {
  document.getElementById("guardarEstructurado").style.display = "none";

  // Definir el color para los labels específicos
  let colorTexto = "#007bff"; // Color azul

  // Seleccionar los elementos de los labels específicos
  let espacioLabel = document.getElementById("espacioCurrE");
  let tituloLabel = document.getElementById("tituloE");
  let unidadLabel = document.getElementById("unidadCurrE");

  // Cambiar solo el color del texto de estos labels
  espacioLabel.style.color = colorTexto;
  tituloLabel.style.color = colorTexto;
  unidadLabel.style.color = colorTexto;

  // Texto a mostrar en los labels
  let espacio = "Espacio Curricular: ";
  let titulo = "Título: ";
  let unidad = "Unidad Curricular: ";

  // Mostrar el bloque estructurado y ocultar el libre
  document.getElementById("bloqueEstructurado").style.display = "block";
  document.getElementById("bloqueLibre").style.display = "none";

  // Llenar los campos del bloque estructurado con la información del bloque
  espacioLabel.textContent = espacio + bloque.getEspacio();
  tituloLabel.textContent = titulo + bloque.getTitulo();
  unidadLabel.textContent = unidad + bloque.getUnidad();

  document.getElementById("txtCompGeneralesE").value =
    bloque.getCompetenciasGenerales();
  document.getElementById("txtCompEspecificasE").value =
    bloque.getCompetenciasEspecificas();
  document.getElementById("txtContenidoE").value = bloque.getContenido();
  document.getElementById("txtCriteriosLogroE").value =
    bloque.getCriteriosLogro();
  document.getElementById("txtMetaAprendizajeE").value =
    bloque.getMetaAprendizaje();
  document.getElementById("txtPlanAprendizajeE").value =
    bloque.getPlanAprendizaje();
  document.getElementById("txtFundamentacionDisciplinarE").value =
    bloque.getFundamentacionDisciplinar();
  document.getElementById("txtFundamentacionDidacticaE").value =
    bloque.getFundamentacionDidactica();
  document.getElementById("txtObservacionesE").value =
    bloque.getObservaciones();

  if (editar) {
    document.getElementById("guardarEstructurado").style.display = "block";
    document.getElementById("txtCompGeneralesE").readOnly = false;
    document.getElementById("txtCompEspecificasE").readOnly = false;
    document.getElementById("txtContenidoE").readOnly = false;
    document.getElementById("txtCriteriosLogroE").readOnly = false;
    document.getElementById("txtMetaAprendizajeE").readOnly = false;
    document.getElementById("txtPlanAprendizajeE").readOnly = false;
    document.getElementById("txtFundamentacionDisciplinarE").readOnly = false;
    document.getElementById("txtFundamentacionDidacticaE").readOnly = false;
    document.getElementById("txtObservacionesE").readOnly = false;
  } else {
    document.getElementById("txtCompGeneralesE").readOnly = true;
    document.getElementById("txtCompEspecificasE").readOnly = true;
    document.getElementById("txtContenidoE").readOnly = true;
    document.getElementById("txtCriteriosLogroE").readOnly = true;
    document.getElementById("txtMetaAprendizajeE").readOnly = true;
    document.getElementById("txtPlanAprendizajeE").readOnly = true;
    document.getElementById("txtFundamentacionDisciplinarE").readOnly = true;
    document.getElementById("txtFundamentacionDidacticaE").readOnly = true;
    document.getElementById("txtObservacionesE").readOnly = true;
  }
}

function verBloqueSemanal(bloque, editar) {
  document.getElementById("guardarSemanal").style.display = "none";

  document.getElementById("bloqueSemanal").style.display = "block";
  document.getElementById("bloqueEstructurado").style.display = "none";
  document.getElementById("bloqueLibre").style.display = "none";

  document.getElementById("txtCietificoMat").value =
    bloque.getCuerpoCientifico();
  document.getElementById("txtComunicacion").value =
    bloque.getCuerpoComunicacion();
  document.getElementById("txtSyH").value = bloque.getCuerpoSyH();
  document.getElementById("txtCreativoArt").value =
    bloque.getCuerpoCreativoArtistico();
  document.getElementById("txtDevPerYConCor").value =
    bloque.getCuerpoDevPerYConCor();
  document.getElementById("txtTec").value = bloque.getCuerpoTec();

  if (editar) {
    document.getElementById("guardarSemanal").style.display = "block";
    document.getElementById("txtCietificoMat").readOnly = false;
    document.getElementById("txtComunicacion").readOnly = false;
    document.getElementById("txtSyH").readOnly = false;
    document.getElementById("txtCreativoArt").readOnly = false;
    document.getElementById("txtDevPerYConCor").readOnly = false;
    document.getElementById("txtTec").readOnly = false;
  } else {
    document.getElementById("txtCietificoMat").readOnly = true;
    document.getElementById("txtComunicacion").readOnly = true;
    document.getElementById("txtSyH").readOnly = true;
    document.getElementById("txtCreativoArt").readOnly = true;
    document.getElementById("txtDevPerYConCor").readOnly = true;
    document.getElementById("txtTec").readOnly = true;
  }
}

let planificacionEditada = null;
let bloqueEditado = null;

// Función para editar un bloque (puedes personalizar esta lógica)
export function editarBloque(bloque, planificacion) {
  planificacionEditada = planificacion;
  bloqueEditado = bloque;
  verBloque(bloque, true, planificacionEditada.getEsDiaria() === "Semanal"); // Mostrar el bloque seleccionado
}

export function guardarCambios() {
  let mensajeEstructurado = document.getElementById(
    "infoDeModificadoEsturcturada",
  );
  let mensajeLibre = document.getElementById("infoDeModificadoLibre");
  let mensajeSemanal = document.getElementById("infoDeModificadoSemanal");

  let semanal = planificacionEditada.getEsDiaria() === "Semanal";
  let txt = "";

  // Realizar la operación de guardar cambios
  for (let i = 1; i <= planificacionEditada.cantidadBloques(); i++) {
    if (planificacionEditada.consultarBloque(i) === bloqueEditado) {
      if (!semanal) {
        if (bloqueEditado.esEstructurado()) {
          bloqueEditado.setCompetenciasGenerales(
            document.getElementById("txtCompGeneralesE").value,
          );
          bloqueEditado.setCompetenciasEspecificas(
            document.getElementById("txtCompEspecificasE").value,
          );
          bloqueEditado.setContenido(
            document.getElementById("txtContenidoE").value,
          );
          bloqueEditado.setCriteriosLogro(
            document.getElementById("txtCriteriosLogroE").value,
          );
          bloqueEditado.setMetaAprendizaje(
            document.getElementById("txtMetaAprendizajeE").value,
          );
          bloqueEditado.setPlanAprendizaje(
            document.getElementById("txtPlanAprendizajeE").value,
          );
          bloqueEditado.setFundamentacionDisciplinar(
            document.getElementById("txtFundamentacionDisciplinarE").value,
          );
          bloqueEditado.setFundamentacionDidactica(
            document.getElementById("txtFundamentacionDidacticaE").value,
          );
          bloqueEditado.setObservaciones(
            document.getElementById("txtObservacionesE").value,
          );

          // Mensaje de éxito para la planificación estructurada
          txt = "Cambios guardados exitosamente";
          mensajeEstructurado.classList.replace(
            "alert-danger",
            "alert-success",
          );
          mensajeEstructurado.style.backgroundColor = "#28a745";
        } else {
          bloqueEditado.setCuerpo(
            document.getElementById("TxtPlanificacionL").value,
          );

          // Mensaje de éxito para la planificación libre
          txt = "Cambios guardados exitosamente ";
          mensajeLibre.classList.replace("alert-danger", "alert-success");
          mensajeLibre.style.backgroundColor = "#28a745";
        }
      } else {
        bloqueEditado.setCuerpoCientifico(
          document.getElementById("txtCietificoMat").value,
        );
        bloqueEditado.setCuerpoComunicacion(
          document.getElementById("txtComunicacion").value,
        );
        bloqueEditado.setCuerpoSyH(document.getElementById("txtSyH").value);
        bloqueEditado.setCuerpoCreativoArtistico(
          document.getElementById("txtCreativoArt").value,
        );
        bloqueEditado.setCuerpoDevPerYConCor(
          document.getElementById("txtDevPerYConCor").value,
        );
        bloqueEditado.setCuerpoTec(document.getElementById("txtTec").value);

        // Mensaje de éxito para la planificación semanal
        txt = "Cambios guardados exitosamente";
        mensajeSemanal.classList.replace("alert-danger", "alert-success");
        mensajeSemanal.style.backgroundColor = "#28a745";
      }
    }
  }

  // Mostrar mensaje dinámico para la planificación estructurada
  mensajeEstructurado.innerHTML = txt;
  mensajeLibre.innerHTML = txt;
  mensajeSemanal.innerHTML = txt;

  // Hacer visibles los mensajes
  mensajeEstructurado.classList.remove("d-none");
  mensajeLibre.classList.remove("d-none");
  mensajeSemanal.classList.remove("d-none");

  // Ocultar los mensajes después de 5 segundos
  setTimeout(() => {
    mensajeEstructurado.classList.add("d-none");
    mensajeLibre.classList.add("d-none");
    mensajeSemanal.classList.add("d-none");
  }, 1000);
}

// Función para eliminar un bloque (puedes personalizar esta lógica)
function eliminarBloque(bloque, planificacionEliminada, nroPlanificacion) {
  planificacionEliminada.eliminarBloque(bloque);
  if (planificacionEliminada.cantidadBloques() === 0) {
    cerrarModal();
    variables.listaPlanificaciones.splice(nroPlanificacion, 1);
    mostrarPlanificaciones();
  } else {
    mostrarDetalles(
      planificacionEliminada.getEsDiaria(),
      "misPlanificaciones1",
      nroPlanificacion,
    );
  }
  actualizarVistaPlanificaciones();
}
