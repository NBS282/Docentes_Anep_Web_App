export default class Curso {
  constructor(ano, colegio) {
    this.ano = ano;
    this.colegio = colegio;
  }

  setCurso(ano) {
    this.ano = ano;
  }

  getAno() {
    return this.ano;
  }

  setAno(ano) {
    this.ano = ano;
  }

  getColegio() {
    return this.colegio;
  }

  setColegio(colegio) {
    this.colegio = colegio;
  }

  imprimirCurso() {
    const elAno = parseInt(this.getAno()); // Verifica el valor
    switch (elAno) {
      case 1:
        return this.getAno() + 'ro - "' + this.getColegio() + '"';
      case 2:
        return this.getAno() + 'do - "' + this.getColegio() + '"';
      case 3:
        return this.getAno() + 'ro - "' + this.getColegio() + '"';
      case 7:
        return this.getAno() + 'mo - "' + this.getColegio() + '"';
      case 8:
        return this.getAno() + 'vo - "' + this.getColegio() + '"';
      case 9:
        return this.getAno() + 'no - "' + this.getColegio() + '"';
      default:
        return this.getAno() + 'to - "' + this.getColegio() + '"';
    }
  }

  toString() {
    return this.imprimirCurso();
  }
}
