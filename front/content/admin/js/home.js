class Home {

  static iniciar () {
    $.ajax({
      url: `${configSistema.servidor}/colaborador/painel/home`,
      headers: Config.getHeaders(),
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        Home.tabelaVisualizacoes(response.maisVisualizadas);
        Home.tabelaCurtidas(response.maisCurtidas);
        Home.graficoHistorico(response.graficoInteracoes);
        Home.graficoCotas(response.cota, response.cotaUtilizada, response.cotaExtra);
        Home.cardPublicacoesExpiradas(response.publicacoesExpiradas);
        Home.cardPublicacoesDuplicadas(response.publicacoesDuplicadas);
      },
      error: function () {
        toastr.error("Erro ao se comunicar com a base de dados. Tente novamente!");
      }
    });
  }

  static tabelaVisualizacoes (visualizacoes) {
    let barraProgresso = $("#progressVisualizacoes"),
      tabela = $("#tableVisualizacoes");
    barraProgresso.removeClass(`none`);
    tabela.addClass(`none`);
    tabela.empty();
    tabela.append(
      `<div class="table-responsive">
        <table id="datatable" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Campanha</th>
              <th>Publicação</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>`
    );
    $.each(visualizacoes, (i, item) => {
      if (item.name !== null) {
        $("#datatable tbody").append(
          `<tr>
            <td style="vertical-align: middle;">${item.campanha}</td>
            <td style="vertical-align: middle;">
              <div class="alinhar-between-l">
                <div>${item.publicacao}</div>
                <span class="badge">${item.numeroVisualizacoes} <i class="far fa-eye"></i></span>
              </div>
            </td>
          </tr>`
        );
      }
    });
    barraProgresso.addClass("none");
    tabela.removeClass("none");
    dataTable("datatable");
    tooltip();
  }

  static tabelaCurtidas (curtidas) {
    let barraProgresso = $("#progressCurtidas"),
      tabela = $("#tableCurtidas");
    barraProgresso.removeClass(`none`);
    tabela.addClass(`none`);
    tabela.empty();
    tabela.append(
      `<div class="table-responsive">
        <table id="datatableCurtidas" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Campanha</th>
              <th>Publicação</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>`
    );
    $.each(curtidas, (i, item) => {
      $("#datatableCurtidas tbody").append(
        `<tr>
          <td style="vertical-align: middle;">${item.campanha}</td>
          <td style="vertical-align: middle;">
            <div class="alinhar-between-l">
              <div>${item.publicacao}</div>
              <span class="badge">${item.numeroCurtidas} <i class="far fa-heart"></i></span>
            </div>
          </td>
        </tr>`
      );
    });
    barraProgresso.addClass("none");
    tabela.removeClass("none");
    dataTable("datatableCurtidas");
    tooltip();
  }

  static graficoHistorico (data) {
    let barraProgresso = $(`#progress-chartHistory`),
      grafico = $(`#graph-chartHistory`);
    barraProgresso.removeClass("none");
    grafico.empty();
    grafico.addClass("none");
    GraficoHistorico.create(data, grafico, barraProgresso);
  }

  static graficoCotas (cota, utilizada, extra) {
    let barraProgresso = $(`#progress-chartDonut`),
      grafico = $(`#graph-chartDonut`);
    if (cota > 0) {
      barraProgresso.removeClass("none");
      grafico.empty();
      grafico.addClass("none");
      let data = [utilizada, cota - utilizada < 0 ? 0 : cota - utilizada, extra],
        backgroundColor = ["#f5365c", "#2dce89", "#ff9800"],
        labels = ["Utilizada", "Livre", "Extra"];
      GraficoCotas.create(data, backgroundColor, labels, grafico, barraProgresso);
    } else {
      barraProgresso.addClass("none");
      grafico.addClass("none");
      $("#graficoCotas").addClass("none");
    }
  }

  static cardPublicacoesExpiradas (publicacoes) {
    let tabela = $("#tablePublicacoesExpiradas");
    $("#progress-cardPublicacoesExpiradas").css("display", "none");
    tabela.addClass(`none`);
    tabela.empty();
    tabela.append(
      `<div class="table-responsive">
        <table id="datatablePublicacoesExpiradas" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Campanha</th>
              <th>Publicação</th>
              <th>Data de expiração</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>`
    );
    $.each(publicacoes, (i, item) => {
      if (item.name !== null) {
        $("#datatablePublicacoesExpiradas tbody").append(
          `<tr >
            <td>${item.nomeCampanha}</td>
            <td style="vertical-align: middle;">
              <div class="alinhar-between-l">
                <div>
                  ${item.nomePublicacao}
                  <div class="acoesTabela">
                    <a onclick="Home.abrirPublicacao(${item.campanhaId}, '${item.nomeCampanha}', ${item.publicacaoId})"><i class="fas fa-file-powerpoint"></i> Ver publicação</a>
                  </div>
                </div>
              </div>
            </td>
            <td>${item.dataExpiracao.split(" ")[0].split("-").reverse().join("/")}</td>
          </tr>`
        );
      }
    });
    tabela.removeClass("none");
    dataTable("datatablePublicacoesExpiradas");
    $("#numPublicacoesExpiradas").text(publicacoes.length);
    $("#cardPublicacoesExpiradas").css("display", "block");
    tooltip();
  }

  static cardPublicacoesDuplicadas (publicacoes) {
    let tabela = $("#tablePublicacoesDuplicadas");
    $("#progress-cardPublicacoesDuplicadas").css("display", "none");
    tabela.addClass(`none`);
    tabela.empty();
    tabela.append(
      `<div class="table-responsive">
        <table id="datatablePublicacoesDuplicadas" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Campanha</th>
              <th>Publicação</th>
              <th>Número de publicações duplicadas</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>`
    );
    $.each(publicacoes, (i, item) => {
      if (item.name !== null) {
        $("#datatablePublicacoesDuplicadas tbody").append(
          `<tr >
            <td>${item.nomeCampanha}</td>
            <td style="vertical-align: middle;">
              <div class="alinhar-between-l">
                <div>
                  ${item.nomePublicacao}
                  <div class="acoesTabela">
                    <a onclick="Home.abrirPublicacao(${item.campanhaId}, '${item.nomeCampanha}', ${item.publicacaoId})"><i class="fas fa-file-powerpoint"></i> Ver publicação</a>
                  </div>
                </div>
              </div>
            </td>
            <td>${item.publicacoesDuplicadas}</td>
          </tr>`
        );
      }
    });
    tabela.removeClass("none");
    dataTable("datatablePublicacoesDuplicadas");
    $("#numPublicacoesDuplicadas").text(publicacoes.length);
    $("#cardPublicacoesDuplicadas").css("display", "block");
    tooltip();
  }

  static abrirModalPublicacoesExpiradas () {
    $("#modal-publicacoesExpiradas").modal("show");
  }

  static abrirModalPublicacoesDuplicadas () {
    $("#modal-publicacoesDuplicadas").modal("show");
  }

  static abrirPublicacao (idCampanha, nomeCampanha, idPublicacao) {
    localStorage.setItem("name-campanhaSelecionada", `${nomeCampanha}`);
    localStorage.setItem("id-campanhaSelecionada", `${idCampanha}`);
    window.location.assign(`/admin/campanhas?p=${idPublicacao}`);
  }

}
