let tipoUsuario = "";

class Login {

  static realizarLogin() {
    let dadosLogin = {login: $("#email").val(), senha: $("#password").val()},
      btnLogin = $("#btn-login");

    btnLogin.button("loading");

    $.ajax({
      type: "POST",
      url: `${configSistema.servidor}/${tipoUsuario}/autenticar`,
      contentType: "application/json",
      data: JSON.stringify(dadosLogin),
      success: function (response) {
        switch (tipoUsuario) {
          case "cliente":
            AdminData.setClientToken(response.token);
            AdminData.setNomeUsuario(response.cliente.primeiroNome);
            AdminData.setIdUsuario(response.cliente.id);
            AdminData.setCompanyToken(response.cliente.empresas[0].tokenEmpresa);
            AdminData.setXToken(response.cliente.empresas[0].tokenColaborador);
            break;
          case "colaborador":
            AdminData.setXToken(response.token);
            AdminData.setNomeUsuario(response.colaborador.primeiroNome);
            AdminData.setIdUsuario(response.colaborador.id);
            break;
        }
        AdminData.setTipoUsuario(tipoUsuario);
        window.location.assign("/admin/home");
      },
      error: function() {
        btnLogin.button("reset");
        toastr.error("Login ou senha incorretos!");
      }
    });
  }

  static reenviarSenha() {
    let dadosLogin = {login: $("#loginRedefinirSenha").val()},
      btn = $("#btn-redefinirSenha");

    btn.button("loading");

    $.ajax({
      type: "POST",
      url: `${configSistema.servidor}/colaborador/recuperar-senha`,
      contentType: "application/json",
      data: JSON.stringify(dadosLogin),
      success: function () {
        btn.button("reset");
        $("#form-redefinirSenha")[0].reset();
        Login.toggleFormRedefinirSenha();
        toastr.success("Te enviamos um e-mail com as informações para redefinir a sua senha!");
      },
      error: function() {
        btn.button("reset");
        toastr.error("Não encontramos nenhuma conta com este login!");
      }
    });
  }

  static redefinirSenha () {
    let key = "redefinirSenha",
      formulario = $(`#form-${key}`),
      botao = $(`#btn-${key}`),
      campos = document.querySelectorAll(`#form-${key} input`),
      xToken = window.location.href.split("=")[1];
    if (validate(campos)) {
      botao.button("loading");
      $.ajax({
        url: `${configSistema.servidor}/colaborador/alterar-senha`,
        headers: {"X-Token": xToken},
        method: "PUT",
        data: serializeArrayToJSON(formulario),
        success: function () {
          toastr.success("Senha redefinida com sucesso!");
          botao.button("reset");
          setInterval(() => {
            window.location.href = "/admin/login";
          }, 1000);
        },
        error: function () {
          toastr.error("Erro ao redefinir a senha. Tente novamente!");
          botao.button("reset");
        }
      });
    }
  }

  static toggleFormRedefinirSenha () {
    $("#form-login").toggleClass("none");
    $("#form-redefinirSenha").toggleClass("none");
  }

  static abrirLoginAdministrativo () {
    let href = window.location.href;
    if (href.includes("mimoplus")) {
      window.location.href = "https://painel.mimoplus.com.br/admin/login-administrativo";
    } else if (href.includes("rasplus")) {
      window.location.href = "https://painel.rasplus.com.br/admin/login-administrativo";
    } else if (href.includes("localhost")) {
      window.location.href = "http://localhost:5700/admin/login-administrativo";
    }
  }

}

function logarComEnter() {
  $(document).on("keypress", function (e) {
    if (e.wich === 13 || e.keyCode === 13) {
      if ($("#form-login").hasClass("none")) {
        Login.reenviarSenha();
      } else {
        Login.realizarLogin();
      }
    }
  });
}

$(document).ready(function () {
  logarComEnter();
});
