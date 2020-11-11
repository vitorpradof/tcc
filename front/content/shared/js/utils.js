function validate (campos) {
  limparHelpBlock();
  let status = true;
  campos.forEach((campo) => {
    if (campo.name === "documento") {
      if ((!validarCpf(campo.value) && campo.value.length === 14) || (!validarCnpj(campo.value) && campo.value.length === 18)) {
        $(campo).closest("div").append("<span class='help-block'>Documento inválido.</span>");
        status = false;
      }
    } else if (campo.name === "linkMaisInfo") {
      let validouLink = validarLink(campo.value);
      if (validouLink !== true) {
        $(campo).closest("div").append(`<span class="help-block">${validouLink === false ? "É necessário informar um link válido." : validouLink}</span>`);
        status = false;
      }
    }
    if (campo.type === "file") {
      if (campo.files[0] === undefined) {
        $(campo).closest("div").append("<span class='help-block'>Preencha este campo.</span>");
        status = false;
      } else if (campo.files[0].type.indexOf('jpg') !== -1 || campo.files[0].type.indexOf('jpeg') !== -1) {
        if (campo.files[0].size > 2000000) {
          $(campo).closest("div").append("<span class='help-block'>O tamanho máximo do arquivo permitido é 2 MB</span>");
          status = false;
        }
      } else if (campo.files[0].type.indexOf('mp4') !== -1) {
        if (campo.files[0].size > 15000000) {
          $(campo).closest("div").append("<span class='help-block'>O tamanho máximo do arquivo permitido é 15 MB</span>");
          status = false;
        }
      } else {
        $(campo).closest("div").append("<span class='help-block'>Tipo de arquivo não permitido.</span>");
        status = false;
      }
    } else {
      if (!campo.checkValidity()) {
        $(campo).closest("div").append("<span class='help-block'>"+ campo.validationMessage +"</span>");
        status = false;
      }
    }
  });
  return status;
}

function serializeArrayToJSON (formulario, camposAMais) {
  let dadosDoFormulario = formulario === null ? [] : formulario.serializeArray(),
    dadosEmJSON = {};
  if (camposAMais !== undefined) {
    camposAMais.forEach((campo) => {
      dadosDoFormulario.push(campo);
    });
  }
  $.map(dadosDoFormulario, (n) => {
    if (n !== undefined) {
      dadosEmJSON[n['name']] = campoEhInt(n['name']) ? parseInt(n['value']) : campoEhFloat(n['name']) ? parseFloat(n.value.replace(/\./g, "").replace(",",".")) : n['value'];
    }
  });
  return dadosEmJSON;
}

function campoEhInt (nome) {
  return nome.includes("id") || nome.includes("numCotas") || nome.includes("planoId") || nome.includes("categoriaId") ? true : false;
}

function campoEhFloat (nome) {
  return nome.includes("valor") || nome.includes("valorCotaExtra") ? true : false;
}

function limparHelpBlock() {
  $(".help-block").each(function () {
    this.remove();
  });
}

function validarCpf (cpf) {
  var exp = /\.|\-/g;

  cpf = cpf.replace(exp, "").toString();

  if (cpf.length == 11) {
    var v = [];

    //Calcula o primeiro dígito de verificação.
    v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
    v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
    v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
    v[0] = v[0] % 11;
    v[0] = v[0] % 10;

    //Calcula o segundo dígito de verificação.
    v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
    v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
    v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
    v[1] = v[1] % 11;
    v[1] = v[1] % 10;

    //Retorna Verdadeiro se os dígitos de verificação são os esperados.
    if ((v[0] != cpf[9]) || (v[1] != cpf[10])) {
      return false;
    } else if (cpf[0] == cpf[1] && cpf[1] == cpf[2] && cpf[2] == cpf[3] && cpf[3] == cpf[4] && cpf[4] == cpf[5] && cpf[5] == cpf[6] && cpf[6] == cpf[7] && cpf[7] == cpf[8] && cpf[8] == cpf[9] && cpf[9] == cpf[10]) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function validarLink (nome) {
  let pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i' // fragment locator
  );
  if (nome.length > 0) {
    if (nome.includes("http")) {
      return !!pattern.test(nome);
    }
    return "É necessário informar o protocolo de segurança (<i>https://</i> ou <i>http://</i>).";
  }
  return true;
}

function validarCnpj (cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Valida a quantidade de caracteres
  if (cnpj.length !== 14) {
    return false;
  }

  // Elimina inválidos com todos os caracteres iguais
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Cáculo de validação
  let t = cnpj.length - 2,
    d = cnpj.substring(t),
    d1 = parseInt(d.charAt(0)),
    d2 = parseInt(d.charAt(1)),
    calc = x => {
      let n = cnpj.substring(0, x),
        y = x - 7,
        s = 0,
        r = 0;

      for (let i = x; i >= 1; i--) {
        s += n.charAt(x - i) * y--;
        if (y < 2)
          y = 9
      }

      r = 11 - s % 11
      return r > 9 ? 0 : r
    };

  return calc(t) === d1 && calc(t + 1) === d2;
}

function formatarMoedaBr (valor) {
  let aux = valor.toFixed(2).split('.');
  aux[0] =  aux[0].split(/(?=(?:...)*$)/).join('.');
  return aux.join(',');
}
