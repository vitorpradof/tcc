class Bloqueador {

  static getBrowser(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
      tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
      return {name:'IE',version:(tem[1]||'')};
    }
    if(M[1]==='Chrome'){
      tem=ua.match(/\bOPR\/(\d+)/)
      if(tem!=null) {
        return {name:'Opera', version:tem[1]};
      }
    }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {
      M.splice(1,1,tem[1]);
    }
    return {name: M[0], version: M[1]};
  }

  static navegadorAtualizado() {
    let browser = this.getBrowser();
    if((browser.version < "65" && browser.name === "Chrome") || (browser.version <= "11" && browser.name === "IE") || (browser.version < "52" && browser.name === "Opera") || (browser.version < "20" && browser.name === "Firefox") || (browser.version < 6 && browser.name === "Safari")) {
      let dados = {
        tokenForm: FormData.getFormToken(),
        accessKey: FormData.getAccessKey(),
        localError: "bloqueador",
        message: `Browser: ` + browser.name + ' --- Version: ' + browser.version
      };
      this.enviarErro(dados);

      $("body").text("");
      $("body").append(
        "<div id='bloqueador'>" +
          "<h1>Oops...</h1>" +
          "<hr/>" +
          "<h4>" +
            "Notamos que você está acessando o formulário de um navegador desatualizado, e infelizmente nós não podemos garantir que ele funcione 100%, visto que estamos utilizando tecnologias que o seu navegador não suporta." +
            "<br/><br/>" +
            "Abaixo estamos disponibilizando o site oficial de navegadores que nós temos certeza que suportam as tecnologias que utilizamos." +
            "<br/><br/>" +
            "Para que você consiga responder o formulário sem problemas, baixe ou atualize o seu navegador para uma versão mais recente." +
            "<hr/>" +
          "</h4>" +
          "<div class='alinhar-around'>" +
            "<a href='https://www.google.com.br/chrome/' target='_blank' title='Clique para ser redirecionado ao site do Google Chrome'><i class='fab fa-chrome fa-5x'></i></a>" +
            "<a href='https://www.mozilla.org/pt-BR/firefox/new/' target='_blank' title='Clique para ser redirecionado ao site do Mozilla Firefox'><i class='fab fa-firefox fa-5x'></i></a>" +
            "<a href='https://www.opera.com/pt-br?utm_campaign=%2300%20-%20WW%20-%20Search%20-%20PT%20-%20Branded&gclid=CjwKCAjw7tfVBRB0EiwAiSYGMynSr5sAlHLaAlABC8zY5wSoQD4TLAniEthsaE1Bla3cWxGv5mc7ihoCNSwQAvD_BwE' target='_blank' title='Clique para ser redirecionado ao site do Opera'><i class='fab fa-opera fa-5x'></i></a>" +
          "</div>" +
        "</div>"
      );
      return false;
    }
    return true;
  }

  static enviarErro(dados) {
    $.ajax({
      url: configSistema.servidor + `/system/notification/notify`,
      headers: {
        'Content-Type':'application/json'
      },
      method: 'POST',
      data: JSON.stringify(dados),
      success: function () {
      },
      error: function () {
      }
    });
  }

}