class Authentication {

  static logout() {
    localStorage.clear();
    window.location.pathname = "/admin/login";
  }

  static fecharPainelDoColaborador () {
    AdminData.setXToken(AdminData.getTheRealXToken());
    AdminData.setClientToken(AdminData.getTheRealClientToken());
    AdminData.removeColaboradorLogado();
    AdminData.setNomeUsuario(AdminData.getTheRealNomeUsuario());
    AdminData.removeTheRealXToken();
    AdminData.removeTheRealClientToken();
    AdminData.setTipoUsuario("cliente");
    window.location.assign("/admin/home");
  }

  static validaToken () {
    Authentication.verificarHorarioToken();
    setInterval(function () {
      Authentication.verificarHorarioToken();
    }, (60 * 100) /*Um minuto*/);
  }

  static verificarHorarioToken() {
    // let tela = window.location.href.includes("registro");
    // if (!tela) {
    //   if (AdminData.getXToken() !== null) {
    //     let jwt = this.parseJwt(AdminData.getXToken()),
    //       dataExp = new Date(jwt.exp * 1000),
    //       dataAtual = new Date();

    //     if (dataExp < dataAtual) {
    //       this.logout();
    //     } else {
    //       removerLoadingScreen();
    //     }
    //   } else {
    //     this.logout();
    //   }
    // } else {
      removerLoadingScreen();
    // }
  }

  static parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}

function removerLoadingScreen () {
  $("main").removeClass("none");
  $("header").removeClass("none");
  $("#mainProgress").addClass("none");
}
