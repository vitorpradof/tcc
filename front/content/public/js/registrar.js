class Registrar {

  static registrar () {
    let key = "registrarColaborador",
      formulario = $(`#form-${key}`),
      botao = $(`#btn-${key}`),
      campos = document.querySelectorAll(`#form-${key} input`),
      companyToken = window.location.href.split("=")[1];
    if (validate(campos)) {
      botao.button("loading");
      let dadosEmJson = serializeArrayToJSON(formulario);
      $.ajax({
        url: `${configSistema.servidor}/cliente/colaborador`,
        headers: {"CompanyToken": companyToken},
        method: "POST",
        data: dadosEmJson,
        success: function (response) {
          localStorage.clear();
          AdminData.setXToken(response.token);
          AdminData.setNomeUsuario(dadosEmJson.primeiroNome);
          AdminData.setIdUsuario(response.colaborador.id);
          window.location.href = "/admin/minha-assinatura";
          botao.button("reset");
          formulario[0].reset();
        },
        error: function (e) {
          toastr.error("Erro ao se registrar. Tente novamente!");
          botao.button("reset");
        }
      });
    }
  }

  static mudarTipoPessoa (tipo) {
    if (tipo === "juridica") {
      $("#labelDocumento").text(" CNPJ");
      $("#documento").mask("00.000.000/0000-00");
      $("#documento").val("");
    } else {
      $("#labelDocumento").text(" CPF");
      $("#documento").mask("000.000.000-00");
      $("#documento").val("");
    }
  }

  static mudarEtapa () {
    if ($("#pt2-registrarColaborador").hasClass("none")) {
      if (validate(document.querySelectorAll("#pt1-registrarColaborador input[type=text]"))) {
        $("#pt1-registrarColaborador").toggleClass("none");
        $("#pt2-registrarColaborador").toggleClass("none");    
      }
    } else {
      $("#pt1-registrarColaborador").toggleClass("none");
      $("#pt2-registrarColaborador").toggleClass("none");
    }
  }
}
