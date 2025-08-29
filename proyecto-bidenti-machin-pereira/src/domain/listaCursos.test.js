import Curso from "./curso.js"; // Asegúrate de que este archivo esté correctamente implementado
import ListaCursos from "./listaCursos.js";

describe("Clase ListaCursos", () => {
  let lista;
  let curso1, curso2, curso3, cursoDuplicado;

  beforeEach(() => {
    lista = new ListaCursos();
    curso1 = new Curso(1, "colegio1");
    curso2 = new Curso(2, "colegio2");
    curso3 = new Curso(3, "colegio3");
    cursoDuplicado = new Curso(1, "colegio1"); // Curso con los mismos datos que curso1
  });

  // Test: agregar cursos y consultarlos
  test("agregar cursos y consultarlos", () => {
    lista.agregarCurso(curso1);
    lista.agregarCurso(curso2);
    lista.agregarCurso(curso3);

    expect(lista.cantidadCursos()).toBe(3);
    expect(lista.consultarCurso(1)).toBe(curso1);
    expect(lista.consultarCurso(2)).toBe(curso2);
    expect(lista.consultarCurso(3)).toBe(curso3);
  });

  // Test: eliminar un curso de la lista
  test("eliminar un curso de la lista", () => {
    lista.agregarCurso(curso1);
    lista.agregarCurso(curso2);
    lista.agregarCurso(curso3);

    lista.eliminarCurso(curso2);

    expect(lista.cantidadCursos()).toBe(2);
    expect(lista.consultarCurso(1)).toBe(curso1);
    expect(lista.consultarCurso(2)).toBe(curso3);
  });

  // Test: eliminar cursos duplicados
  test("eliminar un curso duplicado", () => {
    lista.agregarCurso(curso1);
    lista.agregarCurso(cursoDuplicado); // Curso idéntico a curso1

    lista.eliminarCurso(curso1);

    expect(lista.cantidadCursos()).toBe(1);
    expect(lista.consultarCurso(1)).toBe(cursoDuplicado); // El duplicado no debería eliminarse
  });

  // Test: eliminar un curso que no está en la lista
  test("intentar eliminar un curso que no existe", () => {
    lista.agregarCurso(curso1);
    lista.eliminarCurso(curso2); // curso2 no está en la lista

    expect(lista.cantidadCursos()).toBe(1);
    expect(lista.consultarCurso(1)).toBe(curso1);
  });

  // Test: modificar un curso existente
  test("modificar un curso existente", () => {
    lista.agregarCurso(curso1);

    lista.modificarCurso(curso1, "colegioNuevo", 5);

    expect(lista.consultarCurso(1).getAno()).toBe(5);
    expect(lista.consultarCurso(1).getColegio()).toBe("colegioNuevo");
  });

  // Test: intentar modificar un curso que no existe
  test("intentar modificar un curso que no existe", () => {
    lista.modificarCurso(curso2, "colegioInexistente", 4);

    expect(lista.cantidadCursos()).toBe(0); // Ningún curso fue modificado
  });

  // Test: cantidad de cursos en la lista
  test("cantidad de cursos en la lista", () => {
    expect(lista.cantidadCursos()).toBe(0);

    lista.agregarCurso(curso1);
    expect(lista.cantidadCursos()).toBe(1);

    lista.agregarCurso(curso2);
    expect(lista.cantidadCursos()).toBe(2);
  });

  // Test: establecer una nueva lista completa
  test("establecer una nueva lista completa", () => {
    const nuevaLista = [curso1, curso2, curso3];
    lista.setLista(nuevaLista);

    expect(lista.getLista()).toEqual(nuevaLista);
    expect(lista.cantidadCursos()).toBe(3);
  });

  // Test: establecer una lista vacía
  test("establecer una lista vacía", () => {
    lista.setLista([]);
    expect(lista.cantidadCursos()).toBe(0);
  });

  // Test: consultar un curso fuera de rango
  test("consultar un curso fuera de rango debería devolver undefined", () => {
    lista.agregarCurso(curso1);

    expect(lista.consultarCurso(0)).toBeUndefined(); // Índice inválido
    expect(lista.consultarCurso(2)).toBeUndefined(); // Solo hay un curso
  });

  // Test: comportamiento con valores no esperados
  test("manejo de valores inesperados en la lista", () => {
    const valoresInvalidos = [null, undefined, 123, "curso", {}, []];
    lista.setLista(valoresInvalidos);

    expect(lista.cantidadCursos()).toBe(valoresInvalidos.length);
    expect(lista.consultarCurso(1)).toBeNull(); // Verifica que el primer valor se mantenga como está
    expect(lista.consultarCurso(2)).toBeUndefined();
  });

  // Test: verificar toString
  test("verificar el comportamiento del método toString", () => {
    expect(lista.toString()).toBe("test");
  });

  // Test: lista con gran cantidad de cursos
  test("manejar una lista con muchos cursos", () => {
    const cantidadCursos = 1000;
    const cursos = Array.from(
      { length: cantidadCursos },
      (_, i) => new Curso(i + 1, `colegio${i + 1}`),
    );
    lista.setLista(cursos);

    expect(lista.cantidadCursos()).toBe(cantidadCursos);
    expect(lista.consultarCurso(cantidadCursos)).toBe(
      cursos[cantidadCursos - 1],
    );
  });

  test("verificar que la lista no se comparta entre instancias", () => {
    const lista2 = new ListaCursos();
    lista.agregarCurso(curso1);
    lista2.agregarCurso(curso2);

    expect(lista.cantidadCursos()).toBe(1);
    expect(lista2.cantidadCursos()).toBe(1);
  });

  test("modificar un curso ya existente", () => {
    lista.agregarCurso(curso1);
    lista.agregarCurso(curso2);

    lista.modificarCurso(curso1, "colegioNuevo", 5);

    expect(lista.consultarCurso(1).getAno()).toBe(5);
    expect(lista.consultarCurso(1).getColegio()).toBe("colegioNuevo");
  });

  test("modificar un curso que no existe", () => {
    lista.agregarCurso(curso1);

    lista.modificarCurso(curso2, "colegioInexistente", 4);

    expect(lista.cantidadCursos()).toBe(1);
    expect(lista.consultarCurso(1)).toBe(curso1);
  });

  test("probando el toString", () => {
    expect(lista.toString()).toBe("test");
  });
});
