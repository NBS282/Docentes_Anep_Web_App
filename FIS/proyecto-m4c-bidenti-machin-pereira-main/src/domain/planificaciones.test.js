import Planificacion from "./planificaciones.js"; // Ajusta la ruta de importación según corresponda
import Curso from "./curso.js"; // Asegúrate de importar correctamente

describe("Clase Planificacion", () => {
  let planificacion;
  let curso;

  beforeEach(() => {
    curso = new Curso(1, "un colegio");
    planificacion = new Planificacion(curso, true);
  });

  test("debería crear una planificación con el curso especificado", () => {
    expect(planificacion.getCurso()).toBe(curso);
  });

  test("debería cambiar el curso asociado a la planificación", () => {
    const curso2 = new Curso(2, "un colegio2");
    planificacion.setCurso(curso2);
    expect(planificacion.getCurso()).toBe(curso2);
  });

  test("debería verificar si es diaria o semanal", () => {
    expect(planificacion.getEsDiaria()).toBe("Diaria");
    planificacion.setEsDiaria(false);
    expect(planificacion.getEsDiaria()).toBe("Semanal");
  });

  test("debería inicializar con 0 bloques", () => {
    expect(planificacion.cantidadBloques()).toBe(0);
  });

  test("debería agregar bloques correctamente y actualizar la cantidad", () => {
    planificacion.agregarBloque("bloque1");
    planificacion.agregarBloque("bloque2");
    planificacion.agregarBloque("bloque3");
    expect(planificacion.cantidadBloques()).toBe(3);
  });

  test("debería consultar los bloques por su índice", () => {
    planificacion.agregarBloque("bloque1");
    planificacion.agregarBloque("bloque2");
    planificacion.agregarBloque("bloque3");
    expect(planificacion.consultarBloque(1)).toBe("bloque1");
    expect(planificacion.consultarBloque(2)).toBe("bloque2");
    expect(planificacion.consultarBloque(3)).toBe("bloque3");
  });

  test("debería eliminar un bloque correctamente y ajustar la lista", () => {
    planificacion.agregarBloque("bloque1");
    planificacion.agregarBloque("bloque2");
    planificacion.agregarBloque("bloque3");
    planificacion.eliminarBloque("bloque2");
    expect(planificacion.cantidadBloques()).toBe(2);
    expect(planificacion.consultarBloque(1)).toBe("bloque1");
    expect(planificacion.consultarBloque(2)).toBe("bloque3");
  });

  test("debería establecer y obtener la fecha correctamente", () => {
    planificacion.setFecha("02/03/2021");
    expect(planificacion.getFecha()).toBe("02/03/2021");
  });

  test("debería crear una planificación semanal con bloques correspondientes", () => {
    const planificacionSemanal = new Planificacion(curso, false);
    expect(planificacionSemanal.cantidadBloques()).toBe(5);
    expect(planificacionSemanal.consultarBloque(1).getTitulo()).toBe("Lunes");
    expect(planificacionSemanal.consultarBloque(2).getTitulo()).toBe("Martes");
    expect(planificacionSemanal.consultarBloque(3).getTitulo()).toBe(
      "Miercoles",
    );
    expect(planificacionSemanal.consultarBloque(4).getTitulo()).toBe("Jueves");
    expect(planificacionSemanal.consultarBloque(5).getTitulo()).toBe("Viernes");
  });
});
