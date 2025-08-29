import Curso from "../../domain/curso.js";
import { variables } from "../main.js";

export function agregarCurso() {
  let ano = document.getElementById("anoCurso").value;
  let colegio = document.getElementById("nombreCurso").value;
  const mensaje = document.getElementById("infoDeAgregado");
  let txt = "";

  // Validar que el año esté entre 1 y 9
  if (ano >= 1 && ano <= 9) {
    // Crear y agregar el curso
    let nuevoCurso = new Curso(ano, colegio);
    variables.laListaDeCursos.agregarCurso(nuevoCurso);

    // Limpiar los campos de entrada
    document.getElementById("anoCurso").value = "";
    document.getElementById("nombreCurso").value = "";

    // Configurar mensaje de éxito
    txt = "Curso agregado exitosamente";
    mensaje.classList.replace("alert-danger", "alert-success");

    // Actualizar las listas
    actualizarListaDeCursos("curso");
    actualizarListaDeCursos("cursoEliminar");
    actualizarListaDeCursos("cursoModificar");
    mensaje.style.backgroundColor = "#218838";
  } else {
    // Configurar mensaje de error si el año es incorrecto
    txt = "Año incorrecto, debe ser un número entre 1 y 9";
    mensaje.classList.replace("alert-success", "alert-danger");
    mensaje.style.backgroundColor = "#ec1616";
  }

  // Mostrar mensaje dinámico
  mensaje.innerHTML = txt;
  mensaje.classList.remove("d-none");

  // Ocultar el mensaje después de 5 segundos
  setTimeout(() => {
    mensaje.classList.add("d-none");
  }, 5000);
}

export function actualizarListaDeCursos(idLista) {
  let itemListaCursos = document.getElementById(idLista);
  itemListaCursos.innerHTML = "";
  let itemInicial = document.createElement("option");
  itemInicial.textContent = "Seleccione un curso";
  itemInicial.setAttribute("selected", "");
  itemInicial.setAttribute("disabled", "");
  itemListaCursos.appendChild(itemInicial);

  for (let i = 1; i <= variables.laListaDeCursos.cantidadCursos(); i++) {
    const itemCurso = document.createElement("option");
    itemCurso.id = i;
    itemCurso.textContent = variables.laListaDeCursos
      .consultarCurso(i)
      .imprimirCurso();
    itemCurso.value = variables.laListaDeCursos.consultarCurso(i);
    itemListaCursos.appendChild(itemCurso);
  }
}

export function eliminarCurso() {
  const selectCurso = document.getElementById("cursoEliminar");
  const cursoSeleccionado =
    selectCurso.options[selectCurso.selectedIndex].value;
  variables.laListaDeCursos.eliminarCurso(cursoSeleccionado);

  actualizarListaDeCursos("curso");
  actualizarListaDeCursos("cursoEliminar");
  actualizarListaDeCursos("cursoModificar");

  const mensaje2 = document.getElementById("infoDeEliminado");
  mensaje2.classList.remove("d-none"); // Elimina la clase 'd-none' para mostrar el mensaje

  // Ocultar el mensaje después de 5 segundos
  setTimeout(() => {
    mensaje2.classList.add("d-none"); // Vuelve a agregar la clase 'd-none' para ocultar el mensaje
  }, 5000);
}

export function modificarCurso() {
  const selectCurso = document.getElementById("cursoModificar");
  const cursoSeleccionado =
    selectCurso.options[selectCurso.selectedIndex].value;
  const cursoNombre = document.getElementById("cursoModificarNombre").value;
  const cursoAno = document.getElementById("cursoModificarAno").value;
  const mensaje3 = document.getElementById("infoDeModificado");
  let txt = "";

  // Validación del año del curso
  if (cursoAno < 1 || cursoAno > 9) {
    txt = "Año incorrecto, debe ser un número entre 1 y 9";
    mensaje3.style.backgroundColor = "#ec1616";
    mensaje3.classList.replace("alert-success", "alert-danger");
  } else {
    txt = "Curso Modificado Exitosamente";
    mensaje3.style.backgroundColor = "#218838";
    mensaje3.classList.replace("alert-danger", "alert-success");

    // Modificar el curso en la lista
    variables.laListaDeCursos.modificarCurso(
      cursoSeleccionado,
      cursoNombre,
      cursoAno,
    );

    // Actualizar listas relacionadas
    actualizarListaDeCursos("curso");
    actualizarListaDeCursos("cursoEliminar");
    actualizarListaDeCursos("cursoModificar");

    // Limpiar los campos de entrada
    document.getElementById("cursoModificarNombre").value = "";
    document.getElementById("cursoModificarAno").value = "";
  }

  // Mostrar mensaje
  mensaje3.innerHTML = txt;
  mensaje3.classList.remove("d-none");

  // Ocultar el mensaje después de 5 segundos
  setTimeout(() => {
    mensaje3.classList.add("d-none");
  }, 5000);
}
