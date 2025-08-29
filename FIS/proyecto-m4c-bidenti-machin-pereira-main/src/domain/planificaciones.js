import BloqueSemanal from "./bloqueSemanal.js";
export default class Planificacion {
  constructor(curso, boolEsDiaria) {
    this.setCurso(curso);
    this.setEsDiaria(boolEsDiaria);
    this.listaBloques = [];

    if (!boolEsDiaria) {
      let bloqueLunes = new BloqueSemanal("Lunes");
      let bloqueMartes = new BloqueSemanal("Martes");
      let bloqueMiercoles = new BloqueSemanal("Miercoles");
      let bloqueJueves = new BloqueSemanal("Jueves");
      let bloqueViernes = new BloqueSemanal("Viernes");
      this.agregarBloque(bloqueLunes);
      this.agregarBloque(bloqueMartes);
      this.agregarBloque(bloqueMiercoles);
      this.agregarBloque(bloqueJueves);
      this.agregarBloque(bloqueViernes);
    }
  }

  agregarBloque(elBloque) {
    this.listaBloques.push(elBloque);
  }

  consultarBloque(nroBloque) {
    return this.listaBloques[nroBloque - 1];
  }

  eliminarBloque(bloqueEliminar) {
    for (let i = 1; i <= this.cantidadBloques(); i++) {
      if (this.consultarBloque(i) == bloqueEliminar) {
        this.listaBloques.splice(i - 1, 1);
      }
    }
  }

  cantidadBloques() {
    return this.listaBloques.length;
  }

  getCurso() {
    return this.curso;
  }

  setCurso(unCurso) {
    this.curso = unCurso;
  }

  getEsDiaria() {
    return this.esDiaria ? "Diaria" : "Semanal";
  }

  setEsDiaria(esDiaria) {
    this.esDiaria = esDiaria;
  }

  getFecha() {
    return this.fecha;
  }

  setFecha(unaFecha) {
    this.fecha = unaFecha;
  }
}
