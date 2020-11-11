var offsetColaborador = 0;

class Servicos {

  static cadastrar () {
    let key = "cadastrarColaborador",
      formulario = $(`#form-${key}`),
      botao = $(`#btn-${key}`),
      modal = $(`#modal-${key}`),
      campos = document.querySelectorAll(`#form-${key} input`);

    if (validate(campos)) {
      botao.button("loading");

      $.ajax({
        url: `${configSistema.servidor}/cliente/colaborador`,
        headers: Config.getClientHeaders(),
        method: "POST",
        data: JSON.stringify(serializeArrayToJSON(formulario)),
        success: function () {
          toastr.success("Colaborador cadastrado com sucesso!");
          botao.button("reset");
          formulario[0].reset();
          modal.modal("hide");
          Colaborador.consultar();
        },
        error: function () {
          toastr.error("Erro ao cadastrar o colaborador. Tente novamente!");
          botao.button("reset");
        }
      });
    }
  }

  static cadastrarCotaBonus () {
    let key = "cotaBonus",
      formulario = $(`#form-${key}`),
      botao = $(`#btn-${key}`),
      modal = $(`#modal-${key}`),
      campos = document.querySelectorAll(`#form-${key} input`);

    if (validate(campos)) {
      botao.button("loading");

      $.ajax({
        url: `${configSistema.servidor}/cliente/assinatura/add-cota-extra`,
        headers: Config.getClientHeaders(),
        method: "POST",
        data: JSON.stringify(serializeArrayToJSON(formulario)),
        success: function () {
          toastr.success("Cota extra adicionada com sucesso!");
          botao.button("reset");
          formulario[0].reset();
          modal.modal("hide");
          Colaborador.consultar();
        },
        error: function () {
          toastr.error("Erro ao adicionar a cota extra ao colaborador. Tente novamente!");
          botao.button("reset");
        }
      });
    }
  }

  static buscarColaborador () {
    Colaborador.setOffset(0);
  }

  static consultar() {
    let barraProgresso = $(`#progressServicos`),
      tabelaColaborador = $(`#tabelaServicos`);

    barraProgresso.removeClass(`none`);
    tabelaColaborador.addClass(`none`);
    tabelaColaborador.empty();
    tabelaColaborador.append(`
      <div class='table-responsive'>
        <table id='datatable' class='table table-striped table-bordered' width='100%'>
          <thead>
          <tr>
            <th>Ícone</th>
            <th>Nome</th>
            <th>Avaliações</th>
            <th>Ações</th>
          </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    `);
    // $.ajax({
    //   url: `${configSistema.servidor}/cliente/colaborador/todos?offset=${offsetColaborador}&nome=${query}`,
    //   headers: Config.getClientHeaders(),
    //   method: 'GET',
    //   dataType: 'json',
    //   success: function (response) {
    //     if (response.colaboradores.length === 0) {
    //       $("#datatable tbody").append(
    //         `<tr><td colspan="4">Ainda não existem serviços cadastrados! Clique no botão <em>+ Novo</em> para cadadastrar!</td></tr>`
    //       );
    //     } else {
    //       $.each(response.colaboradores, (i, colaborador) => {
            $("#datatable tbody").append(
              `<tr>
                <td><img src="" alt="Icone do serviço"></td>
                <td>Pagar.me</td>
                <td>5 avaliações</td>
                <td><div class="acoesTabela">
                  <a>Editar</a>
                  <a>Excluir</a>
                  <a>Ver avaliações</a>
                </div></td>
              </tr>
            `);
          // });
        // }
        // <div class="acoesTabela">
        //   ${
        //     colaborador.active === "1" ?
        //       `<a data-loading-text="<i class='fa fa-spinner fa-spin'></i> Aguarde..." id='desativarColaborador' onclick="Colaborador.statusColaborador(this, ${colaborador.id}, false)"><i class="fas fa-chevron-down"></i> Desativar acesso</a>`
        //     : `<a data-loading-text="<i class='fa fa-spinner fa-spin'></i> Aguarde..." id='ativarColaborador' onclick="Colaborador.statusColaborador(this, ${colaborador.id}, true)"><i class="fas fa-chevron-up"></i> Reativar acesso</a>`
        //   }
        //   <a onclick="Colaborador.abrirModalEditarColaborador(${colaborador.id}, '${colaborador.primeiroNome}', '${colaborador.ultimoNome}', '${colaborador.login}')"><i class="fa fa-edit"></i> Editar</a>
        //   <a onclick="Colaborador.abrirModalExcluirColaborador(${colaborador.id})"><i class="fas fa-trash"></i> Excluir</a>
        // </div>
        tooltip();
        // Colaborador.criarPaginacao(response.total);
        barraProgresso.addClass(`none`);
        tabelaColaborador.removeClass(`none`);
      // },
      // error: function () {
      //   toastr.error("Não foi possível obter a lista de colaboradores cadastrados!");
      // }
    // });
  }

  static renderCards () {
    $.ajax({
      url: `${configSistema.servidor}/cliente/empresa/dados-colaboradores`,
      headers: Config.getClientHeaders(),
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        $("#numAssinantes-assinantesConfirmados").text(response.numAssinantes);
        $("#numColaboradoresCadastrados-assinantesConfirmados").text(response.numColaboradores);
        $("#progressBar-assinantesConfirmados").append(`
          <div class="progress-bar" role="progressbar" style="width: ${(100 * response.numAssinantes) / response.numColaboradores}%; background-color: #2dce89; box-shadow: 0 0 0 0;"></div>
        `);
        $("#progress-assinantesConfirmados").css("display", "none");
        $("#card-assinantesConfirmados").css("display", "block");

        $("#numAssinaturasVencidas-assinaturasVencidas").text(response.numAssinaturasVencidas);
        $("#numAssinantes-assinaturasVencidas").text(response.numAssinantes);
        $("#progressBar-assinaturasVencidas").append(`
          <div class="progress-bar" role="progressbar" style="width: ${(100 * response.numAssinaturasVencidas) / response.numAssinantes}%; background-color: #F5365C; box-shadow: 0 0 0 0;"></div>
        `);
        $("#progress-assinaturasVencidas").css("display", "none");
        $("#card-assinaturasVencidas").css("display", "block");

        $("#numPublicacoesCadastradas-publicacoesCadastradas").text(response.numPublicacoes);

        $("#progress-publicacoesCadastradas").css("display", "none");
        $("#card-publicacoesCadastradas").css("display", "block");
      },
      error: function () {
        toastr.error("Erro ao se comunicar com o banco de dados. Tente novamente!");
      }
    });
  }

  // static editar () {
  //   let key = "editarColaborador",
  //     formulario = $(`#form-${key}`),
  //     botao = $(`#btn-${key}`),
  //     modal = $(`#modal-${key}`),
  //     campos = document.querySelectorAll(`#form-${key} input`);
  //   if (validate(campos)) {
  //     botao.button("loading");
  //     $.ajax({
  //       url: `${configSistema.servidor}/company/collaborator`,
  //       headers: Config.getHeaders(),
  //       method: "PUT",
  //       data: JSON.stringify(serializeArrayToJSON(formulario)),
  //       success: function () {
  //         toastr.success("Colaborador atualizado com sucesso!");
  //         botao.button("reset");
  //         formulario[0].reset();
  //         AdminData.setNomeCliente($("#editarColaboradorName").val());
  //         Colaborador.consultar();
  //         modal.modal("hide");
  //       },
  //       error: function () {
  //         toastr.error("Erro ao atualizar o colaborador. Tente novamente!");
  //         botao.button("reset");
  //         modal.modal("hide");
  //       }
  //     });
  //   }
  // }

  // static statusColaborador (btn, id, status) {
  //   let botao = $(btn);
  //   botao.button("loading");
  //   $.ajax({
  //     url: `${configSistema.servidor}/company/collaborator/active`,
  //     headers: Config.getHeaders(),
  //     method: "PUT",
  //     data: JSON.stringify(serializeArrayToJSON(null, [{name: "id", value: id}, {name: "active", value: status}])),
  //     success: function () {
  //       toastr.success("Colaborador atualizado com sucesso!");
  //       botao.button("reset");
  //       Colaborador.consultar();
  //     },
  //     error: function () {
  //       toastr.error("Erro ao atualizar o colaborador. Tente novamente!");
  //       botao.button("reset");
  //     }
  //   });
  // }

  // static abrirModalEditarColaborador (id, nome, sobrenome, email) {
  //   $("#editarColaboradorId").val(id);
  //   $("#editarColaboradorName").val(nome);
  //   $("#editarColaboradorSobrenome").val(sobrenome);
  //   $("#editarColaboradorEmail").val(email);
  //   $("#modal-editarColaborador").modal("show");
  // }

  static editarSenha () {
    let key = "editarSenhaColaborador",
      formulario = $(`#form-${key}`),
      botao = $(`#btn-${key}`),
      modal = $(`#modal-${key}`),
      campos = document.querySelectorAll(`#form-${key} input`);
    if (validate(campos)) {
      botao.button("loading");
      $.ajax({
        url: `${configSistema.servidor}/cliente/colaborador/atualizar-senha`,
        headers: Config.getClientHeaders(),
        method: "PUT",
        data: JSON.stringify(serializeArrayToJSON(formulario)),
        success: function () {
          toastr.success("Senha do colaborador atualizada com sucesso!");
          botao.button("reset");
          formulario[0].reset();
          Colaborador.consultar();
          modal.modal("hide");
        },
        error: function () {
          toastr.error("Erro ao atualizar a senha do colaborador. Tente novamente!");
          botao.button("reset");
          modal.modal("hide");
        }
      });
    }
  }

  // static excluir () {
  //   let key = "excluirColaborador",
  //     formulario = $(`#form-${key}`),
  //     botao = $(`#btn-${key}`),
  //     botaoCancelar = $("#btn-cancelarExcluirColaborador"),
  //     modal = $(`#modal-${key}`),
  //     campos = document.querySelectorAll(`#form-${key} input, #form-${key} textarea`);

  //   if (validate(campos)) {
  //     let dadosSerializados = serializeArrayToJSON(formulario);
  //     botao.button("loading");
  //     botaoCancelar.button("loading");
  //     $.ajax({
  //       url: `${configSistema.servidor}/cliente/colaborador?colaboradorId=${dadosSerializados.id}`,
  //       headers: Config.getHeaders(),
  //       method: "DELETE",
  //       success: function () {
  //         toastr.success("Colaborador excluído com sucesso!");
  //         botao.button("reset");
  //         botaoCancelar.button("reset");
  //         formulario[0].reset();
  //         Colaborador.consultar();
  //         modal.modal("hide");
  //       },
  //       error: function (e) {
  //         console.log(e);
  //         toastr.error("Erro ao excluir o colaborador. Tente novamente!");
  //         botao.button("reset");
  //         botaoCancelar.button("reset");
  //         modal.modal("hide");
  //       }
  //     });
  //   }
  // }

  static abrirModalAdicionarServico () {
    $("#modal-cadastrarServicos").modal("show");
  }

  static abrirModalEditarSenhaColaborador (login) {
    $("#login-editarSenhaColaborador").val(login);
    $("#modal-editarSenhaColaborador").modal("show");
  }

  // static abrirModalExcluirColaborador (id) {
  //   $("#excluirColaboradorId").val(id);
  //   $("#modal-excluirColaborador").modal("show");
  // }

  static criarPaginacao (total) {
    let paginacao = 1,
      i = 0,
      $el = $("#paginacaoColaborador > nav > ul");

    if (total > 9) {
      paginacao = Math.trunc((total / 10) + 1);
    }

    $el.empty();

    while (i < paginacao) {
      $el.append(`<li class=${i * 10 === this.getOffset() ? "active" : ""}><a onclick="Colaborador.setOffset(${i * 10})">${i + 1}</a></li>`);
      i++;
    }

    $el.append(
      `<li>
        <a onclick="Colaborador.adiantarOffset(${10 * i})" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>`
    );

   $el.prepend(
      `<li>
        <a onclick="Colaborador.voltarOffset()" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `);
  }

  static setOffset (num) {
    offsetColaborador = num;
    this.consultar();
  }

  static getOffset () {
    return offsetColaborador;
  }

  static adiantarOffset (total) {
    if ((this.getOffset() + 10) <= (total - 10)) {
      this.setOffset(this.getOffset() + 10);
    }
  }

  static voltarOffset () {
    if (this.getOffset() > 0) {
      this.setOffset(this.getOffset() - 10);
    }
  }
}
