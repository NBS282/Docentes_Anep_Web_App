import BloqueEstructurado from "./bloqueEstructurado.js"; // Ajusta la ruta de importación según corresponda

describe("Clase BloqueEstructurado", () => {
  let bloque; // Declaramos la variable fuera del beforeEach para tener acceso en todos los tests

  beforeEach(() => {
    bloque = new BloqueEstructurado("Matemáticas", "Álgebra");
  });

  test("Debería inicializarse con el espacio y unidad dados al constructor", () => {
    expect(bloque.getEspacio()).toBe("Matemáticas");
    expect(bloque.getUnidad()).toBe("Álgebra");
  });

  test("pruebo get y set unidad", () => {
    bloque.setUnidad("Química");
    expect(bloque.getUnidad()).toBe("Química");
  });

  test("imprimirBloque", () => {
    const esperado =
      "Espacio Curricular: Matemáticas - Unidad Curricular: Álgebra";
    expect(bloque.imprimirBloque()).toBe(esperado);
  });

  test("toString debería retornar lo mismo que imprimirBloque", () => {
    expect(bloque.toString()).toBe(bloque.imprimirBloque());
  });

  test("esEstructurado debería retornar true", () => {
    expect(bloque.esEstructurado()).toBe(true);
  });

  test("Todos los campos adicionales deberían inicializarse como undefined", () => {
    expect(bloque.getCompetenciasGenerales()).toBeUndefined();
    expect(bloque.getCompetenciasEspecificas()).toBeUndefined();
    expect(bloque.getContenido()).toBeUndefined();
    expect(bloque.getCriteriosLogro()).toBeUndefined();
    expect(bloque.getMetaAprendizaje()).toBeUndefined();
    expect(bloque.getPlanAprendizaje()).toBeUndefined();
    expect(bloque.getFundamentacionDisciplinar()).toBeUndefined();
    expect(bloque.getFundamentacionDidactica()).toBeUndefined();
    expect(bloque.getObservaciones()).toBeUndefined();
  });

  test("Debería permitir establecer y obtener valores de campos adicionales", () => {
    bloque.setCompetenciasGenerales("ejemplo1");
    bloque.setCompetenciasEspecificas("ejemplo2");
    bloque.setContenido("ejemplo3");
    bloque.setCriteriosLogro("ejemplo4");
    bloque.setMetaAprendizaje("ejemplo5");
    bloque.setPlanAprendizaje("ejemplo6");
    bloque.setFundamentacionDisciplinar("ejemplo7");
    bloque.setFundamentacionDidactica("ejemplo8");
    bloque.setObservaciones("ejemplo9");

    expect(bloque.getCompetenciasGenerales()).toBe("ejemplo1");
    expect(bloque.getCompetenciasEspecificas()).toBe("ejemplo2");
    expect(bloque.getContenido()).toBe("ejemplo3");
    expect(bloque.getCriteriosLogro()).toBe("ejemplo4");
    expect(bloque.getMetaAprendizaje()).toBe("ejemplo5");
    expect(bloque.getPlanAprendizaje()).toBe("ejemplo6");
    expect(bloque.getFundamentacionDisciplinar()).toBe("ejemplo7");
    expect(bloque.getFundamentacionDidactica()).toBe("ejemplo8");
    expect(bloque.getObservaciones()).toBe("ejemplo9");
  });

  test("probando el setTitulo y getTitulo", () => {
    bloque.setTitulo("Titulo");
    expect(bloque.getTitulo()).toBe("Titulo");
  });

  test("probando el setEspacio y getEspacio", () => {
    bloque.setEspacio("Espacio");
    expect(bloque.getEspacio()).toBe("Espacio");
  });
});
