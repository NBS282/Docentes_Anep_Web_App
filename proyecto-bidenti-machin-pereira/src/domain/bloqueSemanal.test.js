import BloqueSemanal from "./bloqueSemanal.js"; // Ajusta la ruta de importación según corresponda

describe("Clase BloqueSemanal", () => {
  let bloque; // Declaramos la variable fuera del beforeEach para tener acceso en todos los tests

  // Se ejecuta antes de cada prueba
  beforeEach(() => {
    bloque = new BloqueSemanal("Lunes");
  });

  // Test para el constructor
  test("debería crear un bloque con el título adecuado", () => {
    expect(bloque.getTitulo()).toBe("Lunes");
  });

  // Test para valores por defecto del constructor
  test("compruebo que los campos recién creados empiezan vacíos", () => {
    expect(bloque.getCuerpoCientifico()).toBe("");
    expect(bloque.getCuerpoComunicacion()).toBe("");
    expect(bloque.getCuerpoSyH()).toBe("");
    expect(bloque.getCuerpoCreativoArtistico()).toBe("");
    expect(bloque.getCuerpoDevPerYConCor()).toBe("");
    expect(bloque.getCuerpoTec()).toBe("");
  });

  // Test para los distintos setCuerpo
  test("pruebo a cambiar el texto de los cuerpos y obtener su nuevo valor", () => {
    bloque.setCuerpoCientifico("Texto científico");
    bloque.setCuerpoComunicacion("Texto comunicación");
    bloque.setCuerpoSyH("Texto SyH");
    bloque.setCuerpoCreativoArtistico("Texto artístico");
    bloque.setCuerpoDevPerYConCor("Texto desarrollo personal");
    bloque.setCuerpoTec("Texto técnico");
    expect(bloque.getCuerpoCientifico()).toBe("Texto científico");
    expect(bloque.getCuerpoComunicacion()).toBe("Texto comunicación");
    expect(bloque.getCuerpoSyH()).toBe("Texto SyH");
    expect(bloque.getCuerpoCreativoArtistico()).toBe("Texto artístico");
    expect(bloque.getCuerpoDevPerYConCor()).toBe("Texto desarrollo personal");
    expect(bloque.getCuerpoTec()).toBe("Texto técnico");
  });

  // Test para el método imprimirBloque
  test("imprimirBloque debería devolver el título del bloque", () => {
    expect(bloque.imprimirBloque()).toBe("Lunes");
  });

  // Test para el método toString
  test("toString debería devolver lo mismo que imprimirBloque", () => {
    expect(bloque.toString()).toBe(bloque.imprimirBloque());
  });

  // Test para cambiar el título del bloque
  test("debería permitir cambiar el título del bloque", () => {
    bloque.setTitulo("Martes");
    expect(bloque.getTitulo()).toBe("Martes");
  });

  // Test de comportamiento con textos vacíos
  test("debería permitir establecer textos vacíos en los cuerpos", () => {
    bloque.setCuerpoCientifico("");
    bloque.setCuerpoComunicacion("");
    bloque.setCuerpoSyH("");
    bloque.setCuerpoCreativoArtistico("");
    bloque.setCuerpoDevPerYConCor("");
    bloque.setCuerpoTec("");
    expect(bloque.getCuerpoCientifico()).toBe("");
    expect(bloque.getCuerpoComunicacion()).toBe("");
    expect(bloque.getCuerpoSyH()).toBe("");
    expect(bloque.getCuerpoCreativoArtistico()).toBe("");
    expect(bloque.getCuerpoDevPerYConCor()).toBe("");
    expect(bloque.getCuerpoTec()).toBe("");
  });

  // Test para comprobar integridad tras múltiples cambios
  test("debería mantener consistencia tras varios cambios de valores", () => {
    bloque.setTitulo("Miércoles");
    bloque.setCuerpoCientifico("Nuevo texto científico");
    bloque.setCuerpoComunicacion("Nuevo texto comunicación");
    expect(bloque.getTitulo()).toBe("Miércoles");
    expect(bloque.getCuerpoCientifico()).toBe("Nuevo texto científico");
    expect(bloque.getCuerpoComunicacion()).toBe("Nuevo texto comunicación");
  });
});
