import Curso from "./curso";

describe("Clase Curso", () => {
  let curso;

  beforeEach(() => {
    curso = new Curso(1, "Liceo Prueba");
  });

  // Test: creación de un curso
  test("crear un curso y verificar sus propiedades iniciales", () => {
    expect(curso.getAno()).toBe(1);
    expect(curso.getColegio()).toBe("Liceo Prueba");
  });

  // Test: modificar el año y el colegio de un curso
  test("modificar las propiedades de un curso", () => {
    curso.setAno(5);
    curso.setColegio("Escuela Nueva");
    expect(curso.getAno()).toBe(5);
    expect(curso.getColegio()).toBe("Escuela Nueva");
  });

  // Test: impresión correcta de cursos para distintos años
  test("verificar la impresión para distintos años", () => {
    const testCases = [
      { ano: 1, colegio: "Liceo 1", expected: '1ro - "Liceo 1"' },
      { ano: 2, colegio: "Liceo 2", expected: '2do - "Liceo 2"' },
      { ano: 3, colegio: "Liceo 3", expected: '3ro - "Liceo 3"' },
      { ano: 7, colegio: "Liceo 7", expected: '7mo - "Liceo 7"' },
      { ano: 8, colegio: "Liceo 8", expected: '8vo - "Liceo 8"' },
      { ano: 9, colegio: "Liceo 9", expected: '9no - "Liceo 9"' },
      { ano: 4, colegio: "Liceo 4", expected: '4to - "Liceo 4"' },
      { ano: 6, colegio: "Liceo 6", expected: '6to - "Liceo 6"' },
    ];

    for (const { ano, colegio, expected } of testCases) {
      curso.setAno(ano);
      curso.setColegio(colegio);
      expect(curso.imprimirCurso()).toBe(expected);
    }
  });

  // Test: toString debe devolver la misma salida que imprimirCurso
  test("toString debe devolver la misma salida que imprimirCurso", () => {
    curso.setAno(3);
    curso.setColegio("Liceo Tres");
    expect(curso.toString()).toBe(curso.imprimirCurso());
  });

  // Test: creación de un curso con valores límites
  test("crear un curso con año extremo y verificar su impresión", () => {
    curso.setAno(100);
    curso.setColegio("Futuro Liceo");
    expect(curso.imprimirCurso()).toBe('100to - "Futuro Liceo"');
  });

  // Test: valores vacíos en el colegio
  test("manejar valores vacíos o nulos en el colegio", () => {
    curso.setColegio("");
    expect(curso.imprimirCurso()).toBe('1ro - ""');

    curso.setColegio(null);
    expect(curso.imprimirCurso()).toBe('1ro - "null"');
  });

  // Test: comportamiento con valores no convencionales
  test("comportamiento con valores no convencionales", () => {
    curso.setAno(0);
    curso.setColegio("Colegio Cero");
    expect(curso.imprimirCurso()).toBe('0to - "Colegio Cero"');

    curso.setAno(11);
    curso.setColegio("Colegio Once");
    expect(curso.imprimirCurso()).toBe('11to - "Colegio Once"');
  });

  // Test: manejar valores inválidos en el año
  test("comportamiento con valores no numéricos o negativos para el año", () => {
    curso.setAno(-1);
    expect(curso.imprimirCurso()).toBe('-1to - "Liceo Prueba"');

    curso.setAno("Primero");
    expect(curso.imprimirCurso()).toBe('Primeroto - "Liceo Prueba"');

    curso.setAno(null);
    expect(curso.imprimirCurso()).toBe('nullto - "Liceo Prueba"');
  });

  // Test: comportamiento con colegios con caracteres especiales
  test("manejar caracteres especiales en el colegio", () => {
    curso.setColegio("Liceo @2024!");
    expect(curso.imprimirCurso()).toBe('1ro - "Liceo @2024!"');
  });

  // Test: verificar comparación de igualdad entre cursos
  test("comparación de igualdad entre cursos", () => {
    const otroCurso = new Curso(1, "Liceo Prueba");
    expect(curso.getAno()).toBe(otroCurso.getAno());
    expect(curso.getColegio()).toBe(otroCurso.getColegio());
    expect(curso === otroCurso).toBe(false); // Son diferentes instancias
  });

  test("prabando el set de curso", () => {
    curso.setCurso(2);
    expect(curso.getAno()).toBe(2);
  });
});
