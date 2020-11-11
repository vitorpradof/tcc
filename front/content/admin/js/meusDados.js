class MeusDados {

  static editarColaborador () {
    let key = "editarColaborador",
      formulario = $(`#form-${key}`),
      botao = $(`#btn-${key}`),
      campos = document.querySelectorAll(`#form-${key} input, #form-${key} textarea`);

    if (validate(campos)) {
      botao.button("loading");

      $.ajax({
        url: `${configSistema.servidor}/colaborador`,
        headers: Config.getHeaders(),
        method: "PUT",
        data: JSON.stringify(serializeArrayToJSON(formulario)),
        success: function () {
          toastr.success("Dados atualizados com sucesso!");
          botao.button("reset");
        },
        error: function () {
          toastr.error("Erro ao atualizar os seus dados. Tente novamente!");
          botao.button("reset");
        }
      });
    }
  }

  static editarEmpresa () {
    let key = "editarEmpresa",
      formulario = $(`#form-${key}`),
      botao = $(`#btn-${key}`),
      campos = document.querySelectorAll(`#form-${key} input, #form-${key} textarea`);

    if (validate(campos)) {
      botao.button("loading");

      $.ajax({
        url: `${configSistema.servidor}/cliente/empresa`,
        headers: Config.getClientHeaders(),
        method: "PUT",
        data: JSON.stringify(serializeArrayToJSON(formulario)),
        success: function () {
          toastr.success("Informações da empresa atualizadas com sucesso!");
          botao.button("reset");
        },
        error: function () {
          toastr.error("Erro ao atualizar as informações da empresa. Tente novamente!");
          botao.button("reset");
        }
      });
    }
  }

  static alterarSenha () {
    let key = "alterarSenha",
      formulario = $(`#form-${key}`),
      botao = $(`#btn-${key}`),
      modal = $(`#modal-${key}`),
      campos = document.querySelectorAll(`#form-${key} input`);

    if (validate(campos)) {
      botao.button("loading");

      $.ajax({
        url: `${configSistema.servidor}/colaborador/alterar-senha`,
        headers: Config.getHeaders(),
        method: "PUT",
        data: JSON.stringify(serializeArrayToJSON(formulario)),
        success: function () {
          toastr.success("Senha alterada com sucesso!");
          botao.button("reset");
          formulario[0].reset();
          modal.modal("hide");
        },
        error: function () {
          toastr.error("Erro ao alterar a senha. Tente novamente!");
          botao.button("reset");
        }
      });
    }
  }

  static consultarColaborador () {
    $.ajax({
      url: `${configSistema.servidor}/colaborador`,
      headers: Config.getHeaders(),
      method: "GET",
      dataType: "json",
      success: function (response) {
        $("#primeiroNome").val(response.name);
        $("#primeiroNome").attr("disabled", false);
        $("#ultimoNome").val(response.lastName);
        $("#ultimoNome").attr("disabled", false);
        $("#documento").val(response.documento);
        $("#documento").attr("disabled", false);
        if (response.documento && response.documento.length === 18) {
          $('#documento').mask('00.000.000/0000-00');
          $('#pessoaJuridica').attr("checked", "true");
          $("#labelDocumento").text("CNPJ");
        } else {
          $('#documento').mask('000.000.000-00');
          $('#pessoaFisica').attr("checked", "true");
          $("#labelDocumento").text("CPF");
        }
        $("#email").val(response.email);
        $("#email").attr("disabled", false);
        $("#btn-editarColaborador").attr("disabled", false);
      },
      error: function (e) {
        toastr.error("Erro ao consultar os seus dados. Atualize a tela e tente novamente!");
      }
    });
  }

  static mudarTipoPessoa (tipo) {
    if (tipo === "juridica") {
      $("#labelDocumento").text("CNPJ");
      $("#documento").mask("00.000.000/0000-00");
      $("#documento").val("");
    } else {
      $("#labelDocumento").text("CPF");
      $("#documento").mask("000.000.000-00");
      $("#documento").val("");
    }
  }

  static abrirModalAlterarSenha () {
    $("#modal-alterarSenha").modal("show");
  }

  static consultarEmpresa () {
    $.ajax({
      url: `${configSistema.servidor}/cliente/empresa`,
      headers: Config.getClientHeaders(),
      method: "GET",
      dataType: "json",
      success: function (response) {
        $("#corporateName").val(response.corporateName);
        $("#corporateName").attr("disabled", false);
        $("#fantasyName").val(response.fantasyName);
        $("#fantasyName").attr("disabled", false);
        $("#cnpj").val(response.cnpj);
        $("#cnpj").attr("disabled", false);
        $('#cnpj').mask('00.000.000/0000-00', {reverse: true});
        $("#address").val(response.address);
        $("#address").attr("disabled", false);
        $("#telephone").val(response.telephone);
        $("#telephone").attr("disabled", false);
        $('#telephone').mask('(00) 0 0000-0000');
        $("#tokenASAAS").val(response.tokenASAAS);
        $("#tokenASAAS").attr("disabled", false);
        $("#valorCotaExtra").val(response.valorCotaExtra);
        $("#valorCotaExtra").attr("disabled", false);
        $("#btn-editarEmpresa").attr("disabled", false);
      },
      error: function (e) {
        toastr.error("Erro ao consultar os dados da empresa. Atualize a tela e tente novamente!");
        console.log(e);
      }
    });
  }

  static exibirEdicaoEmpresa () {
    if (AdminData.getTipoUsuario() === "cliente") {
      $("#conteudo-meusDados").append(`
        <div class="col-sm-12 col-md-6 col-lg-6">
          <div class="aBox box-md">
            <div><h4>Dados da empresa</h4><div class="divLineTitle"></div></div>
            <form id="form-editarEmpresa" method="post">
              <div class="form-group">
                <label for="corporateName"><span class="perguntaObrigatoria">*</span>Nome da empresa</label>
                <input type="text" class="form-control" name="corporateName" id="corporateName" value="Carregando..." required disabled />
              </div>
              <div class="form-group">
                <label for="fantasyName"><span class="perguntaObrigatoria">*</span>Nome fantasia</label>
                <input type="text" class="form-control" name="fantasyName" id="fantasyName" value="Carregando..." required disabled />
              </div>
              <div class="form-group">
                <label for="cnpj"><span class="perguntaObrigatoria">*</span>CNPJ</label>
                <input type="text" class="form-control" name="cnpj" id="cnpj" value="Carregando..." required disabled />
              </div>
              <div class="form-group">
                <label for="address"><span class="perguntaObrigatoria">*</span>Endereço</label>
                <input type="text" class="form-control" name="address" id="address" value="Carregando..." required disabled />
              </div>
              <div class="form-group">
                <label for="telephone"><span class="perguntaObrigatoria">*</span>Contato</label>
                <input type="text" class="form-control" name="telephone" id="telephone" value="Carregando..." required disabled />
              </div>
              <div class="form-group">
                <label for="tokenASAAS"><span class="perguntaObrigatoria">*</span>Token ASAAS</label>
                <textarea class="form-control" name="tokenASAAS" id="tokenASAAS" required disabled>Carregando...</textarea>
              </div>
              <div class="form-group">
                <label for="valorCotaExtra">Valor da cota extra</label>
                <input type="text" class="form-control" name="valorCotaExtra" id="valorCotaExtra" value="Carregando..." disabled onkeyup="MeusDados.formatarCampoValor('valorCotaExtra')" />
              </div>
              <br/>
              <button onclick="MeusDados.editarEmpresa()" id="btn-editarEmpresa" class="btn btn-sucesso" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Aguarde" type="button" disabled>Atualizar</button>
            </form>
          </div>
        </div>
      `);
      MeusDados.consultarEmpresa();
      $("#a-alterarSenha").addClass("none");
    }
  }

  static formatarCampoValor (el) {
    let elemento = document.querySelector(`#${el}`),
      valor = elemento.value ? elemento.value : 0;

    elemento.value = formatarMoedaBr(valor);
  }

}
