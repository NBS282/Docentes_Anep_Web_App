import Bloque from "./bloque.js"; // Ajusta la ruta de importación según corresponda

describe("Clase Bloque", () => {
  let bloque; // Declaramos la variable fuera del beforeEach para tener acceso en todos los tests

  // Se ejecuta antes de cada prueba
  beforeEach(() => {
    bloque = new Bloque("Científico Matemático", "Matemáticas");
  });

  // Test para el constructor
  test("debería crear un bloque con espacio y unidad", () => {
    expect(bloque.getEspacio()).toBe("Científico Matemático");
    expect(bloque.getUnidad()).toBe("Matemáticas");
  });

  test("debería devolver que es no estructurado", () => {
    expect(bloque.esEstructurado()).toBe(false);
  });

  // Test para el método imprimirBloque
  test("debería retornar la descripción del bloque correctamente", () => {
    const descripcion = bloque.imprimirBloque();
    expect(descripcion).toBe(
      "Espacio Curricular: Científico Matemático - Unidad Curricular: Matemáticas",
    );
  });

  // Test para el método toString (que llama a imprimirBloque)
  test("debería retornar la misma descripción en toString()", () => {
    expect(bloque.toString()).toBe(
      "Espacio Curricular: Científico Matemático - Unidad Curricular: Matemáticas",
    );
  });

  // Test para setCuerpo y getCuerpo
  test("debería permitir agregar y obtener un cuerpo", () => {
    bloque.setCuerpo("Este es el cuerpo del bloque");
    expect(bloque.getCuerpo()).toBe("Este es el cuerpo del bloque");
  });

  // Test para setUnidad y getUnidad
  test("debería cambiar la unidad correctamente", () => {
    bloque.setUnidad("Física y Química");
    expect(bloque.getUnidad()).toBe("Física y Química");
  });

  // Test para setEspacio y getEspacio
  test("debería cambiar el espacio correctamente", () => {
    bloque.setEspacio("Comunicación");
    expect(bloque.getEspacio()).toBe("Comunicación");
  });

  // Test para setTitulo y getTitulo
  test("debería cambiar el titulo correctamente", () => {
    bloque.setTitulo("un titulo");
    expect(bloque.getTitulo()).toBe("un titulo");
  });
});
