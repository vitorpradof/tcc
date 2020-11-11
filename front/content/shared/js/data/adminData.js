class AdminData {

  static setXToken(token) {
    localStorage.setItem("X-Token", token);
  }

  static getXToken() {
    return localStorage.getItem("X-Token");
  }

  static removeXToken() {
    localStorage.removeItem("X-Token");
  }

  static setClientToken(token) {
    localStorage.setItem("ClientToken", token);
  }

  static getClientToken() {
    return localStorage.getItem("ClientToken");
  }

  static removeClientToken() {
    localStorage.removeItem("ClientToken");
  }

  static setCompanyToken(token) {
    localStorage.setItem("CompanyToken", token);
  }

  static getCompanyToken() {
    return localStorage.getItem("CompanyToken");
  }

  static removeCompanyToken() {
    localStorage.removeItem("CompanyToken");
  }

  static setNomeUsuario(nome) {
    localStorage.setItem("NomeUsuario", nome);
  }

  static getNomeUsuario() {
    return localStorage.getItem("NomeUsuario");
  }

  static setTheRealNomeUsuario(nome) {
    localStorage.setItem("TheRealNomeUsuario", nome);
  }

  static getTheRealNomeUsuario() {
    return localStorage.getItem("TheRealNomeUsuario");
  }

  static setIdUsuario(idUsuario) {
    localStorage.setItem("IdUsuario", idUsuario);
  }

  static getIdUsuario() {
    return localStorage.getItem("IdUsuario");
  }

  static setTipoUsuario(tipoUsuario) {
    localStorage.setItem("TipoUsuario", tipoUsuario);
  }

  static getTipoUsuario() {
    return localStorage.getItem("TipoUsuario");
  }

  static setColaboradorLogado(nome) {
    localStorage.setItem("LogadoComoColaborador", nome);
  }

  static getColaboradorLogado() {
    return localStorage.getItem("LogadoComoColaborador");
  }

  static removeColaboradorLogado() {
    localStorage.removeItem("LogadoComoColaborador");
  }

  static setTheRealXToken(token) {
    localStorage.setItem("TheRealXToken", token);
  }

  static getTheRealXToken() {
    return localStorage.getItem("TheRealXToken");
  }

  static removeTheRealXToken() {
    localStorage.removeItem("TheRealXToken");
  }

  static setTheRealClientToken(token) {
    localStorage.setItem("TheRealClientToken", token);
  }

  static getTheRealClientToken() {
    return localStorage.getItem("TheRealClientToken");
  }

  static removeTheRealClientToken() {
    localStorage.removeItem("TheRealClientToken");
  }

}
