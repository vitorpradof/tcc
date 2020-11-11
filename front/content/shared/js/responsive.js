var click = false,
  min,
  pessoa,
  x = document.querySelectorAll(".iNvB"),
  y = document.querySelectorAll(".iNvS"),
  d = document.querySelector("#dropdownOpcoesUser"),
  itensMenu = [],
  sistema = window.location.href,
  panelConfigs = {};

function focoForm(nome) {
  $(nome).focus(function () {
    pularInputComTab(nome);
  })
}

function rolarChevron (el) {
  if (el.className.indexOf("activeChevron") === -1) {
    el.classList.add("activeChevron");
    el.classList.remove("removeChevron");
  } else {
    el.classList.remove("activeChevron");
    el.classList.add("removeChevron");
  }

}

function pularInputComTab(nome) {
  $(nome).on('keyup', 'input', function(event) {
    if (event.which == 9) {
      var generico = $(nome).find('input:visible');
      var indice = generico.index(event.target) + 1;
      var seletor = $(generico[indice]).focus();
      if (seletor.length == 0) {
        event.target.focus();
      }
    }
  });
}

function alteraOLink(o) {
  switch(o) {
    case 3:
      $("header").addClass("hR");
      $("#contentNav").addClass("diminuirContentNav");
      $("#botaoFecharContentNav").css("display", "flex");
      $("#botao-menu").attr("class", "fas fa-times");
      $("body").addClass("stopScroll");
      break;
    case 4:
      $("header").removeClass("hR");
      $("#contentNav").removeClass("diminuirContentNav");
      $("#botaoFecharContentNav").css("display", "none");
      $("body").removeClass("stopScroll");
      $("#botao-menu").attr("class", "fas fa-bars");
      break;
  }
}

function novoToggleHeader() {
  if (!click) {
    if($(document).width() < 990) {
      alteraOLink(3);
    }
    click = true;
  } else if (click) {
    if($(document).width() < 990) {
      alteraOLink(4);
    }
    click = false;
  }
}

function botaoFecharContentNav () {
  $("#botaoFecharContentNav").on("click", () => {
    click = false;
    alteraOLink(4);
  });
}

function telaSozinha() {
  $(window).resize(function () {
    if ($(document).width() < 978) {
      min = true;
    }
    if (($(document).width() > 966) && min) {
      alteraOLink(4);
      min = false;
    }
    click = false;
  });
}

function botaoHamburguer() {
  $("#menu-titulo").click(function () {
    novoToggleHeader();
  });
}

function activeMenu() {
  "use strict";
  var path = window.location.pathname.split("/");
  if (path[2] !== "") {
    $("#" + path[2]).addClass('active');
    $("#" + path[2] + path[3]).addClass('active');
    $("#" + path[2] + " a").addClass('activeChevron');
    $("#collapse" + path[2]).addClass('in');
  }
}

function mudarParaIcone1 (el, i) {
  el = (el.querySelector("img"));
  el.src = "/content/admin/shared/imagens/icone-" + i + ".png";
}

function mudarParaIcone2 (el, i) {
  el = (el.querySelector("img"));
  el.src = "/content/admin/shared/imagens/icone-" + i + "2.png";
}

function carregarNomeUsuario () {
  $("#nomeUsuarioLogado").text(AdminData.getNomeUsuario());
  $("#usuario_logado").text(AdminData.getNomeUsuario());
}

function renderizarMenu () {
  let ul = $("#itensMenuHeader");

  ul.append(`
    <li id="home"><a href="/admin/home" class="iNvB"><div><i class="material-icons">dashboard</i> Menu principal</div></a></li>
    <li id="servicos"><a href="/admin/servicos" class="iNvB"><div><i class="material-icons">folder</i> Serviços</div></a></li>
  `);
}

function renderizarDivLogadoComoColaborador () {
  let xToken = AdminData.getTheRealXToken();
  if (xToken) {
    $("#divLogadoComColaborador").append(`<div>Você está vendo o painel do colaborador ${AdminData.getColaboradorLogado()}.</div> <div onclick="Authentication.fecharPainelDoColaborador()" style="cursor: pointer; text-align: right"><i class="fas fa-sign-out-alt"></i> Sair</div>`).css("display", "flex");
    $("#gradient").css("margin-top", 50);
  }
}

function carregarInformacoesPertinentes () {
  document.title = `${configSistema.panelConfigs.titulo} ${document.title}`;
  document.querySelector("link[rel*='icon']").href = configSistema.panelConfigs.logo.logomarca;
  $("#logomenu-panelConfig").attr("src", configSistema.panelConfigs.logo.logoMenu);
  $("#logologin-panelConfig").attr("src", configSistema.panelConfigs.logo.logo);
  $("#footer-panelConfig").text(configSistema.panelConfigs.titulo);
  $("#footerLogin-panelConfig").text(configSistema.panelConfigs.titulo);
}

$(function () {
  "use strict";
  carregarInformacoesPertinentes();
  renderizarMenu();
  telaSozinha();
  botaoHamburguer();
  activeMenu();
  renderizarDivLogadoComoColaborador();
  carregarNomeUsuario();
  botaoFecharContentNav();
});
